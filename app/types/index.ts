export interface ConversionItem {
  id: string
  file: File
  fileName: string
  fileSize: number
  fileType: string
  inputFormat: string
  outputFormat: string
  status: 'pending' | 'converting' | 'completed' | 'error'
  progress: number
  convertedBlob?: Blob
  convertedSize?: number
  error?: string
}

export interface ConversionResult {
  blob: Blob
  size: number
}
