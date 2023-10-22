# Events

## open

Trigger when dropdown open

```vue
<template>
  <ReTimePicker v-model="value" @open="open" />
</template>

<script setup lang="ts">
// import ...

const value = ref('10:10:10 上午');
const open = () => {
  console.log('open');
};
</script>
```


## close

Trigger when dropdown close

```vue
<template>
  <ReTimePicker v-model="value" @close="close" />
</template>

<script setup lang="ts">
// import ...

const value = ref('10:10:10 上午');
const close = () => {
  console.log('close');
};
</script>
```

## change

Trigger when value changed

```vue
<template>
  <ReTimePicker v-model="value" @change="change" />
</template>

<script setup lang="ts">
// import ...

const value = ref('10:10:10 上午');
const change = (val) => {
  console.log('change', val);
};
</script>
```