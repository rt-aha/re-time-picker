<template>
  <!-- <p>{{ props.timeString }}</p> -->
  <div
    class="re-time-list" :class="{
      're-time-list--show-header': showHeader,
    }"
  >
    <div class="time-list">
      <div v-if="isValidAType && apmColumnPlacement === 'first'" class="time-range">
        <span class="time-range__header">{{ customText.apm }}</span>
        <div ref="tlapm" class="time-range__list" @scroll="() => setPositionDebounce('tlapm')">
          <span v-for="apmVal of timeList.apm" :key="apmVal" class="time-range__list__item">
            {{ apmVal === '' ? apmVal : customText[apmVal] }}
          </span>
        </div>
      </div>

      <div class="time-range">
        <span class="time-range__header">{{ customText.hour }} </span>
        <div ref="tlh" class="time-range__list" @scroll="() => setPositionDebounce('tlh')">
          <span v-for="(hour, index) of timeList.h" :key="hour + index" class="time-range__list__item">
            {{ hour }}
          </span>
        </div>
      </div>
      <div class="time-range">
        <span class="time-range__header">{{ customText.min }}</span>
        <div ref="tlm" class="time-range__list" @scroll="() => setPositionDebounce('tlm')">
          <span v-for="(hour, index) of timeList.m" :key="hour + index" class="time-range__list__item">
            {{ hour }}
          </span>
        </div>
      </div>
      <div
        v-if="formatType === 'HMS'" class="time-range"
      >
        <span class="time-range__header">{{ customText.sec }}</span>
        <div ref="tls" class="time-range__list" @scroll="() => setPositionDebounce('tls')">
          <span v-for="(hour, index) of timeList.s" :key="hour + index" class="time-range__list__item">
            {{ hour }}
          </span>
        </div>
      </div>

      <div v-if="isValidAType && apmColumnPlacement === 'last'" class="time-range">
        <span class="time-range__header">{{ customText.apm }}</span>
        <div ref="tlapm" class="time-range__list" @scroll="() => setPositionDebounce('tlapm')">
          <span v-for="apmVal of timeList.apm" :key="apmVal" class="time-range__list__item">
            {{ apmVal ? customText[apmVal] : apmVal }}
          </span>
        </div>
      </div>
    </div>
    <div v-for="p of dividerLineConfig" :key="p" class="divider-line divider-line--25" :style="{ left: `${p}%` }" />
  </div>
</template>

<script setup lang="ts">
import { debounce } from 'lodash-es';
import {
  apm,
  genTimeList,
} from './timeListConfig';
import type {
  ApmColumnPlacement,
  ApmCustomText,
  ApmCustomTextUnion,
  CusTimeListRange,
  CustomText,
  FormatType,
  HMode,
  TimeData,
  TimeList,
  TlRefKey,
  TypeLabelKey,
} from './timeListConfig';

interface Props {
  timeData: TimeData
  timeString: string
  show: boolean
  isValidAType?: boolean
  formatType?: FormatType
  apmColumnPlacement: ApmColumnPlacement
  customText: CustomText
  isValidModelValue: boolean
  showHeader: boolean
  hourRange: CusTimeListRange
  minRange: CusTimeListRange
  secRange: CusTimeListRange
  hMode: HMode
}

const props = withDefaults(defineProps<Props>(), {
  boolean: false,
  isValidAType: false,
  formatType: 'HMS',
  isValidModelValue: false,
  showHeader: true,
  hourRange: () => [],
  minRange: () => [],
  secRange: () => [],
});

const emit = defineEmits(['updateTime']);

// const formatCustomText = computed<CustomText>(() => {
//   return {
//     ...props.customText,
//     ...defaultText,
//   };
// });

const dividerLineConfig = computed(() => {
  if (props.isValidAType && props.formatType === 'HMS') {
    return ['25', '50', '75'];
  }

  if (!props.isValidAType && props.formatType === 'HM') {
    return ['50'];
  }

  return ['33.333333', '66.666667'];
});

const SCROLL_OFFSET = 30;
const ADJUST_OFFSET = 3;
// const adjustOffset = computed(() => {
//   // return props.showHeader ? 2 : 3;
//   return 3;
// });

const tlh = ref();
const tlm = ref();
const tls = ref();
const tlapm = ref();

const timeList = computed<TimeList>(() => ({
  // h: genTimeList('h', { hourInterval: 5, hourRange: [0, 1, 2, 3, [4, 6], 10, 11, 12, 13, 14, 15, 16, 17, 18] }),
  h: genTimeList('h', props.hourRange, props.hMode, props.showHeader, { isValidAType: props.isValidAType }),
  m: genTimeList('m', props.minRange, props.hMode, props.showHeader, {}),
  s: genTimeList('s', props.secRange, props.hMode, props.showHeader, {}),
  apm,
}));

const apmLabel = computed<ApmCustomText>(() => ({
  // am: 'am',
  am: props.customText.am,
  pm: props.customText.pm,
}));

const updateTimeLabel = (calcType: TlRefKey, targetPosition: number) => {
  const changeType = calcType.replace('tl', '') as TypeLabelKey;
  const scrollOffsetUnit = targetPosition / SCROLL_OFFSET;
  const newValue = timeList.value[changeType][scrollOffsetUnit + ADJUST_OFFSET];
  const { h, m, s, apm } = props.timeData;

  // console.log('%cnewValue -->', 'color: #059669; background-color: #D1FAE5', newValue);
  // console.log('%ch, m, s, apm -->', 'color: #059669; background-color: #D1FAE5', h, m, s, apm);

  const tempTimeLabel: TimeData = {
    h: changeType === 'h' ? newValue : h,
    m: changeType === 'm' ? newValue : m,
    s: changeType === 's' ? newValue : s,
    apm: changeType === 'apm' ? apmLabel.value[(newValue as ApmCustomTextUnion)] : apm,
  };

  // console.log('tempTimeLabel', tempTimeLabel);

  emit('updateTime', tempTimeLabel);
};

