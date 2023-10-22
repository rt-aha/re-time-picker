# Getting Start

## Installation

### NPM

```
npm install re-time-picker
```

### YARN

```
yarn add re-time-picker
```

### PNPM

```
pnpm install re-time-picker
```


## Using

### Global

In the main file

```js
import { createApp } from 'vue';
import ReTimePicker from 're-time-picker';
import App from './App.vue';
import 're-time-picker/dist/style.css';

const app = createApp(App);
app.component('ReTimePicker', ReTimePicker);
app.mount('#app');
```

### Local

In the SFC(`.vue`)

```vue
<template>
  <ReTimePicker v-model="value" />
</template>

<script setup lang="ts">
import ReTimePicker from 're-time-picker';
import 're-time-picker/dist/style.css';

const value = ref('10:10:10 上午');
</script>
```
