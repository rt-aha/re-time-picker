<template>
  <div class="v-time-picker">
    <ReTimePicker
      v-model="val1"
      format="HH:mm A"
    />

    <ReTimePicker
      v-model="val1"
      format="A hh:mm:ss"
    />
  </div>
</template>

<script setup lang="ts">
import { ReTimePicker } from '@/components/time-picker';

const val1 = ref('10:10:12 AM');
</script>
