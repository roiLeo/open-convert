import type { ConversionResult } from '~/types'
import type { FFmpeg } from '@ffmpeg/ffmpeg'

// FFmpeg singleton - Only instantiate in browser
let ffmpeg: FFmpeg | null = null
let ffmpegLoaded = false

async function loadFFmpeg() {
  if (!import.meta.client) throw new Error('FFmpeg can only run in the browser')
  if (ffmpegLoaded && ffmpeg) return

  console.log('Importing FFmpeg...')
  const { FFmpeg } = await import('@ffmpeg/ffmpeg')
  console.log('FFmpeg imported, creating instance...')

  ffmpeg = new FFmpeg()

  // Log FFmpeg's internal messages
  ffmpeg.on('log', ({ message }) => console.log('[FFmpeg]', message))

  console.log('Checking core files...')
  // Verify the files are actually reachable before loading
  const [coreRes, wasmRes] = await Promise.all([
    fetch('/ffmpeg/ffmpeg-core.js'),
    fetch('/ffmpeg/ffmpeg-core.wasm')
  ])
  console.log('Core JS status:', coreRes.status, coreRes.headers.get('content-type'))
  console.log('Core WASM status:', wasmRes.status, wasmRes.headers.get('content-type'))

  if (!coreRes.ok) throw new Error(`Cannot fetch ffmpeg-core.js: ${coreRes.status}`)
  if (!wasmRes.ok) throw new Error(`Cannot fetch ffmpeg-core.wasm: ${wasmRes.status}`)

  console.log('Calling ffmpeg.load()...')
  try {
    await ffmpeg.load({
      coreURL: '/ffmpeg/ffmpeg-core.js',
      wasmURL: '/ffmpeg/ffmpeg-core.wasm',
      workerURL: '/ffmpeg/ffmpeg-core.worker.js' // required for -mt
    })
  } catch (e) {
    console.error('ffmpeg.load() failed:', e)
    throw e
  }

  ffmpegLoaded = true
  console.log('FFmpeg ready.')
}

