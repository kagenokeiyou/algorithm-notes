<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  icon?: string
  text?: string
  disabled?: boolean
}>()
</script>

<template>
  <button
    :disabled="props.disabled"
    class="flex flex-row items-center justify-center gap-1 min-w-16 min-h-8 p-2 rounded-lg bg-neutral-800 text-base leading-none select-none text-neutral-200"
    :class="{ 'hover:bg-neutral-700': !props.disabled, 'text-neutral-600': props.disabled }"
  >
    <Icon v-if="props.icon" :icon="props.icon" :inline="true" />
    <div v-if="props.text" v-text="props.text"></div>
  </button>
</template>
