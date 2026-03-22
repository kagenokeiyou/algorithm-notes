<script setup lang="ts">
const props = defineProps<{
  index: number
  value: number
  selected: boolean
  used: boolean
}>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-1 font-mono leading-none select-none text-neutral-100"
  >
    <div
      class="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-600 transition-colors"
      :class="{ 'border-2 border-red-500': props.selected, 'bg-neutral-500': props.used }"
    >
      <div v-text="props.value" class="font-bold text-xl"></div>
    </div>
    <div v-text="props.index" class="font-normal text-base"></div>
  </div>
</template>
