<template>
  <form>
    <slot/>
  </form>
</template>

<script setup lang="ts">
const slots = useSlots() as any;
const fields = slots.default();

function getValidity() {
  return true;
}

defineExpose({
  getValidity
})
</script>

<style scoped lang="less">

</style>