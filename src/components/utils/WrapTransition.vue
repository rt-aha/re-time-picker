<template>
  <!-- v-bind="listeners" -->
  <transition mode="out-in">
    <!-- 当visible的值发生改变时，过渡组件的监听器就会触发 -->
    <div
      v-show="show" class="re-collapse-transition"
    >
      <slot />
    </div>
  </transition>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
}

withDefaults(defineProps<Props>(), {
  show: false,
  border: true,
  whiteBg: true,
});
</script>

<style lang="scss">
.re-collapse-transition {
  overflow: hidden;
  border-radius: var(--rtp-br-dropdown);
  border: 1px solid var(--rtp-c-dropdown-border);
  background-color: var(--rtp-c-dropdown-bg);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
