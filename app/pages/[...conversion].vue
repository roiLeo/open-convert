<template>
  <div>
    <div class="text-center mb-8">
      <div class="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 text-primary font-bold text-2xl mb-6">
        <span>{{ fromFormat.toUpperCase() }}</span>
        <UIcon
          name="i-heroicons-arrow-right"
          class="size-6"
        />
        <span>{{ toFormat.toUpperCase() }}</span>
      </div>

      <h1 class="text-4xl md:text-5xl font-bold text-highlighted mb-4">
        Convert {{ fromFormat.toUpperCase() }} to {{ toFormat.toUpperCase() }}
      </h1>

      <p class="text-lg text-muted max-w-2xl mx-auto">
        Fast, free, and secure {{ fromFormat.toUpperCase() }} to {{ toFormat.toUpperCase() }} conversion.<br>
        All processing happens locally in your browser.
      </p>
    </div>

    <!-- File Upload -->
    <FileUploader @files-selected="handleFilesSelected" />

    <!-- Active Conversions -->
    <div
      v-if="conversions.length > 0"
      class="mt-8"
    >
      <div class="space-y-4">
        <ConversionCard
          v-for="conversion in conversions"
          :key="conversion.id"
          :conversion="conversion"
          @convert="handleConvert"
          @download="handleDownload"
          @remove="handleRemove"
        />
      </div>
    </div>

    <!-- Info Section -->
    <div class="mt-12 grid md:grid-cols-2 gap-6">
      <UPageCard
        spotlight
        spotlight-color="info"
      >
        <template #title>
          Why convert {{ fromFormat.toUpperCase() }} to {{ toFormat.toUpperCase() }}?
        </template>
        <template #description>
          Converting {{ fromFormat.toUpperCase() }} to {{ toFormat.toUpperCase() }} is useful for compatibility,
          file size optimization, and ensuring your files work across different platforms and applications.
        </template>
      </UPageCard>
      <UPageCard
        spotlight
        spotlight-color="info"
      >
        <template #title>
          How does it work?
        </template>
        <template #description>
          Simply drop your {{ fromFormat.toUpperCase() }} file above, and it will be converted to {{ toFormat.toUpperCase() }}
          instantly in your browser. No uploads, no waiting - just fast, local conversion.
        </template>
      </UPageCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ConversionItem } from '~/types'

const route = useRoute()
const conversionPath = route.path.substring(1) // Remove leading slash

// Parse conversion path (e.g., "png-to-jpg" -> from: "png", to: "jpg")
const [fromFormat = '', , toFormat = ''] = conversionPath.split('-')

const conversions = ref<ConversionItem[]>([])

const MAX_RECOMMENDED_SIZE = 500 * 1024 * 1024 // 500MB, tune to your needs

const handleFilesSelected = (files: File[]) => {
  const newConversions = files.map(file => ({
    id: crypto.randomUUID(),
    file,
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    inputFormat: getFileExtension(file.name),
    outputFormat: toFormat, // ← use the format parsed from the route
    status: 'pending' as const,
    progress: 0,
    warning: file.size > MAX_RECOMMENDED_SIZE
      ? 'Large files may be slow or unstable in-browser'
      : undefined
  }))

  conversions.value = [...conversions.value, ...newConversions]

  // Auto-start conversion
  newConversions.forEach(conv => handleConvert(conv))
}

const handleConvert = async (conversion: ConversionItem) => {
  const index = conversions.value.findIndex(c => c.id === conversion.id)
  if (index === -1) return

  const conv = conversions.value[index]
  if (!conv) return

  conv.status = 'converting'
  conv.progress = 0

  try {
    const { convertFile } = useFileConverter()

    const result = await convertFile(
      conversion.file,
      conversion.inputFormat,
      conversion.outputFormat,
      (progress) => {
        const current = conversions.value[index]
        if (current) {
          current.progress = Math.round(progress * 100)
        }
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

const handleDownload = (conversion: ConversionItem) => {
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

const handleRemove = (conversion: ConversionItem) => {
  conversions.value = conversions.value.filter(c => c.id !== conversion.id)
}
</script>
