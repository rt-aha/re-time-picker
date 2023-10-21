<template>
  <div class="v-time-picker">
    <ReTimePicker
      v-model="val1"
      format="A HH:mm:ss"
      :show-header="false"
      apm-column-placement="first"
      :custom-text="customText"
      @close="onClose"
      @open="onOpen"
      @change="onChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ReTimePicker } from '@/components/time-picker';

const val1 = ref('10:10:10 上午');

const customText = {
  am: '上午',
  pm: '下午',
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
@/components/time-picker
