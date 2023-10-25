<template>
  <div class="v-time-picker">
    <ReTimePicker
      v-model="val1"
      format="HH:mm:ss A"
      :show-header="true"
      :custom-text="customText"
      :hour-range="[13, 11, 12, 0, 1, 2, [4, 10], 13]"
      @close="onClose"
      @open="onOpen"
      @change="onChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ReTimePicker } from '@/components/time-picker';

const val1 = ref('10:10:12 AM');

setTimeout(() => {
  val1.value = '13:09:32 PM';
}, 1000);

const customText = {
  am: 'AM',
  pm: 'PM',
};

const onClose = () => {
  // console.log('%cclose', 'color: #059669; background-color: #D1FAE5');
};

const onOpen = () => {
  // console.log('%copen', 'color: #059669; background-color: #D1FAE5');
};

const onChange = () => {
  // console.log('%cchange', 'color: #059669; background-color: #D1FAE5');
};
</script>

<style lang="scss" scoped>
</style>
