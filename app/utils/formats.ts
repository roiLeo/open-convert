export const imageFormats = ['PNG', 'JPG', 'JPEG', 'WEBP', 'GIF', 'BMP', 'ICO', 'SVG', 'TIFF', 'HEIC', 'AVIF']
export const videoFormats = ['MP4', 'WEBM', 'AVI', 'MOV', 'MKV', 'FLV', 'WMV', 'M4V', 'MPG', 'MPEG']
export const audioFormats = ['MP3', 'WAV', 'OGG', 'AAC', 'M4A', 'FLAC', 'WMA', 'OPUS', 'AIFF', 'APE']
export const documentFormats = ['PDF', 'DOCX', 'DOC', 'TXT', 'HTML', 'XLSX', 'XLS', 'CSV', 'JSON', 'XML', 'RTF', 'ODT']

export const formatGroups = {
  // Images
  png: ['jpg', 'jpeg', 'webp', 'gif', 'bmp', 'ico', 'svg', 'pdf'],
  jpg: ['png', 'webp', 'gif', 'bmp', 'ico', 'pdf'],
  jpeg: ['png', 'webp', 'gif', 'bmp', 'ico', 'pdf'],
  webp: ['png', 'jpg', 'jpeg', 'gif', 'bmp'],
  gif: ['png', 'jpg', 'jpeg', 'webp', 'mp4'],
  bmp: ['png', 'jpg', 'jpeg', 'webp'],
  ico: ['png', 'jpg', 'jpeg'],
  svg: ['png', 'jpg', 'jpeg', 'pdf'],

  // Videos
  mp4: ['webm', 'avi', 'mov', 'mkv', 'flv', 'wmv', 'gif', 'mp3'],
  webm: ['mp4', 'avi', 'mov', 'mkv'],
  avi: ['mp4', 'webm', 'mov', 'mkv'],
  mov: ['mp4', 'webm', 'avi', 'mkv'],
  mkv: ['mp4', 'webm', 'avi', 'mov'],
  flv: ['mp4', 'webm', 'avi'],
  wmv: ['mp4', 'webm', 'avi'],

  // Audio
  mp3: ['wav', 'ogg', 'aac', 'm4a', 'flac', 'wma'],
  wav: ['mp3', 'ogg', 'aac', 'm4a', 'flac'],
  ogg: ['mp3', 'wav', 'aac', 'm4a'],
  aac: ['mp3', 'wav', 'ogg', 'm4a'],
  m4a: ['mp3', 'wav', 'ogg', 'aac'],
  flac: ['mp3', 'wav', 'ogg', 'aac'],
  wma: ['mp3', 'wav', 'ogg'],

  // Documents
  pdf: ['docx', 'txt', 'jpg', 'png'],
  docx: ['pdf', 'txt', 'html'],
  doc: ['pdf', 'txt', 'docx'],
  txt: ['pdf', 'docx', 'html'],
  html: ['pdf', 'txt', 'docx'],
  xlsx: ['csv', 'pdf', 'html'],
  xls: ['csv', 'xlsx', 'pdf'],
  csv: ['xlsx', 'xls', 'json'],
  json: ['csv', 'xml', 'txt'],
  xml: ['json', 'txt']
}
