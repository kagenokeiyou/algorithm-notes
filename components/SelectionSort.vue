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
const forI = ref(0)
const forJ = ref(0)
const forK = ref(0)


function syncForIJK(i: number, j: number, k: number) {
  forI.value = i
  forJ.value = j
  forK.value = k
}


async function autoPlay() {
  autoPlayCompleted.value = false
  while (autoPlaying.value) {
    const items = dataArray.items
    const n = items.length
    for (let i = 0; i < n - 1; i++) {
      let k = i
      for (let j = i + 1; j < n; j++) {
        if (items[j].value < items[k].value) {
          k = j
        }
        syncForIJK(i, j, k)
        await sleep(100)
      }
      items[k].selected = true
      await sleep(500)
      items[k].used = true
      items[k].selected = false
      ;[items[i], items[k]] = [items[k], items[i]]
      await sleep(700)
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
  forK.value = 0
  manualPlayCompleted.value = false
}


async function manualPlay() {
  disableAll.value = true
  const items = dataArray.items
  const n = items.length
  let i = forI.value
  let k = i
  for (let j = i + 1; j < n; j++) {
    if (items[j].value < items[k].value) {
      k = j
    }
    syncForIJK(i, j, k)
    await sleep(100)
  }
  items[k].selected = true
  await sleep(700)
  items[k].used = true
  items[k].selected = false
  ;[items[i], items[k]] = [items[k], items[i]]
  await sleep(700)
  i++
  if (i >= n - 1) {
    manualPlayCompleted.value = true
  } else {
    forI.value = i
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
        <div>k = {{ forK }}</div>
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
