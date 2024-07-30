<template>
  <div class="term-icon" @click="() => {
    if (!noClick) {
      termModalNum = num; model = true
    }
  }" :class="[`st${num}`, noClick ? 'noclick' : '', text ? 'text' : '', display ? 'display' : ''].join(' ')" :style="{background: TermBGColors[num], color: TermFGWhite.includes(num) ? 'white' : 'black'}">
    {{ num }}
  </div>

</template>

<script lang="ts" setup>
import {BackendCodes, TermBGColors, TermFGWhite} from "~/consts";
import {useState} from "#app";
import {mdiLaunch} from "@mdi/js";

const props = defineProps({
  num: {
    type: String,
    required: true
  },
  noClick: {
    type: Boolean,
    default: false
  },
  text: {
    type: Boolean,
    default: false,
  },
  display: {
    type: Boolean,
    default: false
  }
})

const termModalNum = useState('term-modal-num', () => '7');
const model = useState('term-modal');

</script>

<style lang="less" scoped>
@import "assets/var";

.term-icon {
  cursor: pointer;
  font-family: 'Highway Gothic', sans-serif;
  width: 50px;
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 85%;
  font-weight: normal;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    width: 45px;
    height: 45px;
    font-size: 80%;
  }

  &.display {
    width: 100px;
    height: 100px;
    font-size: 56px;
    border-radius: 25px;
  }

  &.noclick {
    pointer-events: none;
  }

  &.text {
    width: 25px;
    height: 25px;
    font-size: 100%;
    vertical-align: middle;
    border-radius: 5px;
  }
}
</style>