const getTlScrollTop = (tlType: TlRefKey) => {
  if (tlType === 'tlh') {
    return tlh.value.scrollTop;
  }
  if (tlType === 'tlm') {
    return tlm.value.scrollTop;
  }
  if (tlType === 'tls' && props.formatType === 'HMS') {
    return tls.value.scrollTop;
  }

  if (tlType === 'tlapm' && props.isValidAType) {
    return tlapm.value.scrollTop;
  }
};

const setTlScrollTop = (tlType: TlRefKey, targetPosition: number) => {
  if (tlType === 'tlh') {
    tlh.value.scrollTop = targetPosition;
  }
  if (tlType === 'tlm') {
    tlm.value.scrollTop = targetPosition;
  }
  if (tlType === 'tls' && props.formatType === 'HMS') {
    tls.value.scrollTop = targetPosition;
  }
  if (tlType === 'tlapm' && props.isValidAType) {
    tlapm.value.scrollTop = targetPosition;
  }
};

const calcScrollBarPosition = (tlType: TlRefKey) => {
  const scrollBarPosition = getTlScrollTop(tlType);

  // 若捲動位置不是 30 倍數，調整 scrollTop 位置
  if (scrollBarPosition / SCROLL_OFFSET !== 0) {
    const remainder = scrollBarPosition % SCROLL_OFFSET;
    let offsetBase = Math.floor(scrollBarPosition / SCROLL_OFFSET);
    if (remainder > 15) {
      offsetBase += 1;
    }

    const targetPostion = offsetBase * SCROLL_OFFSET;
    setTlScrollTop(tlType, targetPostion);
    updateTimeLabel(tlType, targetPostion);

    return;
  }

  updateTimeLabel(tlType, scrollBarPosition);
};

const setPositionDebounce = debounce((tlType) => {
  // console.log('%cDate.now() -->', 'color: #059669; background-color: #D1FAE5', Date.now());
  calcScrollBarPosition(tlType);
}, 100);

// const setPositionDebounce = (tlType: TlRefKey) => {
//   let timer: any = null;
//   const genTimer = () => {
//     timer = setTimeout(() => {
//       calcScrollBarPosition(tlType);
//       clearTimeout(timer);
//     }, 500);
//   };

//   genTimer();
// };

const setScrollBarPosition = async () => {
  if (!props.isValidModelValue) {
    return;
  }

  await nextTick();

  const hIdx = timeList.value.h.findIndex(item => item === props.timeData.h) - ADJUST_OFFSET;
  const mIdx = timeList.value.m.findIndex(item => item === props.timeData.m) - ADJUST_OFFSET;
  const sIdx = timeList.value.s.findIndex(item => item === props.timeData.s) - ADJUST_OFFSET;
  const apmIdx = timeList.value.apm.findIndex((item: ApmCustomTextUnion | '') => {
    if (item === '') {
      return false;
    }
    return props.customText[item] === props.timeData.apm;
  }) - ADJUST_OFFSET;

  setTlScrollTop('tlh', (hIdx > 0 ? hIdx : 0) * SCROLL_OFFSET);
  setTlScrollTop('tlm', (mIdx > 0 ? mIdx : 0) * SCROLL_OFFSET);
  setTlScrollTop('tls', (sIdx > 0 ? sIdx : 0) * SCROLL_OFFSET);
  setTlScrollTop('tlapm', (apmIdx > 0 ? apmIdx : 0) * SCROLL_OFFSET);
};

watch(() => [props.show, props.isValidModelValue, props.timeString], (newVal) => {
  if (newVal[0] && newVal[1]) {
    setScrollBarPosition();
  }
});

setScrollBarPosition();
</script>

<style lang="scss" scoped>
$item-height: 30px;

.re-time-list {
  background-color: $c-white;

  &--show-header {
    .time-range__header {
      display: inline-flex;
    }
  }
}

.time-list {
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  width: 100%;
  height: $item-height * 7;

  &::before {
    position: absolute;
    top: $item-height * 3;
    left: 50%;
    width: 100%;
    height: 1px;
    content: "";
    background-color: $c-form-assist;
    transform: translateX(-50%);
  }

  &::after {
    position: absolute;
    top: $item-height * 4 - 1;
    left: 50%;
    width: 100%;
    height: 1px;
    content: "";
    background-color: $c-form-assist;
    transform: translateX(-50%);
  }

}

.time-range {
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  width: 100%;
  height: $item-height * 7;

  &__header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba($c-form-assist2, 0.5);
    @include font-style($c-main, 14, 700);
    backdrop-filter: blur(2px);
    display: none;
    // display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30px;

  }

  &__list {
    display: inline-block;
    flex: 1;
    height: 100%;
    overflow-y: auto;
    font-size: 0;
    vertical-align: top;
    position: relative;
    text-align: center;

    &__item {
      @include font-style($c-form-main, 14);
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: $item-height;

    }
  }
}

.divider-line {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 100%;
  background-color: $c-form-assist;

  &--25 {
    left: 25%;
  }

  &--50 {
    left: 50%;
  }

  &--75 {
    left: 75%;
  }
}
</style>
