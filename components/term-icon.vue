<template>
  <div class="term-icon" :class="`st${num}`" :style="{background: TermColors[num]}">
    {{ num }}
  </div>
</template>

<script lang="ts" setup>
import {TermColors} from "~/consts";

const props = defineProps({
  num: {
    type: String,
    required: true
  }
})

</script>

<style lang="less" scoped>
@import "assets/var";

.term-icon {
  font-family: 'Highway Gothic', sans-serif;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 85%;
  font-weight: normal;
}
</style>