<template>
  <div class="modal-content" :class="overflow ? 'overflow' : ''">
    <slot/>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  overflow: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="less">
.modal-content {
  line-height: 1.5;
  margin: 16px 0;
  max-height: 75vh;
  scrollbar-width: none;

  &.overflow {
    overflow-y: auto;
  }
}
</style>