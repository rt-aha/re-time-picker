<template>
  <div ref="reTimePickerRef" class="re-time-picker">
    <FieldShell :disabled="disabled">
      <template v-if="slots.prefix" #prefix>
        <slot name="prefix" />
      </template>
      <template #default>
        <div class="time-picker" @click="() => handleExpandStatus(true)">
          <input :value="timeString" class="time-picker__field" readonly :placeholder="placeholder">
        </div>
      </template>
      <template #suffix>
        <slot name="suffix">
          <img
            v-if="showIcon"
            class="drop-icon" :class="{
              'drop-icon--active': isExpand,
            }" src="@/assets/icons/time.svg"
          >
        </slot>
      </template>
    </FieldShell>
    <FieldShellExpandTransition :show="isExpand" :get-anchor-element="() => reTimePickerRef">
      <template #upper>
        <slot name="upper" />
      </template>
      <template #default="{ show }">
        <ReTimeList
          ref="timeListRef"
          :time-data="timeData"
          :time-string="timeString"
          :is-valid-model-value="isValidModelValue"
          :show="show"
          :show-header="showHeader"
          :is-valid-a-type="isValidAType"
          :format-type="formatType"
          :apm-column-placement="apmColumnPlacement"
          :custom-text="formatDefaultCustomText"
          :hour-range="hourRange"
          :min-range="minRange"
          :sec-range="secRange"
          :h-mode="hMode"
          @updateTime="updateTime"
        />
      </template>
    </FieldShellExpandTransition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import ReTimeList from './TimeList.vue';
import {
  defaultFormat,
  defaultText,
  formatMappingRegExp,
  validHmFormatRegExp,
  validHmRegExp,
  validHmWithGroupRegExp,
  validHmsFormatRegExp,
  validHmsRegExp,
  validHmsWithGroupRegExp,
  validTokens,
} from './timeListConfig';
import type {
  AmpTokens,
  ApmColumnPlacement,
  CusTimeListRange,
  CustomText,
  FormatType,
  HMode,
  HourTokens,
  MinTokens,
  SecTokens,
  TimeData,
  ValueMatchFormatType,
} from './timeListConfig';
import FieldShell from '@/components/utils/FieldShell.vue';
import FieldShellExpandTransition from '@/components/utils/FieldShellExpandTransition.vue';
import useExapndTransition from '@/hooks/useExpandTransition';

interface Props {
  modelValue: string
  format?: string
  disabled?: boolean
  placeholder?: string
  apmColumnPlacement?: ApmColumnPlacement
  customText?: Partial<CustomText>
  showIcon?: boolean
  showHeader?: boolean
  hourRange?: CusTimeListRange
  minRange?: CusTimeListRange
  secRange?: CusTimeListRange
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '00:00:00',
  format: () => defaultFormat,
  disabled: false,
  placeholder: '',
  apmColumnPlacement: 'last',
  customText: () => ({}),
  showIcon: true,
  showHeader: true,
  hourRange: () => [],
  minRange: () => [],
  secRange: () => [],
});

const emit = defineEmits(['update:modelValue', 'open', 'close', 'change']);

const slots = useSlots();
const usedformat = ref(props.format);
const isValidModelValue = ref(false);
const timeData = ref<TimeData>({
  h: '00',
  m: '00',
  s: '00',
  apm: 'AM',
});
const timeListRef = ref();
const reTimePickerRef = ref();
const formatTokens = reactive<{
  h: HourTokens
  m: MinTokens
  s: SecTokens
  amp: AmpTokens
}>({
  h: 'HH',
  m: 'mm',
  s: 'ss',
  amp: 'A',
});
const hMode = ref<HMode>('24h');

const isValidAType = computed<boolean>(() => {
  const hasAmpToken = validTokens.amp.some(item => usedformat.value.includes(item));
  if (hasAmpToken) {
    return true;
  }

  return false;
});
const formatType = computed<FormatType>(() => {
  let type: FormatType = null;

  const hasHourToken = validTokens.hour.some(item => usedformat.value.includes(item));
  const hasMinToken = validTokens.min.some(item => usedformat.value.includes(item));
  const hasSecToken = validTokens.sec.some(item => usedformat.value.includes(item));

  if (hasHourToken && hasMinToken) {
    type = 'HM';
  }

  if (hasSecToken) {
    type = 'HMS';
  }

  return type;
});

const formatDefaultCustomText = computed<CustomText>(() => {
  return {
    ...defaultText,
    ...props.customText,
  };
});

const afterOpen = () => {
  emit('open');
};
const afterClose = () => {
  emit('close');
};
const { isExpand, handleExpandStatus } = useExapndTransition({ afterClose, afterOpen, getDisabled: () => props.disabled });

const timeString = ref(props.modelValue);

const genFormatHmsaMapping = (val: TimeData): Record<string, string> => {
  const { h, m, s } = val;
  const apm = val.apm;

  const mode24H = +h;
  const mode12H = +h > 12 ? +h - 12 : +h;

  // H 24小時制

  return {
    HH: +mode24H < 10 ? `0${+mode24H}` : `${mode24H}`,
    H: `${+mode24H}`,
    hh: +mode12H < 10 ? `0${+mode12H}` : `${mode12H}`,
    h: `${+mode12H}`,
    mm: +m < 10 ? `0${+m}` : m,
    m,
    ss: +s < 10 ? `0${+s}` : s,
    s,
    A: /[a-zA-Z]/g.test(apm) ? apm.toUpperCase() : apm,
    a: /[a-zA-Z]/g.test(apm) ? apm.toLowerCase() : apm,
  };
};

