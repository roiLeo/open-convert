<template>
  <div
    class="relative rounded-2xl border-2 border-dashed transition-colors duration-200"
    :class="[
      isDragging
        ? 'border-primary bg-primary/5'
        : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50'
    ]"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
  >
    <input
      ref="fileInput"
      type="file"
      multiple
      class="hidden"
      @change="handleFileInput"
    >

    <div
      class="flex flex-col items-center justify-center py-16 px-8 cursor-pointer"
      @click="triggerFileInput"
    >
      <div class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <UIcon
          :name="isDragging ? 'i-heroicons-arrow-down-tray' : 'i-heroicons-cloud-arrow-up'"
          class="w-10 h-10 text-primary"
        />
      </div>

      <p class="text-xl font-semibold text-highlighted mb-2">
        {{ isDragging ? 'Drop files here' : 'drag & drop files here' }}
      </p>

      <p class="text-gray-600 dark:text-gray-400 mb-4">
        or click to browse
      </p>

      <p class="text-sm text-gray-500 dark:text-gray-500">
        images, videos, audio, documents - all processed locally
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  filesSelected: [files: File[]]
}>()

const isDragging = ref(false)
const fileInput = ref<HTMLInputElement>()

const handleDragOver = () => {
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  const files = Array.from(e.dataTransfer?.files || [])
  if (files.length > 0) {
    emit('filesSelected', files)
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = Array.from(target.files || [])
  if (files.length > 0) {
    emit('filesSelected', files)
  }
  // Reset input
  if (target) target.value = ''
}
</script>
