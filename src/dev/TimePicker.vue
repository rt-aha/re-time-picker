<template>
  <div class="v-time-picker">
    <ReTimePicker
      v-model="val1"
      :sec-interval="5"
    />

    <ReTimePicker
      v-model="val2"
      :sec-range="secRange"
      :sec-interval="15"
    />
  </div>
</template>

<script setup lang="ts">
import { ReTimePicker } from '@/components/time-picker';

const val1 = ref('18:10:12 AM');
const val2 = ref('18:10:12 AM');
const secRange = [10, 30, 20, 0, [1, 50], 51];
</script>
