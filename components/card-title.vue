<template>
  <h1 class="card-title">
    <slot/>
  </h1>
</template>

<style lang="less">
@import "@/assets/var";

h1.card-title {
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

  &.display {
    font-size: 18px;
    font-weight: 500;
    color: @primaryd;

    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>