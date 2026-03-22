---
order: 2
title: 选择排序
---

<script setup lang="ts">
import SelectionSort from '../components/SelectionSort.vue'
</script>

# 选择排序

选择排序（selection sort）：开启一个循环，每轮从未排序区间选择最小的元素，将其放到已排序区间的末尾。

::: code-group

```ts [TypeScript]
function selectionSort(nums: number[]): void {
    let n = nums.length;
    for (let i = 0; i < n - 1; i++) {
        let k = i;
        for (let j = i + 1; j < n; j++) {
            if (nums[j] < nums[k]) {
                k = j;
            }
        }
        [nums[i], nums[k]] = [nums[k], nums[i]];
    }
}
```

:::

<SelectionSort />
