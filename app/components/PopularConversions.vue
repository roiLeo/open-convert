<template>
  <section class="mb-12">
    <h2 class="text-2xl font-semibold mb-6">
      Popular conversions
    </h2>
    <UPageGrid class="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <UPageCard
        v-for="(card, index) in popularConversions"
        :key="index"
        v-bind="card"
        :ui="{ container: 'justify-center' }"
      />
    </UPageGrid>
  </section>
</template>

<script setup lang="ts">
const popularConversions = ref([
  {
    title: 'PNG → JPG',
    to: '/png-to-jpg'
  },
  {
    title: 'JPG → PNG',
    to: '/jpg-to-png'
  },
  {
    title: 'WEBP → PNG',
    to: '/webp-to-png'
  },
  {
    title: 'PNG → WEBP',
    to: '/png-to-webp'
  },
  {
    title: 'MP4 → MP3',
    to: '/png-to-jpg'
  },
  {
    title: 'MOV → MP4',
    to: '/mov-to-mp4'
  },
  {
    title: 'WAV → MP3',
    to: '/wav-to-mp3'
  },
  {
    title: 'FLAC → MP3',
    to: '/flac-to-mp3'
  },
  {
    title: 'MD → HTML',
    to: '/md-to-html'
  },
  {
    title: 'HTML → MD',
    to: '/html-to-md'
  }
])
</script>
