# Getting Start

## Installation

### npm

```
npm install re-time-picker
```

### yarn

```
yarn add re-time-picker
```

### pnpm

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

const value = ref('10:10:10 AM');
</script>
```