const setToDefaultFormatAndTime = (): TimeData => {
  usedformat.value = defaultFormat;
  const defaultTimeData: TimeData = {
    h: '00',
    m: '00',
    s: '00',
    apm: defaultText.am,
  };

  return defaultTimeData;
};

const updateValueToMatchFormat = (type: ValueMatchFormatType, apm = ''): TimeData => {
  if (['a', 'A'].includes(apm)) {
    formatTokens.amp = apm as AmpTokens;
  }

  let timeVal: TimeData = {
    h: '',
    m: '',
    s: '',
    apm: '',
  };

  if (type === 'hms') {
    const matchResult = props.modelValue.match(validHmsWithGroupRegExp);

    timeVal = {
      h: matchResult?.[1] || '',
      m: matchResult?.[2] || '',
      s: matchResult?.[3] || '',
      apm,
    };
  }

  if (type === 'hm') {
    const matchResult = props.modelValue.match(validHmWithGroupRegExp);

    timeVal = {
      h: matchResult?.[1] || '',
      m: matchResult?.[2] || '',
      s: '',
      apm,
    };
  }

  return timeVal;
  // updateTime(timeVal);
};

const checkModelValue: () => [ValueMatchFormatType | null, string] = () => {
  const isHmsValid = validHmsRegExp.test(props.modelValue);

  if (isHmsValid) {
    let remainderApm = props.modelValue.replace(validHmsRegExp, '');
    remainderApm = remainderApm.replace(/\s/g, '');

    if (remainderApm === '') {
      return ['hms', ''];
    }
    const { am, pm } = formatDefaultCustomText.value;
    const isExist = [am, pm].includes(remainderApm);

    if (isExist) {
      return ['hms', remainderApm];
    }
  }

  const isHmValid = validHmRegExp.test(props.modelValue);

  if (isHmValid) {
    let remainderApm = props.modelValue.replace(validHmRegExp, '');
    remainderApm = remainderApm.replace(/\s/g, '');

    if (remainderApm === '') {
      return ['hm', ''];
    }

    const { am, pm } = formatDefaultCustomText.value;
    const isExist = [am, pm].includes(remainderApm);

    if (isExist) {
      return ['hm', remainderApm];
    }
  }

  return [null, ''];
};

const checkFormat = (): boolean => {
  const validApm = (apm: string) => {
    const remainderApm = apm.replace(/\s/g, '');
    const isExist = ['a', 'A', ''].includes(remainderApm);
    if (isExist) {
      return true;
    }
    return false;
  };

  const isHmsValid = validHmsFormatRegExp.test(usedformat.value);
  if (isHmsValid) {
    const remainderApm = usedformat.value.replace(validHmsFormatRegExp, '');
    return validApm(remainderApm);
  }

  const isHmValid = validHmFormatRegExp.test(usedformat.value);
  if (isHmValid) {
    const remainderApm = usedformat.value.replace(validHmFormatRegExp, '');
    return validApm(remainderApm);
  }

  return false;
};

const setHMode = () => {
  const HRegExp = /H/;
  const hRegExp = /h/;
  const HHRegExp = /HH/;
  const hhRegExp = /hh/;

  const is12h = usedformat.value.match(hRegExp) || usedformat.value.match(hhRegExp);
  const is24h = usedformat.value.match(HRegExp) || usedformat.value.match(HHRegExp);

  if (is12h) {
    hMode.value = '12h';
  }

  if (is24h) {
    hMode.value = '24h';
  }
};

const genTimeDataAndString = (val: TimeData) => {
  const formatHmsaMapping = genFormatHmsaMapping(val);

  const fullTimeFormat = usedformat.value.replace(formatMappingRegExp, (val: string) => {
    return formatHmsaMapping[val];
  });

  const { m, s } = formatHmsaMapping;

  timeData.value = {
    h: formatHmsaMapping[formatTokens.h],
    m,
    s,
    apm: formatHmsaMapping[formatTokens.amp],
  };

  timeString.value = fullTimeFormat;
};

const validModelValueAndFormat = () => {
  isValidModelValue.value = false;

  const isValidFormat = checkFormat();
  const [hmsType, apmVal] = checkModelValue();

  if (hmsType && isValidFormat) {
    const tempTimeData = updateValueToMatchFormat(hmsType, apmVal);
    genTimeDataAndString(tempTimeData);
  }
  else {
    const defaultTimeData = setToDefaultFormatAndTime();
    genTimeDataAndString(defaultTimeData);
  }

  setHMode();
  isValidModelValue.value = true;
};

const updateTime = async (val: TimeData) => {
  genTimeDataAndString(val);

  emit('update:modelValue', timeString.value);
  emit('change', timeString.value);

  await nextTick();
};

validModelValueAndFormat();

watch(() => props.modelValue, () => {
  validModelValueAndFormat();
});
onClickOutside(reTimePickerRef, () => handleExpandStatus(false));
</script>

<style lang="scss" scoped>
.re-time-picker {
  position: relative;
}

.apm {
  @include padding(5px);
  @include flex(flex-end);
}
.time-picker {
  position: relative;
  min-height: 36px;
  height: 100%;
  @include flex();

  &__field {
    @include font-style(var(--rtp-c-field-value), 14, 400);
    width: 100%;
    height: 100%;
    cursor: inherit;
    background-color: transparent;
    border: 0;
    outline: 0;
  }
}

.drop-icon {
  flex: none;
  width: 15px;
}
</style>
