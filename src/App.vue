<script setup lang="ts">
import { Input } from 'postcss';
import { ref, reactive } from 'vue';
import usePicker from '../dist/usePicker.js';

const value1 = ref({
  a: 1,
  b: []
});
const value2 = reactive({
  a: 1,
  b: []
});

const { getter, setter } = usePicker(value1);
setTimeout(() => {
  setter({
    path: 'c',
    value: 2,
  });
  setter({
    path: 'b.1',
    value: 1,
  });
}, 1000);

const { getter : getter2, setter: setter2 } = usePicker(value2);
setTimeout(() => {
  setter2({
    path: 'c',
    value: 2,
  });
  setter2({
    path: 'b.1',
    value: 1,
  });
}, 1000);

</script>

<template>
    <div>value1: {{ value1 }}</div>
    <div>value2: {{ value2 }}</div>

    <input :value="getter('text', 'value1')" @input="(e) => {
      setter({
        path: 'text',
        value: (e.target as HTMLInputElement).value,
      });
    }"/>

    <input :value="getter2('text', 'value2')" @input="(e) => {
      setter2({
        path: 'text',
        value: (e.target as HTMLInputElement).value,
      });
    }"/>
</template>

<style scoped>
</style>
