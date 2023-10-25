# Slots

## prefix
The space at the left of the field

```vue
<ReTimePicker v-model="value">
  <template #prefix>
    upper
  </template>
</ReTimePicker>

<script setup lang="ts">
// import ...
const value = ref('10:10:10 AM');
</script>
```

## suffix
The space at the right of the field

```vue
<ReTimePicker v-model="value">
  <template #suffix>
    upper
  </template>
</ReTimePicker>

<script setup lang="ts">
// import ...
const value = ref('10:10:10 AM');
</script>
```

## upper
The space at the top in the dropdown

```vue
<ReTimePicker v-model="value">
  <template #upper>
    upper
  </template>
</ReTimePicker>

<script setup lang="ts">
// import ...
const value = ref('10:10:10 AM');
</script>
```


