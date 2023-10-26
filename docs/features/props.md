---
outline: deep
---

# Props

## format
- type: `string`
- default: `HH:mm:ss A`

Get the formatted time according to the string of tokens passed in, inspired by [dayjs](https://day.js.org/docs/en/parse/string-format).

| Token | Example| Description|
| - | - | - |
|H  |0-23 |Hours|
|HH |00-23|Hours, 2-digits|
|h  |1-12 |Hours, 12-hour clock|
|hh |01-12|Hours, 12-hour clock, 2-digits|
|m	|0-59 |	Minutes|
|mm	|00-59|	Minutes, 2-digits|
|s	|0-59	|Seconds|
|ss	|00-59|Seconds, 2-digits| 
|A	|AM PM|	Post or ante meridiem, upper-case|
|a	|am pm|	Post or ante meridiem, lower-case|

The prop `format` and `v-model` should be order in **hour:minute(:second)** format, the `A/a` token can be place at the front or the end. e.g. `HH:mm:ss A`, `a HH:mm`

If prop `format` or `v-model` are invalid, it will fallback to default format as `HH:mm:ss A`


```vue
<template>
  <div class="v-time-picker">
    <ReTimePicker
      v-model="val1"
      format="HH:mm A"
    />

    <ReTimePicker
      v-model="val2"
      format="A hh:mm:ss"
    />
  </div>
</template>

<script setup lang="ts">
const val1 = ref('18:10:12 AM'); // 18:10 am
const val2 = ref('18:10:12 AM'); // AM 06:10:12
</script>
```

## disabled
- type: `boolean`
- default: false

Not allow to use.

```vue
<template>
  <div class="v-time-picker">
    <ReTimePicker
      v-model="val"
      disabled
    />
  </div>
</template>

<script setup lang="ts">
const val = ref('18:10:12 AM');
</script>
```

## apm-column-placement
- type: `'first' | 'last'`
- default: `'last'`

controll the column order in the dropdown.

```vue
<template>
  <div class="v-time-picker">
    <ReTimePicker
      v-model="val"
      apm-column-placement="first"
    />
  </div>
</template>

<script setup lang="ts">
const val = ref('18:10:12 AM');
</script>
```

## custom-text
- type: 
```ts
interface CustomText {
  apm: string
  am: string
  pm: string
  hour: string
  min: string
  sec: string
}
```
- default: 
```ts
{
  am: 'AM',
  pm: 'PM',
  hour: 'Hour',
  min: 'Min',
  sec: 'Sec',
  apm: 'AM/PM',
}
```

**am**, **pm** are for the apm column text

**hour**, **min**, **sec**, **apm** are for the header text 

```vue
<template>
  <div class="v-time-picker">
    <ReTimePicker
      v-model="val"
      :custom-text="customText"
    />
  </div>
</template>

<script setup lang="ts">
const val = ref('18:10:12 AM');
const customText = {
  am: '上午',
  pm: '下午',
  hour: '時',
  min: '分',
  sec: '秒',
  apm: '上午/下午',
};
</script>
```

## show-icon
- type: `boolean`
- default: true

Whether to show the clock icon at left

If you'd like to put custom icon, use the slot suffix

```vue
<template>
  <div class="v-time-picker">
    <ReTimePicker
      v-model="val"
      show-icon
    />
  </div>
</template>
```

## show-header
- type: `boolean`
- default: true

Whether to show the header in the dropdown

```vue
<template>
  <div class="v-time-picker">
    <ReTimePicker
      v-model="val"
      show-header
    />
  </div>
</template>
```

## hour-range
- type: `Array<[number, number] | number>`
- default: `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]`

The given type as `[number, number]` element present as the range.
e.g. `[0, [1, 3], [6, 8], 9]` will generate a range list to `[0, 1, 2, 3, 6, 7, 8]`.

The number in the array which over 23 will be eliminated.
If the format's hour token give `h` or `hh`, the number over 11 will be eliminated.

The array will be remove the duplicated number and sort in numerical.
e.g. the given range as  `[0, 1, 3, 1, 1, 2, [6, 10], 10, 2, 11, 12]` with `h` format, the final range will be `[0, 1, 2, 3, 6, 7, 8, 9, 10, 11]`

::: warning
If the element type is not number will be ignored.

Additionally, it will check the type [number, number], if first number is larger than second number, this [number, number] element will be ignored as well.
:::

```vue
<template>
  <div class="v-time-picker">
    <ReTimePicker
      v-model="val1"
      :hour-range="hourRange1"
    />

    <ReTimePicker
      v-model="val2"
      format="hh:mm:ss A"
      :hour-range="hourRange2"
    />
  </div>
</template>

<script setup lang="ts">
const val1 = ref('18:10:12 AM');
const val2 = ref('18:10:12 AM');
const hourRange1 = [[0, 24]];
const hourRange2 = [[0, 24]];
</script>
```

## min-range
- type: `Array<[number, number] | number>`
- default: `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]`

Same as hourRange, the only different is maxmium number is 59.

```vue
<template>
  <div class="v-time-picker">
    <ReTimePicker
      v-model="val1"
      :min-range="minRange1"
    />

    <ReTimePicker
      v-model="val2"
      :min-range="minRange2"
    />
  </div>
</template>

<script setup lang="ts">
const val1 = ref('18:10:12 AM');
const val2 = ref('18:10:12 AM');
const minRange1 = [[0, 9], [50, 59]];
const minRange2 = [62, 31, 21, 0, [1, 50], 51];
</script>
```

## sec-range
- type: `Array<[number, number] | number>`
- default: `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]`

Same as hourRange, the only different is maxmium number is 59.

```vue
<template>
  <div class="v-time-picker">
    <ReTimePicker
      v-model="val1"
      :sec-range="secRange1"
    />

    <ReTimePicker
      v-model="val2"
      :sec-range="secRange2"
    />
  </div>
</template>

<script setup lang="ts">
const val1 = ref('18:10:12 AM');
const val2 = ref('18:10:12 AM');
const secRange1 = [[0, 9], [50, 59]];
const secRange2 = [62, 31, 21, 0, [1, 50], 51];
</script>
```

## hour-interval
- type: `number`
- default: 1

The given number allows you to give hourRange in certain interval. It will execute after the hourRange, which mins you can give an hourRange like `[1, 2, 3, 4, [6, 10], [11, 20]]` and interval as `2`, the final hourRange will be [10, 11, 20].

```vue
<template>
  <div class="v-time-picker">
    <ReTimePicker
      v-model="val1"
      :hour-interval="15"
    />

    <ReTimePicker
      v-model="val2"
      :hour-range="hourRange"
      :hour-interval="10"
    />
  </div>
</template>

<script setup lang="ts">
const val1 = ref('18:10:12 AM');
const val2 = ref('18:10:12 AM');
const hourRange = [10, 31, 20, 0, [1, 50], 51];
</script>
```

## min-interval
- type: `number`
- default: 1

Same as hourInterval.

```vue
<template>
  <div class="v-time-picker">
    <ReTimePicker
      v-model="val1"
      :min-interval="5"
    />

    <ReTimePicker
      v-model="val2"
      :min-range="minRange"
      :min-interval="15"
    />
  </div>
</template>

<script setup lang="ts">
const val1 = ref('18:10:12 AM');
const val2 = ref('18:10:12 AM');
const minRange = [10, 30, 20, 0, [1, 50], 51];
</script>
```

## sec-interval
- type: `number`
- default: 1

Same as hourInterval.


```vue
<template>
  <div class="v-time-picker">
    <ReTimePicker
      v-model="val1"
      :sec-interval="5"
    />

    <ReTimePicker
      v-model="val2"
      :sec-range="secRange"
      :sec-interval="15"
    />
  </div>
</template>

<script setup lang="ts">
const val1 = ref('18:10:12 AM');
const val2 = ref('18:10:12 AM');
const secRange = [10, 30, 20, 0, [1, 50], 51];
</script>
```
