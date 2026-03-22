---
order: 3
title: 冒泡排序
---

<script setup lang="ts">
import BubbleSort from '../components/BubbleSort.vue'
</script>

# 冒泡排序

冒泡排序（bubble sort）通过连续地比较与交换相邻元素实现排序。这个过程就像气泡从底部升到顶部一样，因此得名冒泡排序。

从数组最左端开始向右遍历，依次比较相邻元素大小，如果 “左元素 > 右元素” 就交换二者。遍历完成后，最大的元素会被移动到数组的最右端。

::: code-group

```ts [TypeScript]
function bubbleSort(nums: number[]): void {
  for (let i = nums.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (nums[j] > nums[j + 1]) {
        ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
      }
    }
  }
}
```

:::

<BubbleSort />
