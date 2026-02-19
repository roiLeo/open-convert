export const getFileExtension = (fileName: string): string => fileName.split('.').pop()?.toLowerCase() || ''
export const getFileNameWithoutExtension = (fileName: string): string => fileName.split('.').slice(0, -1).join('.')
export const getFileIcon = (format: string): string => {
  format = format.toUpperCase()

  if (imageFormats.includes(format)) return 'i-heroicons-photo'
  if (videoFormats.includes(format)) return 'i-heroicons-film'
  if (audioFormats.includes(format)) return 'i-heroicons-musical-note'
  if (documentFormats.includes(format)) return 'i-heroicons-document-text'

  return 'i-heroicons-document'
}
export const getAvailableFormats = (inputFormat: string): string[] => {
  const formats = formatGroups[inputFormat.toLowerCase() as keyof typeof formatGroups] || []
  return formats.map(f => f.toUpperCase())
}
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
export const getSizeReduction = (original: number, converted: number): string => {
  if (original === 0) return '0'
  const reduction = ((original - converted) / original) * 100
  return reduction.toFixed(2)
}
