<template>
  <!-- v-bind="listeners" -->
  <transition mode="out-in">
    <!-- 当visible的值发生改变时，过渡组件的监听器就会触发 -->
    <div
      v-show="show" class="re-collapse-transition"
      :class="{
        're-collapse-transition--border': border,
        're-collapse-transition--white-bg': whiteBg,
      }"
    >
      <slot />
    </div>
  </transition>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
  border?: boolean
  whiteBg?: boolean
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
  border-radius: 4px;
  // transition: opacity 1s ease-in-out;

  &--border {
    border: 1px solid $c-form-border;
  }

  &--white-bg {
    background-color: $c-white;
  }
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
