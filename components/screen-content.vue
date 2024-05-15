<template>
<div class="screen-content">
  <slot/>
</div>
</template>
<script setup lang="ts">

</script>
<style scoped lang="less">
.screen-content {
  z-index: 400;
  max-width: 50%;
  &[flex], &[flex-horizontal] {
    display: flex;

    &[flex-center] {
      justify-content: center;
    }
  }

  &[flex-vertical] {
    display: flex;
    flex-direction: column;

    &[flex-center] {
      align-items: center;
    }
  }
}
</style>