<template>
  <div>
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold tracking-tight mb-4">
        Supported Formats
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Convert between 150+ file formats - all locally in your browser
      </p>
    </div>

    <!-- POPULAR CONVERSIONS -->
    <PopularConversions />

    <!-- Format Categories -->
    <div class="space-y-12">
      <!-- Images -->
      <section>
        <div class="flex items-center gap-3 mb-4">
          <UIcon
            name="i-heroicons-photo"
            class="w-6 h-6 text-primary"
          />
          <h2 class="text-2xl font-bold text-highlighted">
            Image
          </h2>
        </div>

        <div class="mb-4">
          <h3 class="text-sm font-medium text-muted mb-2">
            Supported formats
          </h3>

          <div class="flex gap-2">
            <UBadge
              v-for="format in imageFormats"
              :key="format"
              color="neutral"
              variant="soft"
              size="xl"
              class="lowercase"
            >
              .{{ format }}
            </UBadge>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-medium text-muted mb-2">
            Quick conversions
          </h3>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
            <NuxtLink
              v-for="conv in imageQuickConversions"
              :key="conv.label"
              :to="conv.path"
              class="text-sm text-muted hover:text-primary"
            >
              {{ conv.label }}
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Videos -->
      <section>
        <div class="flex items-center gap-3 mb-4">
          <UIcon
            name="i-heroicons-film"
            class="w-6 h-6 text-primary"
          />
          <h2 class="text-2xl font-bold text-highlighted">
            Video
          </h2>
        </div>
        <div class="mb-4">
          <h3 class="text-sm font-medium text-muted mb-2">
            Supported formats
          </h3>

          <div class="flex gap-2">
            <UBadge
              v-for="format in videoFormats"
              :key="format"
              color="neutral"
              variant="soft"
              size="xl"
              class="lowercase"
            >
              .{{ format }}
            </UBadge>
          </div>
        </div>
        <div>
          <h3 class="text-sm font-medium text-muted mb-2">
            Quick conversions
          </h3>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
            <NuxtLink
              v-for="conv in videoQuickConversions"
              :key="conv.label"
              :to="conv.path"
              class="text-sm text-muted hover:text-primary"
            >
              {{ conv.label }}
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Audio -->
      <section>
        <div class="flex items-center gap-3 mb-4">
          <UIcon
            name="i-heroicons-musical-note"
            class="w-6 h-6 text-primary"
          />
          <h2 class="text-2xl font-bold text-highlighted">
            Audio
          </h2>
        </div>
        <div class="mb-4">
          <h3 class="text-sm font-medium text-muted mb-2">
            Supported formats
          </h3>

          <div class="flex gap-2">
            <UBadge
              v-for="format in audioFormats"
              :key="format"
              color="neutral"
              variant="soft"
              size="xl"
              class="lowercase"
            >
              .{{ format }}
            </UBadge>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-medium text-muted mb-2">
            Quick conversions
          </h3>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
            <NuxtLink
              v-for="conv in audioQuickConversions"
              :key="conv.label"
              :to="conv.path"
              class="text-sm text-muted hover:text-primary"
            >
              {{ conv.label }}
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Documents -->
      <section>
        <div class="flex items-center gap-3 mb-4">
          <UIcon
            name="i-heroicons-document-text"
            class="w-6 h-6 text-primary"
          />
          <h2 class="text-2xl font-bold text-highlighted">
            Document
          </h2>
        </div>
        <div class="mb-4">
          <h3 class="text-sm font-medium text-muted mb-2">
            Supported formats
          </h3>

          <div class="flex gap-2">
            <UBadge
              v-for="format in documentFormats"
              :key="format"
              color="neutral"
              variant="soft"
              size="xl"
              class="lowercase"
            >
              .{{ format }}
            </UBadge>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-medium text-muted mb-2">
            Quick conversions
          </h3>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
            <NuxtLink
              v-for="conv in documentQuickConversions"
              :key="conv.label"
              :to="conv.path"
              class="text-sm text-muted hover:text-primary"
            >
              {{ conv.label }}
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>

    <!-- CTA -->
    <div class="text-center mt-12">
      <UButton
        label="Start Converting"
        size="xl"
        icon="i-heroicons-arrow-path"
        @click="navigateTo('/')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const imageQuickConversions = [
  { label: 'PNG → JPG', path: '/png-to-jpg' },
  { label: 'JPG → PNG', path: '/jpg-to-png' },
  { label: 'WEBP → PNG', path: '/webp-to-png' },
  { label: 'PNG → WEBP', path: '/png-to-webp' },
  { label: 'GIF → MP4', path: '/gif-to-mp4' },
  { label: 'BMP → PNG', path: '/bmp-to-png' },
  { label: 'SVG → PNG', path: '/svg-to-png' },
  { label: 'TIFF → JPG', path: '/tiff-to-jpg' }
]

const videoQuickConversions = [
  { label: 'MP4 → MP3', path: '/mp4-to-mp3' },
  { label: 'MOV → MP4', path: '/mov-to-mp4' },
  { label: 'AVI → MP4', path: '/avi-to-mp4' },
  { label: 'MKV → MP4', path: '/mkv-to-mp4' }
]

const audioQuickConversions = [
  { label: 'WAV → MP3', path: '/wav-to-mp3' },
  { label: 'FLAC → MP3', path: '/flac-to-mp3' },
  { label: 'AAC → MP3', path: '/aac-to-mp3' },
  { label: 'OGG → MP3', path: '/ogg-to-mp3' }
]

const documentQuickConversions = [
  { label: 'TXT → MD', path: '/txt-to-md' },
  { label: 'TXT → HTML', path: '/txt-to-html' },
  { label: 'MD → HTML', path: '/md-to-html' },
  { label: 'HTML → MD', path: '/html-to-md' },
  { label: 'DOCX → PDF', path: '/docx-to-pdf' },
  { label: 'PDF → DOCX', path: '/pdf-to-docx' }
]
</script>
