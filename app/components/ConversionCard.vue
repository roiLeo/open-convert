<template>
  <UCard>
    <div class="flex items-start gap-4">
      <!-- File Icon -->
      <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
        <UIcon
          :name="getFileIcon(conversion.inputFormat)"
          class="size-6 text-primary"
        />
      </div>

      <!-- File Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-4 mb-3">
          <div class="flex-1 min-w-0">
            <h3 class="text-sm font-semibold text-highlighted truncate">
              {{ conversion.fileName }}
            </h3>
            <p class="text-xs text-primary mt-1">
              {{ formatFileSize(conversion.fileSize) }}
              <span v-if="conversion.convertedSize && conversion.status === 'completed'">
                → {{ formatFileSize(conversion.convertedSize) }} (-{{ getSizeReduction(conversion.fileSize, conversion.convertedSize) }}%)
              </span>
            </p>
          </div>

          <!-- Remove Button -->
          <UButton
            icon="i-heroicons-x-mark"
            variant="ghost"
            size="sm"
            @click="$emit('remove', conversion)"
          />
        </div>

        <!-- Format Selection -->
        <div
          v-if="conversion.status === 'pending'"
          class="flex items-center gap-3 mb-3"
        >
          <UBadge
            variant="subtle"
            size="lg"
          >
            {{ conversion.inputFormat.toUpperCase() }}
          </UBadge>

          <UIcon
            name="i-heroicons-arrow-right"
            class="w-5 h-5 text-muted"
          />

          <USelectMenu
            v-model="selectedFormat"
            :items="getAvailableFormats(conversion.inputFormat)"
            placeholder="Select format"
            size="md"
            class="w-40"
          />

          <UButton
            label="Convert"
            color="primary"
            :disabled="!selectedFormat"
            @click="startConversion"
          />
        </div>

        <!-- Converting Progress -->
        <div
          v-else-if="conversion.status === 'converting'"
          class="space-y-2"
        >
          <div class="flex items-center justify-between text-sm">
            <span class="text-muted">Converting...</span>
            <span class="text-highlighted font-medium">{{ conversion.progress }}%</span>
          </div>
          <UProgress
            :value="conversion.progress"
            color="primary"
          />
        </div>

        <!-- Completed -->
        <div
          v-else-if="conversion.status === 'completed'"
          class="flex items-center gap-3"
        >
          <UBadge
            color="success"
            variant="subtle"
            size="lg"
          >
            <UIcon
              name="i-heroicons-check-circle"
              class="w-4 h-4 mr-1"
            />
            Completed
          </UBadge>

          <UBadge
            variant="subtle"
            size="lg"
          >
            {{ conversion.inputFormat.toUpperCase() }} → {{ selectedFormat.toUpperCase() }}
          </UBadge>

          <div class="flex-1" />

          <UButton
            label="Download"
            icon="i-heroicons-arrow-down-tray"
            color="success"
            @click="$emit('download', conversion)"
          />
        </div>

        <!-- Error -->
        <div
          v-else-if="conversion.status === 'error'"
          class="flex items-center gap-3"
        >
          <UBadge
            color="error"
            variant="subtle"
            size="lg"
          >
            <UIcon
              name="i-heroicons-exclamation-circle"
              class="w-4 h-4 mr-1"
            />
            Error
          </UBadge>
          <span class="text-sm text-error">{{ conversion.error }}</span>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { ConversionItem } from '~/types'

const props = defineProps<{
  conversion: ConversionItem
}>()

const emit = defineEmits<{
  convert: [conversion: ConversionItem]
  download: [conversion: ConversionItem]
  remove: [conversion: ConversionItem]
}>()

const selectedFormat = ref('')

const startConversion = () => {
  if (!selectedFormat.value) return

  const updatedConversion = {
    ...props.conversion,
    outputFormat: selectedFormat.value.toLowerCase()
  }

  emit('convert', updatedConversion)
}

watch(selectedFormat, startConversion)
</script>
