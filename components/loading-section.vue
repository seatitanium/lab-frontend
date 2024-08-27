<template>
  <section class="loading-section" :style="{height}">
    <circle-spinner size="20px"/>
    <span><slot/></span>
  </section>
</template>
<script setup lang="ts">
const props = defineProps({
  height: {
    type: String,
    default: '55px'
  }
})
</script>

<style lang="less" scoped>
.loading-section {
  border: 1px dashed rgba(0, 0, 0, .2);
  border-radius: 20px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px 0;
  gap: 16px;
}
</style>