# vue-hooks-picker

## Introduction

## Install

```bash
```
#### Parameters
*   `path` **设置键值的链路** 
```javascript
const obj = {
  a: {
    b: {
    }
    c: []
   }
}

设置b属性的path为 'a.b' => obj.a.b

设置c数组第2个位置的path为 'a.c.1' =>  obj.a.c[1]

```
*   `value` **设置的值** 
## Usage

```javascript
<script setup lang="ts">
import { ref } from 'vue';
import usePicker from 'vue-hooks-picker';
const value = ref({
  a: 1,
  b: []
});
const { getter, setter } = usePicker(value);
</script>

<template>
    <input :value="getter('text', 'value')" @input="(e) => {
      setter({
        path: 'text',
        value: (e.target as HTMLInputElement).value,
      });
    }"/>
</template>
```
