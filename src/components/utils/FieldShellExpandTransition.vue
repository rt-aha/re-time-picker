<template>
  <div class="field-shell-expand-transition" :class="[`field-shell-expand-transition--position--${showPosition}`]">
    <ReWrapTransition :show="show" :positon="showPosition">
      <template v-if="slots.upper">
        <div class="field-shell-expand-transition__uppper">
          <slot name="upper" />
        </div>
      </template>

      <template v-if="slots.default">
        <slot :show="show" />
      </template>
    </ReWrapTransition>
  </div>
</template>

<script setup lang="ts">
import useCalcElement from '@/hooks/useCalcElement';
import ReWrapTransition from '@/components/utils/WrapTransition.vue';

interface Props {
  show: boolean
  getAnchorElement: () => HTMLElement
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  show: false,

});

const slots = useSlots();

// const getAnchorElement = inject('getAnchorElement') as () => HTMLElement;
const { showPosition, calcShowPosition } = useCalcElement(props.getAnchorElement);

watch(() => props.show, () => {
  calcShowPosition();
});
</script>

<style lang="scss" scoped>
.field-shell-expand-transition {
  z-index: 100;
  width: 100%;

  &--position {
    &--top {
      @include position(tl, -5px, 0);
      transform: translateY(-100%);

    }

    &--bottom {
      @include position(tl, calc(100% + 5px), 0);
    }
  }
}
</style>
