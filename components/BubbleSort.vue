<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseButton from './BaseButton.vue'
import BaseCard from './BaseCard.vue'
import BorderCard from './BorderCard.vue'
import { DataArray, sleep } from './utils'
import ValueBox from './ValueBox.vue'

const disableAll = ref(false)
const autoPlaying = ref(false)
const autoPlayCompleted = ref(false)
const manualPlayCompleted = ref(false)
const dataArray = reactive(new DataArray([4, 1, 3, 1, 5, 2]))
const forI = ref(dataArray.items.length - 1)
const forJ = ref(0)


function syncForIJK(i: number, j: number) {
  forI.value = i
  forJ.value = j
}


async function autoPlay() {
  autoPlayCompleted.value = false
  while (autoPlaying.value) {
    const items = dataArray.items
    for (let i = items.length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        syncForIJK(i, j)
        items[j].selected = true
        items[j + 1].selected = true
        await sleep(500)
        if (items[j].value > items[j + 1].value) {
          ;[items[j], items[j + 1]] = [items[j + 1], items[j]]
          await sleep(700)
        }
        items[j].selected = false
        items[j + 1].selected = false
      }
      items[i].used = true
      await sleep(500)
    }
    reset()
    await sleep(500)
  }
  autoPlayCompleted.value = true
}


async function toggleAutoPlay() {
  autoPlaying.value = !autoPlaying.value
  if (autoPlaying.value) {
    autoPlay()
  } else {
    while (!autoPlayCompleted.value) {
      disableAll.value = true
      await sleep(100)
    }
    disableAll.value = false
  }
}


function reset() {
  dataArray.reset()
  forI.value = 0
  forJ.value = 0
  manualPlayCompleted.value = false
}


async function manualPlay() {
  disableAll.value = true
  const items = dataArray.items
  let i = forI.value
  for (let j = 0; j < i; j++) {
    syncForIJK(i, j)
    items[j].selected = true
    items[j + 1].selected = true
    await sleep(500)
    if (items[j].value > items[j + 1].value) {
      ;[items[j], items[j + 1]] = [items[j + 1], items[j]]
      await sleep(700)
    }
    items[j].selected = false
    items[j + 1].selected = false
  }
  items[i].used = true
  await sleep(500)
  i--
  forI.value = i
  if (i <= 0) {
    manualPlayCompleted.value = true
  }
  disableAll.value = false
}
</script>

<template>
  <BaseCard class="flex flex-col items-center justify-center gap-4">
    <BorderCard class="flex flex-col items-center justify-center gap-4">
      <TransitionGroup
        name="list"
        tag="div"
        class="flex flex-row flex-wrap items-center justify-center gap-4"
      >
        <ValueBox
          v-for="(item, index) in dataArray.items"
          :index="index"
          :value="item.value"
          :key="item.key"
          :selected="item.selected"
          :used="item.used"
        />
      </TransitionGroup>
      <div
        class="flex flex-row items-center justify-center gap-4 font-mono text-base leading-none select-none text-neutral-200"
      >
        <div>i = {{ forI }}</div>
        <div>j = {{ forJ }}</div>
      </div>
    </BorderCard>
    <div class="flex flex-row items-center justify-center gap-4">
      <BaseButton
        :icon="autoPlaying ? 'fluent:pause-16-filled' : 'fluent:play-16-filled'"
        :text="autoPlaying ? '暂停' : '自动'"
        :disabled="disableAll"
        @click="toggleAutoPlay()"
      />
      <BaseButton
        icon="fluent:arrow-clockwise-16-filled"
        text="重置"
        :disabled="disableAll || autoPlaying"
        @click="reset()"
      />
      <BaseButton
        icon="fluent:arrow-right-16-filled"
        text="下一步"
        :disabled="disableAll || autoPlaying || manualPlayCompleted"
        @click="manualPlay()"
      />
    </div>
  </BaseCard>
</template>
