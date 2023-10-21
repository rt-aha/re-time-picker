import './style.css';
import { getCurrentScope, onScopeDispose, unref, watch, defineComponent, computed, ref, openBlock, createElementBlock, normalizeClass, createElementVNode, toDisplayString, Fragment, renderList, createCommentVNode, normalizeStyle, nextTick, useSlots, renderSlot, createBlock, Transition, withCtx, withDirectives, vShow, createVNode, reactive, createSlots } from "vue";
const _imports_0 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0xMiAyMGM0LjQgMCA4LTMuNiA4LThzLTMuNi04LTgtOHMtOCAzLjYtOCA4czMuNiA4IDggOG0wLTE4YzUuNSAwIDEwIDQuNSAxMCAxMHMtNC41IDEwLTEwIDEwUzIgMTcuNSAyIDEyUzYuNSAyIDEyIDJtNSA5LjVWMTNoLTZWN2gxLjV2NC41SDE3WiIvPjwvc3ZnPg==";
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
const isClient = typeof window !== "undefined" && typeof document !== "undefined";
const toString = Object.prototype.toString;
const isObject$1 = (val) => toString.call(val) === "[object Object]";
const noop = () => {
};
const isIOS = /* @__PURE__ */ getIsIOS();
function getIsIOS() {
  var _a;
  return isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /* @__PURE__ */ /iP(ad|hone|od)/.test(window.navigator.userAgent);
}
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = isClient ? window : void 0;
function useEventListener(...args) {
  let target;
  let events;
  let listeners;
  let options;
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
    [events, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events))
    events = [events];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(
    () => [unrefElement(target), toValue(options)],
    ([el, options2]) => {
      cleanup();
      if (!el)
        return;
      const optionsClone = isObject$1(options2) ? { ...options2 } : options2;
      cleanups.push(
        ...events.flatMap((event) => {
          return listeners.map((listener) => register(el, event, listener, optionsClone));
        })
      );
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
let _iOSWorkaround = false;
function onClickOutside(target, handler, options = {}) {
  const { window: window2 = defaultWindow, ignore = [], capture = true, detectIframe = false } = options;
  if (!window2)
    return;
  if (isIOS && !_iOSWorkaround) {
    _iOSWorkaround = true;
    Array.from(window2.document.body.children).forEach((el) => el.addEventListener("click", noop));
    window2.document.documentElement.addEventListener("click", noop);
  }
  let shouldListen = true;
  const shouldIgnore = (event) => {
    return ignore.some((target2) => {
      if (typeof target2 === "string") {
        return Array.from(window2.document.querySelectorAll(target2)).some((el) => el === event.target || event.composedPath().includes(el));
      } else {
        const el = unrefElement(target2);
        return el && (event.target === el || event.composedPath().includes(el));
      }
    });
  };
  const listener = (event) => {
    const el = unrefElement(target);
    if (!el || el === event.target || event.composedPath().includes(el))
      return;
    if (event.detail === 0)
      shouldListen = !shouldIgnore(event);
    if (!shouldListen) {
      shouldListen = true;
      return;
    }
    handler(event);
  };
  const cleanup = [
    useEventListener(window2, "click", listener, { passive: true, capture }),
    useEventListener(window2, "pointerdown", (e) => {
      const el = unrefElement(target);
      if (el)
        shouldListen = !e.composedPath().includes(el) && !shouldIgnore(e);
    }, { passive: true }),
    detectIframe && useEventListener(window2, "blur", (event) => {
      setTimeout(() => {
        var _a;
        const el = unrefElement(target);
        if (((_a = window2.document.activeElement) == null ? void 0 : _a.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(window2.document.activeElement)))
          handler(event);
      }, 0);
    })
  ].filter(Boolean);
  const stop = () => cleanup.forEach((fn) => fn());
  return stop;
}
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
const freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
const root$1 = root;
var Symbol$1 = root$1.Symbol;
const Symbol$2 = Symbol$1;
var objectProto$1 = Object.prototype;
var hasOwnProperty = objectProto$1.hasOwnProperty;
var nativeObjectToString$1 = objectProto$1.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto = Object.prototype;
var nativeObjectToString = objectProto.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var symbolTag = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
}
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var now = function() {
  return root$1.Date.now();
};
const now$1 = now;
var FUNC_ERROR_TEXT = "Expected a function";
var nativeMax = Math.max, nativeMin = Math.min;
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now$1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now$1());
  }
  function debounced() {
    var time = now$1(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
const validHmRegExp = /([0-9]{1,2}:[0-9]{1,2})/;
const validHmsRegExp = /([0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2})/;
const validHmFormatRegExp = /([H|h]{1,2}:[m]{1,2})/;
const validHmsFormatRegExp = /([H|h]{1,2}:[m]{1,2}:[s]{1,2})/;
const validHmWithGroupRegExp = /([0-9]{1,2}):([0-9]{1,2})/;
const validHmsWithGroupRegExp = /([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})/;
const formatMappingRegExp = /[H|h|m|s|A|a]{1,2}/g;
const defaultText = {
  am: "AM",
  pm: "PM",
  hour: "Hour",
  min: "Min",
  sec: "Sec",
  apm: "AM/PM"
};
const validTokens = {
  hour: ["H", "HH", "hh", "h"],
  min: ["mm", "m"],
  sec: ["ss", "s"],
  amp: ["A", "a"]
};
const genFullRenderList = (min, max) => {
  const timeList = [];
  for (let i = min; i <= max; i++) {
    timeList.push(i);
  }
  return timeList;
};
const timeRange = {
  h: { min: 0, max: 23 },
  m: { min: 0, max: 59 },
  s: { min: 0, max: 59 }
};
const checkIsLegalTimeListArray = (arr) => {
  try {
    if (Array.isArray(arr)) {
      const [firstVal, secondVal] = arr;
      const isFirstVal = typeof firstVal === "number";
      const isSecondVal = typeof secondVal === "number";
      if (isFirstVal && isSecondVal) {
        if (secondVal > firstVal) {
          return true;
        }
      }
    }
    return false;
  } catch {
    return false;
  }
};
const genFullRange = (type, hMode, list) => {
  let limit = 0;
  if (type === "h") {
    if (hMode === "12h") {
      limit = 12;
    } else {
      limit = 24;
    }
  } else {
    limit = 60;
  }
  const fullRange = [];
  const pushToRange = (num) => {
    if (num >= 0 && num < limit) {
      fullRange.push(num);
    }
  };
  list.forEach((item) => {
    const isLegalArray = checkIsLegalTimeListArray(item);
    if (typeof item === "number") {
      pushToRange(item);
    } else if (isLegalArray) {
      for (let j = item[0]; j <= item[1]; j++) {
        pushToRange(j);
      }
    }
  });
  return fullRange;
};
const validIsAllNumber = (tempRange) => {
  const isValid = tempRange.every((item) => {
    if (Array.isArray(item)) {
      return validIsAllNumber(item);
    }
    return typeof item === "number";
  });
  return isValid;
};
const genBasicRange = (type, range) => {
  let embryoRange = [];
  let isValidRange = false;
  if (Array.isArray(range) && range.length > 0) {
    isValidRange = validIsAllNumber(range);
  }
  if (isValidRange) {
    embryoRange = range;
  } else {
    embryoRange = genFullRenderList(timeRange[type].min, timeRange[type].max);
  }
  return embryoRange;
};
const genTimeList = (type, range, hMode, showHeader, options) => {
  const basicRange = genBasicRange(type, range);
  let fullRange = genFullRange(type, hMode, basicRange);
  const interval = options == null ? void 0 : options.interval;
  if (interval) {
    fullRange = fullRange.filter((item) => item % interval === 0);
  }
  const timeList = [];
  const emptyItems = showHeader ? ["", "", ""] : ["", "", ""];
  timeList.push(...emptyItems);
  for (let i = 0; i < fullRange.length; i++) {
    let item = fullRange[i].toString();
    if (fullRange[i] < 10) {
      item = `0${item}`;
    }
    timeList.push(item);
  }
  timeList.push(...emptyItems);
  return timeList;
};
const defaultFormat = "HH:mm:ss A";
const apm = ["", "", "", "am", "pm", "", "", ""];
const _hoisted_1$3 = { class: "time-list" };
const _hoisted_2$1 = {
  key: 0,
  class: "time-range"
};
const _hoisted_3$1 = { class: "time-range__header" };
const _hoisted_4$1 = { class: "time-range" };
const _hoisted_5 = { class: "time-range__header" };
const _hoisted_6 = { class: "time-range" };
const _hoisted_7 = { class: "time-range__header" };
const _hoisted_8 = {
  key: 1,
  class: "time-range"
};
const _hoisted_9 = { class: "time-range__header" };
const _hoisted_10 = {
  key: 2,
  class: "time-range"
};
const _hoisted_11 = { class: "time-range__header" };
const SCROLL_OFFSET = 30;
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "TimeList",
  props: {
    timeData: {},
    timeString: {},
    show: { type: Boolean },
    isValidAType: { type: Boolean, default: false },
    formatType: { default: "HMS" },
    apmColumnPlacement: {},
    customText: {},
    isValidModelValue: { type: Boolean, default: false },
    showHeader: { type: Boolean, default: true },
    hourRange: { default: () => [] },
    minRange: { default: () => [] },
    secRange: { default: () => [] },
    hMode: {}
  },
  emits: ["updateTime"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const dividerLineConfig = computed(() => {
      if (props.isValidAType && props.formatType === "HMS") {
        return ["25", "50", "75"];
      }
      if (!props.isValidAType && props.formatType === "HM") {
        return ["50"];
      }
      return ["33.333333", "66.666667"];
    });
    const adjustOffset = computed(() => {
      return 3;
    });
    const tlh = ref();
    const tlm = ref();
    const tls = ref();
    const tlapm = ref();
    const timeList = computed(() => ({
      // h: genTimeList('h', { hourInterval: 5, hourRange: [0, 1, 2, 3, [4, 6], 10, 11, 12, 13, 14, 15, 16, 17, 18] }),
      h: genTimeList("h", props.hourRange, props.hMode, props.showHeader, { isValidAType: props.isValidAType }),
      m: genTimeList("m", props.minRange, props.hMode, props.showHeader, {}),
      s: genTimeList("s", props.secRange, props.hMode, props.showHeader, {}),
      apm
    }));
    const apmLabel = computed(() => ({
      // am: 'am',
      am: props.customText.am,
      pm: "pm"
    }));
    const updateTimeLabel = (calcType, targetPosition) => {
      const changeType = calcType.replace("tl", "");
      const scrollOffsetUnit = targetPosition / SCROLL_OFFSET;
      const newValue = timeList.value[changeType][scrollOffsetUnit + adjustOffset.value];
      const { h, m, s, apm: apm2 } = props.timeData;
      const tempTimeLabel = {
        h: changeType === "h" ? newValue : h,
        m: changeType === "m" ? newValue : m,
        s: changeType === "s" ? newValue : s,
        apm: changeType === "apm" ? apmLabel.value[newValue] : apm2
      };
      emit("updateTime", tempTimeLabel);
    };
    const getTlScrollTop = (tlType) => {
      if (tlType === "tlh") {
        return tlh.value.scrollTop;
      }
      if (tlType === "tlm") {
        return tlm.value.scrollTop;
      }
      if (tlType === "tls" && props.formatType === "HMS") {
        return tls.value.scrollTop;
      }
      if (tlType === "tlapm" && props.isValidAType) {
        return tlapm.value.scrollTop;
      }
    };
    const setTlScrollTop = (tlType, targetPosition) => {
      if (tlType === "tlh") {
        tlh.value.scrollTop = targetPosition;
      }
      if (tlType === "tlm") {
        tlm.value.scrollTop = targetPosition;
      }
      if (tlType === "tls" && props.formatType === "HMS") {
        tls.value.scrollTop = targetPosition;
      }
      if (tlType === "tlapm" && props.isValidAType) {
        tlapm.value.scrollTop = targetPosition;
      }
    };
    const calcScrollBarPosition = (tlType) => {
      const scrollBarPosition = getTlScrollTop(tlType);
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
      calcScrollBarPosition(tlType);
    }, 100);
    const setScrollBarPosition = async () => {
      if (!props.isValidModelValue) {
        return;
      }
      await nextTick();
      const hIdx = timeList.value.h.findIndex((item) => item === props.timeData.h) - adjustOffset.value;
      const mIdx = timeList.value.m.findIndex((item) => item === props.timeData.m) - adjustOffset.value;
      const sIdx = timeList.value.s.findIndex((item) => item === props.timeData.s) - adjustOffset.value;
      const apmIdx = timeList.value.apm.findIndex((item) => item === props.timeData.apm) - adjustOffset.value;
      setTlScrollTop("tlh", hIdx * SCROLL_OFFSET);
      setTlScrollTop("tlm", mIdx * SCROLL_OFFSET);
      setTlScrollTop("tls", sIdx * SCROLL_OFFSET);
      setTlScrollTop("tlapm", apmIdx * SCROLL_OFFSET);
    };
    watch(() => [props.show, props.isValidModelValue, props.timeString], (newVal) => {
      if (newVal[0] && newVal[1]) {
        setScrollBarPosition();
      }
    });
    setScrollBarPosition();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["re-time-list", {
          "re-time-list--show-header": _ctx.showHeader
        }])
      }, [
        createElementVNode("div", _hoisted_1$3, [
          _ctx.isValidAType && _ctx.apmColumnPlacement === "first" ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
            createElementVNode("span", _hoisted_3$1, toDisplayString(_ctx.customText.apm), 1),
            createElementVNode("div", {
              ref_key: "tlapm",
              ref: tlapm,
              class: "time-range__list",
              onScroll: _cache[0] || (_cache[0] = () => unref(setPositionDebounce)("tlapm"))
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(timeList).apm, (apmVal) => {
                return openBlock(), createElementBlock("span", {
                  key: apmVal,
                  class: "time-range__list__item"
                }, toDisplayString(apmVal === "" ? apmVal : _ctx.customText[apmVal]), 1);
              }), 128))
            ], 544)
          ])) : createCommentVNode("", true),
          createElementVNode("div", _hoisted_4$1, [
            createElementVNode("span", _hoisted_5, toDisplayString(_ctx.customText.hour), 1),
            createElementVNode("div", {
              ref_key: "tlh",
              ref: tlh,
              class: "time-range__list",
              onScroll: _cache[1] || (_cache[1] = () => unref(setPositionDebounce)("tlh"))
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(timeList).h, (hour, index) => {
                return openBlock(), createElementBlock("span", {
                  key: hour + index,
                  class: "time-range__list__item"
                }, toDisplayString(hour), 1);
              }), 128))
            ], 544)
          ]),
          createElementVNode("div", _hoisted_6, [
            createElementVNode("span", _hoisted_7, toDisplayString(_ctx.customText.min), 1),
            createElementVNode("div", {
              ref_key: "tlm",
              ref: tlm,
              class: "time-range__list",
              onScroll: _cache[2] || (_cache[2] = () => unref(setPositionDebounce)("tlm"))
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(timeList).m, (hour, index) => {
                return openBlock(), createElementBlock("span", {
                  key: hour + index,
                  class: "time-range__list__item"
                }, toDisplayString(hour), 1);
              }), 128))
            ], 544)
          ]),
          _ctx.formatType === "HMS" ? (openBlock(), createElementBlock("div", _hoisted_8, [
            createElementVNode("span", _hoisted_9, toDisplayString(_ctx.customText.sec), 1),
            createElementVNode("div", {
              ref_key: "tls",
              ref: tls,
              class: "time-range__list",
              onScroll: _cache[3] || (_cache[3] = () => unref(setPositionDebounce)("tls"))
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(timeList).s, (hour, index) => {
                return openBlock(), createElementBlock("span", {
                  key: hour + index,
                  class: "time-range__list__item"
                }, toDisplayString(hour), 1);
              }), 128))
            ], 544)
          ])) : createCommentVNode("", true),
          _ctx.isValidAType && _ctx.apmColumnPlacement === "last" ? (openBlock(), createElementBlock("div", _hoisted_10, [
            createElementVNode("span", _hoisted_11, toDisplayString(_ctx.customText.apm), 1),
            createElementVNode("div", {
              ref_key: "tlapm",
              ref: tlapm,
              class: "time-range__list",
              onScroll: _cache[4] || (_cache[4] = () => unref(setPositionDebounce)("tlapm"))
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(timeList).apm, (apmVal) => {
                return openBlock(), createElementBlock("span", {
                  key: apmVal,
                  class: "time-range__list__item"
                }, toDisplayString(apmVal ? _ctx.customText[apmVal] : apmVal), 1);
              }), 128))
            ], 544)
          ])) : createCommentVNode("", true)
        ]),
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(dividerLineConfig), (p) => {
          return openBlock(), createElementBlock("div", {
            key: p,
            class: "divider-line divider-line--25",
            style: normalizeStyle({ left: `${p}%` })
          }, null, 4);
        }), 128))
      ], 2);
    };
  }
});
const TimeList_vue_vue_type_style_index_0_scoped_e834948c_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const ReTimeList = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-e834948c"]]);
const _hoisted_1$2 = { class: "re-field-shell__content" };
const _hoisted_2 = {
  key: 0,
  class: "re-field-shell__content__prefix"
};
const _hoisted_3 = { class: "re-field-shell__content__default" };
const _hoisted_4 = {
  key: 1,
  class: "re-field-shell__content__suffix"
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "FieldShell",
  props: {
    disabled: { type: Boolean, default: false },
    placeholder: { default: "placeholder ..." }
  },
  setup(__props) {
    const slots = useSlots();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["re-field-shell", { "re-field-shell--disabled": _ctx.disabled }])
      }, [
        createElementVNode("div", _hoisted_1$2, [
          unref(slots).prefix ? (openBlock(), createElementBlock("div", _hoisted_2, [
            renderSlot(_ctx.$slots, "prefix")
          ])) : createCommentVNode("", true),
          createElementVNode("div", _hoisted_3, [
            renderSlot(_ctx.$slots, "default")
          ]),
          unref(slots).suffix ? (openBlock(), createElementBlock("div", _hoisted_4, [
            renderSlot(_ctx.$slots, "suffix")
          ])) : createCommentVNode("", true)
        ])
      ], 2);
    };
  }
});
const FieldShell_vue_vue_type_style_index_0_lang = "";
const useCalcElement = (getElement) => {
  const showPosition = ref("bottom");
  const calcShowPosition = () => {
    const targetEle = getElement();
    const bodyHeight = window.innerHeight;
    const offsetToElement = targetEle.getBoundingClientRect();
    if (bodyHeight - offsetToElement.bottom > 200) {
      showPosition.value = "bottom";
      return;
    }
    showPosition.value = "top";
  };
  return {
    calcShowPosition,
    showPosition
  };
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "WrapTransition",
  props: {
    show: { type: Boolean, default: false },
    border: { type: Boolean, default: true },
    whiteBg: { type: Boolean, default: true }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, { mode: "out-in" }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", {
            class: normalizeClass(["re-collapse-transition", {
              "re-collapse-transition--border": _ctx.border,
              "re-collapse-transition--white-bg": _ctx.whiteBg
            }])
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2), [
            [vShow, _ctx.show]
          ])
        ]),
        _: 3
      });
    };
  }
});
const WrapTransition_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$1 = {
  key: 0,
  class: "field-shell-expand-transition__uppper"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FieldShellExpandTransition",
  props: {
    show: { type: Boolean, default: false },
    getAnchorElement: {}
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const { showPosition, calcShowPosition } = useCalcElement(props.getAnchorElement);
    watch(() => props.show, () => {
      calcShowPosition();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["field-shell-expand-transition", [`field-shell-expand-transition--position--${unref(showPosition)}`]])
      }, [
        createVNode(_sfc_main$2, {
          show: _ctx.show,
          positon: unref(showPosition)
        }, {
          default: withCtx(() => [
            unref(slots).upper ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
              renderSlot(_ctx.$slots, "upper", {}, void 0, true)
            ])) : createCommentVNode("", true),
            unref(slots).default ? renderSlot(_ctx.$slots, "default", {
              key: 1,
              show: _ctx.show
            }, void 0, true) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["show", "positon"])
      ], 2);
    };
  }
});
const FieldShellExpandTransition_vue_vue_type_style_index_0_scoped_7f0f2668_lang = "";
const FieldShellExpandTransition = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-7f0f2668"]]);
const useExpandTransition = (options = {}) => {
  const isExpand = ref(false);
  const handleExpandStatus = (isToggle = true, status = false) => {
    if (options.getDisabled) {
      if (options.getDisabled()) {
        return;
      }
    }
    if (isToggle) {
      isExpand.value = !isExpand.value;
    } else {
      isExpand.value = status;
    }
    if (isExpand.value) {
      if (options.afterOpen) {
        options.afterOpen();
      }
    }
    if (!isExpand.value) {
      if (options.afterClose) {
        options.afterClose();
      }
    }
  };
  return {
    isExpand,
    handleExpandStatus
  };
};
const _hoisted_1 = ["value", "placeholder"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TimePicker",
  props: {
    modelValue: {
      type: String,
      default: "00:00:00"
    },
    format: {
      type: String,
      default: () => defaultFormat
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    apmColumnPlacement: {
      type: String,
      default: "last"
    },
    customText: {
      type: Object,
      default: () => ({})
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    hourRange: {
      type: Array,
      default: () => []
    },
    minRange: {
      type: Array,
      default: () => []
    },
    secRange: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update:modelValue", "open", "close", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const slots = useSlots();
    const usedformat = ref(props.format);
    const isValidModelValue = ref(false);
    const timeData = ref({
      h: "00",
      m: "00",
      s: "00",
      apm: "AM"
    });
    const timeListRef = ref();
    const reTimePickerRef = ref();
    const formatTokens = reactive({
      h: "HH",
      m: "mm",
      s: "ss",
      amp: "A"
    });
    const hMode = ref("24h");
    const isValidAType = computed(() => {
      const hasAmpToken = validTokens.amp.some((item) => usedformat.value.includes(item));
      if (hasAmpToken) {
        return true;
      }
      return false;
    });
    const formatType = computed(() => {
      let type = null;
      const hasHourToken = validTokens.hour.some((item) => usedformat.value.includes(item));
      const hasMinToken = validTokens.min.some((item) => usedformat.value.includes(item));
      const hasSecToken = validTokens.sec.some((item) => usedformat.value.includes(item));
      if (hasHourToken && hasMinToken) {
        type = "HM";
      }
      if (hasSecToken) {
        type = "HMS";
      }
      return type;
    });
    const formatDefaultCustomText = computed(() => {
      return {
        ...defaultText,
        ...props.customText
      };
    });
    const afterOpen = () => {
      emit("open");
    };
    const afterClose = () => {
      emit("close");
    };
    const { isExpand, handleExpandStatus } = useExpandTransition({ afterClose, afterOpen, getDisabled: () => props.disabled });
    const timeString = ref(props.modelValue);
    const genFormatHmsaMapping = (val) => {
      const { h, m, s } = val;
      const apm2 = val.apm;
      const mode24H = +h;
      const mode12H = +h > 12 ? +h - 12 : +h;
      return {
        HH: +mode24H < 10 ? `0${+mode24H}` : `${mode24H}`,
        H: `${+mode24H}`,
        hh: +mode12H < 10 ? `0${+mode12H}` : `${mode12H}`,
        h: `${+mode12H}`,
        mm: +m < 10 ? `0${+m}` : m,
        m,
        ss: +s < 10 ? `0${+s}` : s,
        s,
        A: /[a-zA-Z]/g.test(apm2) ? apm2.toUpperCase() : apm2,
        a: /[a-zA-Z]/g.test(apm2) ? apm2.toLowerCase() : apm2
      };
    };
    const setToDefaultFormatAndTime = () => {
      usedformat.value = defaultFormat;
      const defaultTimeData = {
        h: "00",
        m: "00",
        s: "00",
        apm: defaultText.am
      };
      return defaultTimeData;
    };
    const updateValueToMatchFormat = (type, apm2 = "") => {
      if (["a", "A"].includes(apm2)) {
        formatTokens.amp = apm2;
      }
      let timeVal = {
        h: "",
        m: "",
        s: "",
        apm: ""
      };
      if (type === "hms") {
        const matchResult = props.modelValue.match(validHmsWithGroupRegExp);
        timeVal = {
          h: (matchResult == null ? void 0 : matchResult[1]) || "",
          m: (matchResult == null ? void 0 : matchResult[2]) || "",
          s: (matchResult == null ? void 0 : matchResult[3]) || "",
          apm: apm2
        };
      }
      if (type === "hm") {
        const matchResult = props.modelValue.match(validHmWithGroupRegExp);
        timeVal = {
          h: (matchResult == null ? void 0 : matchResult[1]) || "",
          m: (matchResult == null ? void 0 : matchResult[2]) || "",
          s: "",
          apm: apm2
        };
      }
      return timeVal;
    };
    const checkModelValue = () => {
      const isHmsValid = validHmsRegExp.test(props.modelValue);
      if (isHmsValid) {
        let remainderApm = props.modelValue.replace(validHmsRegExp, "");
        remainderApm = remainderApm.replace(/\s/g, "");
        if (remainderApm === "") {
          return ["hms", ""];
        }
        const { am, pm } = formatDefaultCustomText.value;
        const isExist = [am, pm].includes(remainderApm);
        if (isExist) {
          return ["hms", remainderApm];
        }
      }
      const isHmValid = validHmRegExp.test(props.modelValue);
      if (isHmValid) {
        let remainderApm = props.modelValue.replace(validHmRegExp, "");
        remainderApm = remainderApm.replace(/\s/g, "");
        if (remainderApm === "") {
          return ["hm", ""];
        }
        const { am, pm } = formatDefaultCustomText.value;
        const isExist = [am, pm].includes(remainderApm);
        if (isExist) {
          return ["hm", remainderApm];
        }
      }
      return [null, ""];
    };
    const checkFormat = () => {
      const validApm = (apm2) => {
        const remainderApm = apm2.replace(/\s/g, "");
        const isExist = ["a", "A", ""].includes(remainderApm);
        if (isExist) {
          return true;
        }
        return false;
      };
      const isHmsValid = validHmsFormatRegExp.test(usedformat.value);
      if (isHmsValid) {
        const remainderApm = usedformat.value.replace(validHmsFormatRegExp, "");
        return validApm(remainderApm);
      }
      const isHmValid = validHmFormatRegExp.test(usedformat.value);
      if (isHmValid) {
        const remainderApm = usedformat.value.replace(validHmFormatRegExp, "");
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
        hMode.value = "12h";
      }
      if (is24h) {
        hMode.value = "24h";
      }
    };
    const genTimeDataAndString = (val) => {
      const formatHmsaMapping = genFormatHmsaMapping(val);
      const fullTimeFormat = usedformat.value.replace(formatMappingRegExp, (val2) => {
        return formatHmsaMapping[val2];
      });
      const { m, s } = formatHmsaMapping;
      timeData.value = {
        h: formatHmsaMapping[formatTokens.h],
        m,
        s,
        apm: formatHmsaMapping[formatTokens.amp]
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
      } else {
        const defaultTimeData = setToDefaultFormatAndTime();
        genTimeDataAndString(defaultTimeData);
      }
      setHMode();
      isValidModelValue.value = true;
    };
    const updateTime = async (val) => {
      genTimeDataAndString(val);
      emit("update:modelValue", timeString.value);
      emit("change", timeString.value);
      await nextTick();
    };
    validModelValueAndFormat();
    watch(() => props.modelValue, () => {
      validModelValueAndFormat();
    });
    onClickOutside(reTimePickerRef, () => handleExpandStatus(false));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "reTimePickerRef",
        ref: reTimePickerRef,
        class: "re-time-picker"
      }, [
        createVNode(_sfc_main$3, { disabled: __props.disabled }, createSlots({
          default: withCtx(() => [
            createElementVNode("div", {
              class: "time-picker",
              onClick: _cache[0] || (_cache[0] = () => unref(handleExpandStatus)(true))
            }, [
              createElementVNode("input", {
                value: unref(timeString),
                class: "time-picker__field",
                readonly: "",
                placeholder: __props.placeholder
              }, null, 8, _hoisted_1)
            ])
          ]),
          suffix: withCtx(() => [
            renderSlot(_ctx.$slots, "suffix", {}, () => [
              __props.showIcon ? (openBlock(), createElementBlock("img", {
                key: 0,
                class: normalizeClass(["drop-icon", {
                  "drop-icon--active": unref(isExpand)
                }]),
                src: _imports_0
              }, null, 2)) : createCommentVNode("", true)
            ], true)
          ]),
          _: 2
        }, [
          unref(slots).prefix ? {
            name: "prefix",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "prefix", {}, void 0, true)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["disabled"]),
        createVNode(FieldShellExpandTransition, {
          show: unref(isExpand),
          "get-anchor-element": () => unref(reTimePickerRef)
        }, {
          upper: withCtx(() => [
            renderSlot(_ctx.$slots, "upper", {}, void 0, true)
          ]),
          default: withCtx(({ show }) => [
            createVNode(ReTimeList, {
              ref_key: "timeListRef",
              ref: timeListRef,
              "time-data": unref(timeData),
              "time-string": unref(timeString),
              "is-valid-model-value": unref(isValidModelValue),
              show,
              "show-header": __props.showHeader,
              "is-valid-a-type": unref(isValidAType),
              "format-type": unref(formatType),
              "apm-column-placement": __props.apmColumnPlacement,
              "custom-text": unref(formatDefaultCustomText),
              "hour-range": __props.hourRange,
              "min-range": __props.minRange,
              "sec-range": __props.secRange,
              "h-mode": unref(hMode),
              onUpdateTime: updateTime
            }, null, 8, ["time-data", "time-string", "is-valid-model-value", "show", "show-header", "is-valid-a-type", "format-type", "apm-column-placement", "custom-text", "hour-range", "min-range", "sec-range", "h-mode"])
          ]),
          _: 3
        }, 8, ["show", "get-anchor-element"])
      ], 512);
    };
  }
});
const TimePicker_vue_vue_type_style_index_0_scoped_ccc04e02_lang = "";
const ReTimePicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ccc04e02"]]);
export {
  ReTimePicker as default
};
