<template>
  <div>
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold tracking-tight mb-4">
        Supported Formats
      </h1>
      <p class="text-xl text-muted max-w-2xl mx-auto">
        Convert between 150+ file formats - all locally in your browser
      </p>
    </div>

    <!-- Format Categories -->
    <div class="space-y-12">
      <!-- Images -->
      <div>
        <div class="flex items-center gap-3 mb-4">
          <UIcon
            name="i-heroicons-photo"
            class="size-6 text-primary"
          />
          <h2 class="text-2xl font-bold text-highlighted">
            Image Formats
          </h2>
        </div>
        <UCard>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <UBadge
              v-for="format in imageFormats"
              :key="format"
              variant="subtle"
              size="lg"
            >
              {{ format }}
            </UBadge>
          </div>
        </UCard>
      </div>

      <!-- Videos -->
      <div>
        <div class="flex items-center gap-3 mb-4">
          <UIcon
            name="i-heroicons-film"
            class="size-6 text-primary"
          />
          <h2 class="text-2xl font-bold text-highlighted">
            Video Formats
          </h2>
        </div>
        <UCard>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <UBadge
              v-for="format in videoFormats"
              :key="format"
              variant="subtle"
              size="lg"
            >
              {{ format }}
            </UBadge>
          </div>
        </UCard>
      </div>

      <!-- Audio -->
      <div>
        <div class="flex items-center gap-3 mb-4">
          <UIcon
            name="i-heroicons-musical-note"
            class="size-6 text-primary"
          />
          <h2 class="text-2xl font-bold text-highlighted">
            Audio Formats
          </h2>
        </div>
        <UCard>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <UBadge
              v-for="format in audioFormats"
              :key="format"
              variant="subtle"
              size="lg"
            >
              {{ format }}
            </UBadge>
          </div>
        </UCard>
      </div>

      <!-- Documents -->
      <div>
        <div class="flex items-center gap-3 mb-4">
          <UIcon
            name="i-heroicons-document-text"
            class="size-6 text-primary"
          />
          <h2 class="text-2xl font-bold text-highlighted">
            Document Formats
          </h2>
        </div>
        <UCard>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <UBadge
              v-for="format in documentFormats"
              :key="format"
              variant="subtle"
              size="lg"
            >
              {{ format }}
            </UBadge>
          </div>
        </UCard>
      </div>
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
