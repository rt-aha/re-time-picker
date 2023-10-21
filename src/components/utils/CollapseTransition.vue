<template>
  <transition v-bind="listeners">
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
  border: boolean
  whiteBg: boolean

}

withDefaults(defineProps<Props>(), {
  show: false,
  border: true,
  whiteBg: true,
});

const listeners = {
  // 元素由隐藏变为可见
  onEnter(el: any) {
    el.style.height = 'auto'; // 将高度设为auto，是为了获取该元素的计算高度
    const endHeight = window.getComputedStyle(el).height; // 计算高度
    el.style.height = '0px'; // 将高度再设置为0
    // eslint-disable-next-line no-unused-expressions
    el.offsetHeight; // 强制重繪
    el.style.height = endHeight; // 设置为计算高度
  },
  onAfterEnter(el: any) {
    el.style.height = ''; // 过渡进入之后，将高度恢复为null
  },
  // 元素由可见变为隐藏
  onLeave(el: any) {
    el.style.height = window.getComputedStyle(el).height; // 计算高度
    // eslint-disable-next-line no-unused-expressions
    el.offsetHeight; // 强制重繪
    el.style.height = '0px'; // 将高度设置为0
  },
  onAfterLeave(el: any) {
    el.style.height = ''; // 过渡离开之后，将高度恢复为null
  },
};
</script>

<style lang="scss">
.re-collapse-transition {
  overflow: hidden;

  border-radius: 4px;
  transition: height 0.22s ease-in-out;

  &--border {
    border: 1px solid $c-form-border;
  }

  &--white-bg {
    background-color: $c-white;
  }
}
</style>
