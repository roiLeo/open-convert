<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/">
          <AppLogo class="w-auto h-6 shrink-0" />
        </NuxtLink>
      </template>

      <template #right>
        <UNavigationMenu
          :items="items"
          variant="link"
        />

        <UColorModeButton />

        <UButton
          to="https://github.com/roiLeon/open-convert"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <UContainer>
        <NuxtPage class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" />
      </UContainer>
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Built with Nuxt UI • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/roiLeon/open-convert"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>

<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Open Convert - Convert files locally in your browser'
const description = 'Open Convert is a free, open-source file converter that runs entirely in your browser. Convert images, videos, audio, and documents instantly without uploading - your files never leave your device.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '/img/Open-Convert.png',
  twitterImage: '/img/Open-Convert.png',
  twitterCard: 'summary_large_image'
})

const route = useRoute()

const items = computed(() => [
  { label: 'Formats', to: '/formats', active: route.path.startsWith('/formats') },
  { label: 'About', to: '/about', active: route.path.startsWith('/about') }
])
</script>
