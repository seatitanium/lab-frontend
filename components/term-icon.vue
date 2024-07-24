<template>
  <div class="term-icon" :class="`st${num}`" :style="{background: TermBGColors[num], color: TermFGWhite.includes(num) ? 'white' : 'black'}">
    {{ num }}
  </div>
</template>

<script lang="ts" setup>
import {TermBGColors, TermFGWhite} from "~/consts";

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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 85%;
  font-weight: normal;

  &.text {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    border-radius: 5px;
  }
}
</style>