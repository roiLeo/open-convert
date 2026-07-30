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
          @convert="convert"
          @download="download"
          @remove="remove"
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
const route = useRoute()
const conversionPath = route.path.substring(1)

const parts = conversionPath.split('-')
const fromFormat = parts[0] ?? ''
const toFormat = parts[2] ?? ''

if (!fromFormat || !toFormat || parts[1] !== 'to') {
  console.error(`Unexpected conversion route format: ${conversionPath}`)
}

const { conversions, addFiles, convert, download, remove } = useConversionQueue()

const handleFilesSelected = (files: File[]) => addFiles(files, toFormat, /* autoConvert */ true)
</script>
