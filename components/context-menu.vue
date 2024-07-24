<template>
  <div class="context-menu" :class="{active: model}" :style="{top: y + 'px', left: x + 'px'}">
    <slot/>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  targetMark: {
    type: String
  }
})

const model = defineModel();

onMounted(() => {
  document.body.addEventListener('click', e => {
    model.value = false;
  })
})
</script>

<style lang="less" scoped>
@import "assets/var";

.context-menu {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  position: fixed;
  z-index: 200;
  opacity: 0;
  pointer-events: none;
  transition: transform .2s ease, opacity .2s ease;
  transform: translateY(-5px);
  border-radius: @context-menu-border-radius;

  &.active {
    opacity: 1;
    pointer-events: all;
    transform: translate(0);
  }
}
</style>