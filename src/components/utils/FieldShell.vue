<template>
  <div class="re-field-shell" :class="{ 're-field-shell--disabled': disabled }">
    <div class="re-field-shell__content">
      <div v-if="slots.prefix" class="re-field-shell__content__prefix">
        <slot name="prefix" />
      </div>

      <div class="re-field-shell__content__default">
        <slot />
      </div>
      <div v-if="slots.suffix" class="re-field-shell__content__suffix">
        <slot name="suffix" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

interface Props {
  disabled?: boolean
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  placeholder: 'placeholder ...',
});

const slots = useSlots();
</script>

<style lang="scss">
// @import '@/styles/global/index.scss';

.re-field-shell {
  @include padding(0);
  @include flex();
  width: 100%;
  height: 100%;
  min-height: 36px;
  border: 1px solid var(--rtp-field-border-color);
  border-radius: var(--rtp-field-border-radius);
  cursor: pointer;

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &__content {
    @include flex(center, center);
    width: 100%;
    height: 100%;

    &__prefix {
      @include padding(0 0 0 8px);
      @include form-font();
      @include flex(center);
      flex: none;
      width: auto;
      height: 100%;
    }

    &__default {
      @include padding(0 8px);
      flex: 1;
      height: 100%;
    }

    &__suffix {
      @include padding(0 8px 0 0);
      @include form-font();
      @include flex(center);
      flex: none;
      width: auto;
      height: 100%;
    }
  }

}
</style>
