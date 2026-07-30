import type { ConversionItem } from '~/types'

const MAX_RECOMMENDED_SIZE = 500 * 1024 * 1024 // 500MB

export function useConversionQueue() {
  const conversions = ref<ConversionItem[]>([])

  function addFiles(files: File[], defaultOutputFormat = '', autoConvert = false) {
    const newConversions: ConversionItem[] = files.map(file => ({
      id: crypto.randomUUID(),
      file,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      inputFormat: getFileExtension(file.name),
      outputFormat: defaultOutputFormat,
      status: 'pending',
      progress: 0,
      warning: file.size > MAX_RECOMMENDED_SIZE
        ? 'Large files may be slow or unstable in-browser'
        : undefined
    }))

    conversions.value = [...conversions.value, ...newConversions]

    if (autoConvert) {
      newConversions.forEach(conv => convert(conv))
    }

    return newConversions
  }

  async function convert(conversion: ConversionItem) {
    const index = conversions.value.findIndex(c => c.id === conversion.id)
    if (index === -1) return

    const conv = conversions.value[index]
    if (!conv) return

    // ConversionCard's format picker — sync it into the actual stored item.
    conv.outputFormat = conversion.outputFormat

    if (!conv.outputFormat) {
      conv.status = 'error'
      conv.error = 'Please select an output format before converting'
      return
    }

    conv.status = 'converting'
    conv.progress = 0

    try {
      const { convertFile } = useFileConverter()

      const result = await convertFile(
        conv.file,
        conv.inputFormat,
        conv.outputFormat,
        (progress) => {
          const current = conversions.value[index]
          if (current) current.progress = Math.round(progress * 100)
        }
      )

      const current = conversions.value[index]
      if (current) {
        current.progress = 100
        current.status = 'completed'
        current.convertedBlob = result.blob
        current.convertedSize = result.blob.size
      }
    } catch (error) {
      const current = conversions.value[index]
      if (current) {
        current.status = 'error'
        current.error = error instanceof Error ? error.message : 'Conversion failed'
      }
    }
  }

  function download(conversion: ConversionItem) {
    if (!conversion.convertedBlob) return

    const url = URL.createObjectURL(conversion.convertedBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${getFileNameWithoutExtension(conversion.fileName)}.${conversion.outputFormat}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  function remove(conversion: ConversionItem) {
    conversions.value = conversions.value.filter(c => c.id !== conversion.id)
  }

  return { conversions, addFiles, convert, download, remove }
}
