<template>
  <h2 class="card-title">
    <slot/>
  </h2>
</template>

<style lang="less">
@import "@/assets/var";

h2.card-title {
  font-size: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 0;
  z-index: 15;
  position: relative;

  svg {
    width: 32px;
    height: 32px;
  }
}
</style>