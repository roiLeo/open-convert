<template>
  <div>
    <!-- Hero Section -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
        <UIcon
          name="i-heroicons-shield-check"
          class="w-4 h-4"
        />
        100% local • No uploads • Privacy first
      </div>

      <h1 class="text-5xl md:text-6xl font-bold text-highlighted mb-4">
        Convert files locally<br>in your browser
      </h1>

      <p class="text-xl text-muted max-w-2xl mx-auto mb-8">
        Images, videos, audio, documents - all processed on your device using WebAssembly. Your files never leave your computer.
      </p>
    </div>

    <!-- File Upload Area -->
    <FileUploader @files-selected="handleFilesSelected" />

    <!-- Active Conversions -->
    <div
      v-if="conversions.length > 0"
      class="mt-8"
    >
      <h2 class="text-2xl font-bold text-highlighted mb-4">
        Active Conversions
      </h2>
      <div class="space-y-4">
        <ConversionCard
          v-for="conversion in conversions"
          :key="conversion.id"
          :conversion="conversion"
          @convert="convert"
          @download="download"
          @remove="remove"
        />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 mb-16">
      <UCard>
        <div class="text-center">
          <div class="text-4xl font-bold text-primary mb-2">
            150+
          </div>
          <div class="text-toned font-medium">
            Formats
          </div>
          <div class="text-sm text-muted mt-1">
            supported conversions
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="text-center">
          <div class="text-4xl font-bold text-primary mb-2">
            0
          </div>
          <div class="text-toned font-medium">
            Uploads
          </div>
          <div class="text-sm text-muted mt-1">
            files stay on device
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="text-center">
          <div class="text-4xl font-bold text-primary mb-2">
            ∞
          </div>
          <div class="text-toned font-medium">
            No Limits
          </div>
          <div class="text-sm text-muted mt-1">
            unlimited conversions
          </div>
        </div>
      </UCard>
    </div>

    <!-- Popular Conversions -->
    <div>
      <h2 class="text-3xl font-bold text-highlighted mb-6 text-center">
        Popular conversions
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <UButton
          v-for="conv in popularConversions"
          :key="conv.label"
          :label="conv.label"
          color="neutral"
          variant="outline"
          size="lg"
          class="justify-center"
          @click="navigateTo(conv.path)"
        />
      </div>
      <div class="text-center mt-6">
        <UButton
          label="View all formats →"
          color="primary"
          variant="soft"
          size="lg"
          @click="navigateTo('/formats')"
        />
      </div>
    </div>

    <!-- How it works -->
    <UPageSection
      title="How it works?"
      description="Our file converter operates entirely within your web browser using WebAssembly. When you select a file for conversion, it is processed locally on your device without being uploaded to any server. This ensures that your files remain private and secure. The conversion process is fast and efficient, allowing you to download the converted file immediately after processing."
      :features="[
        {
          icon: 'i-heroicons-document-arrow-up',
          title: 'Drop your file',
          description: 'Drag and drop any file onto the converter or click to browse.'
        },
        {
          icon: 'i-heroicons-arrows-right-left',
          title: 'Choose format',
          description: 'Select your desired output format from the dropdown.'
        },
        {
          icon: 'i-heroicons-document-arrow-down',
          title: 'Download instantly',
          description: 'Conversion happens locally - download your file immediately.'
        }
      ]"
    />
  </div>
</template>

<script setup lang="ts">
const { conversions, addFiles, convert, download, remove } = useConversionQueue()

const popularConversions = [
  { label: 'PNG→JPG', path: '/png-to-jpg' },
  { label: 'JPG→PNG', path: '/jpg-to-png' },
  { label: 'WEBP→PNG', path: '/webp-to-png' },
  { label: 'PNG→WEBP', path: '/png-to-webp' },
  { label: 'MP4→MP3', path: '/mp4-to-mp3' },
  { label: 'MOV→MP4', path: '/mov-to-mp4' },
  { label: 'WAV→MP3', path: '/wav-to-mp3' },
  { label: 'MP3→WAV', path: '/mp3-to-wav' }
]

const handleFilesSelected = (files: File[]) => addFiles(files)
</script>
