export const getFileExtension = (fileName: string): string => fileName.split('.').pop()?.toLowerCase() || ''
export const getFileNameWithoutExtension = (fileName: string): string => fileName.split('.').slice(0, -1).join('.')
