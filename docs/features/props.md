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


## disabled
- type: `boolean`
- default: false

Not allow to use.

## apmColumnPlacement
- type: `'first' | 'last'`
- default: `'last'`

controll the column order in the dropdown.

## customText
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

## showIcon
- type: `boolean`
- default: false

Whether to show the clock icon at left

If you'd like to put custom icon, use the slot suffix

## showHeader
- type: `boolean`
- default: false

Whether to show the header in the dropdown

## hourRange
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

## minRange
- type: `Array<[number, number] | number>`
- default: `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]`

Same as hourRange, the only different is maxmium number is 59.

## secRange
- type: `Array<[number, number] | number>`
- default: `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]`

Same as hourRange, the only different is maxmium number is 59.


## hourInterval
- type: `number`
- default: 1

The given number allows you to give hourRange in certain interval. It will execute after the hourRange, which mins you can give an hourRange like `[1, 2, 3, 4, [6, 10], [11, 20]]` and interval as `2`, the final hourRange will be [10, 11, 20].

## minInterval
- type: `number`
- default: 1

Same as hourInterval.

## secInterval
- type: `number`
- default: 1

Same as hourInterval.