export const useFileConverter = () => {
  async function convertFile(
    file: File,
    inputFormat: string,
    outputFormat: string
  ): Promise<ConversionResult> {
    inputFormat = inputFormat.toLowerCase()
    outputFormat = outputFormat.toLowerCase()

    if (isImageFormat(inputFormat) && isImageFormat(outputFormat)) {
      return await convertImage(file, outputFormat)
    }

    if (isVideoFormat(inputFormat) && isAudioFormat(outputFormat)) {
      return await convertWithFFmpeg(file, inputFormat, outputFormat)
    }

    if (isAudioFormat(inputFormat) && isAudioFormat(outputFormat)) {
      return await convertWithFFmpeg(file, inputFormat, outputFormat)
    }

    if (isVideoFormat(inputFormat) && isVideoFormat(outputFormat)) {
      return await convertWithFFmpeg(file, inputFormat, outputFormat)
    }

    if (isDocumentFormat(inputFormat) || isDocumentFormat(outputFormat)) {
      return await convertDocument(file, inputFormat, outputFormat)
    }

    throw new Error(`Conversion from ${inputFormat} to ${outputFormat} is not supported`)
  }

  // ─── Images via Canvas API
  async function convertImage(file: File, outputFormat: string): Promise<ConversionResult> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const reader = new FileReader()

      reader.onload = (e) => {
        img.src = e.target?.result as string
      }

      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (!ctx) return reject(new Error('Failed to get canvas context'))

        if (outputFormat === 'jpg' || outputFormat === 'jpeg') {
          ctx.fillStyle = '#FFFFFF'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }
        ctx.drawImage(img, 0, 0)
        canvas.toBlob(
          blob => blob ? resolve({ blob, size: blob.size }) : reject(new Error('Failed to convert image')),
          getMimeType(outputFormat),
          0.95
        )
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })
  }

  // ─── Audio & Video via FFmpeg.wasm
  async function convertWithFFmpeg(
    file: File,
    inputFormat: string,
    outputFormat: string
  ): Promise<ConversionResult> {
    console.log('Loading FFmpeg for conversion...')
    await loadFFmpeg()
    const { fetchFile } = await import('@ffmpeg/util')

    console.log('FFmpeg loaded, starting conversion...')
    const id = crypto.randomUUID()
    const inputName = `input-${id}.${inputFormat}`
    const outputName = `output-${id}.${outputFormat}`

    if (!ffmpeg) throw new Error('FFmpeg instance is not available')

    await ffmpeg.writeFile(inputName, await fetchFile(file))

    const args = ['-i', inputName, ...getAudioEncodingArgs(outputFormat), outputName]
    try {
      await ffmpeg.exec(args)

      const data = await ffmpeg.readFile(outputName) as Uint8Array<ArrayBuffer>
      const blob = new Blob([data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength)], { type: getMimeType(outputFormat) })

      ffmpeg.deleteFile(inputName)
      ffmpeg.deleteFile(outputName)

      console.log(`Conversion complete: ${inputFormat} → ${outputFormat}, size: ${blob.size} bytes`)

      return { blob, size: blob.size }
    } finally {
      try {
        await ffmpeg.deleteFile(inputName)
        await ffmpeg.deleteFile(outputName)
      } catch {
        console.log('FFmpeg error')
      }
    }
  }

  // ─── Bitrate / encoder settings per output format
  function getAudioEncodingArgs(outputFormat: string): string[] {
    switch (outputFormat) {
      case 'mp3':
        // libmp3lame CBR at 320kbps (the format's max bitrate)
        return ['-c:a', 'libmp3lame', '-b:a', '320k']
      case 'aac':
      case 'm4a':
        return ['-c:a', 'aac', '-b:a', '320k']
      case 'ogg':
        return ['-c:a', 'libvorbis', '-b:a', '320k']
      case 'wma':
        return ['-c:a', 'wmav2', '-b:a', '320k']
      case 'flac':
      case 'wav':
        // lossless formats: bitrate flag doesn't apply
        return []
      default:
        return []
    }
  }

  // ─── Documents
  async function convertDocument(
    file: File,
    inputFormat: string,
    outputFormat: string
  ): Promise<ConversionResult> {
    // Plain text-based formats: just re-wrap the content
    const textFormats = ['txt', 'html', 'json', 'xml', 'csv']
    if (textFormats.includes(inputFormat) && textFormats.includes(outputFormat)) {
      const text = await file.text()
      const blob = new Blob([text], { type: getMimeType(outputFormat) })
      return { blob, size: blob.size }
    }

    // TXT/HTML → PDF via jsPDF
    if (textFormats.includes(inputFormat) && outputFormat === 'pdf') {
      const { jsPDF } = await import('jspdf')
      const text = await file.text()
      const doc = new jsPDF()
      doc.text(text, 10, 10)
      const blob = doc.output('blob')
      return { blob, size: blob.size }
    }

    // XLSX/XLS/CSV → CSV (using SheetJS)
    if (['xlsx', 'xls', 'csv'].includes(inputFormat) && outputFormat === 'csv') {
      const XLSX = await import('xlsx')
      const buffer = await file.arrayBuffer()
      const workbook = XLSX.read(buffer)
      const sheetName = workbook.SheetNames[0]
      const sheet = sheetName ? workbook.Sheets[sheetName] : undefined
      const csv = sheet ? XLSX.utils.sheet_to_csv(sheet) : ''
      const blob = new Blob([csv], { type: 'text/csv' })
      return { blob, size: blob.size }
    }

    // XLSX/XLS/CSV → JSON (using SheetJS)
    if (['xlsx', 'xls', 'csv'].includes(inputFormat) && outputFormat === 'json') {
      const XLSX = await import('xlsx')
      const buffer = await file.arrayBuffer()
      const workbook = XLSX.read(buffer)
      const sheetName = workbook.SheetNames[0]
      const sheet = sheetName ? workbook.Sheets[sheetName] : undefined
      const json = sheet ? XLSX.utils.sheet_to_json(sheet) : []
      const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' })
      return { blob, size: blob.size }
    }

    throw new Error(
      `Document conversion from ${inputFormat} to ${outputFormat} is not supported client-side. Consider using a backend service.`
    )
  }

  // ─── Helpers
  function isImageFormat(format: string): boolean {
    return ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'ico', 'svg'].includes(format)
  }

  function isVideoFormat(format: string): boolean {
    return ['mp4', 'webm', 'avi', 'mov', 'mkv', 'flv', 'wmv'].includes(format)
  }

  function isAudioFormat(format: string): boolean {
    return ['mp3', 'wav', 'ogg', 'aac', 'm4a', 'flac', 'wma'].includes(format)
  }

  function isDocumentFormat(format: string): boolean {
    return ['pdf', 'docx', 'doc', 'txt', 'html', 'xlsx', 'xls', 'csv', 'json', 'xml'].includes(format)
  }

  function getMimeType(format: string): string {
    const mimeTypes: Record<string, string> = {
      png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp',
      gif: 'image/gif', bmp: 'image/bmp', ico: 'image/x-icon', svg: 'image/svg+xml',
      mp4: 'video/mp4', webm: 'video/webm', avi: 'video/x-msvideo', mov: 'video/quicktime',
      mkv: 'video/x-matroska', flv: 'video/x-flv', wmv: 'video/x-ms-wmv',
      mp3: 'audio/mpeg', wav: 'audio/wav', ogg: 'audio/ogg', aac: 'audio/aac',
      m4a: 'audio/mp4', flac: 'audio/flac', wma: 'audio/x-ms-wma',
      pdf: 'application/pdf',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      doc: 'application/msword', txt: 'text/plain', html: 'text/html',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      xls: 'application/vnd.ms-excel', csv: 'text/csv',
      json: 'application/json', xml: 'application/xml'
    }
    return mimeTypes[format] || 'application/octet-stream'
  }

  return { convertFile }
}
