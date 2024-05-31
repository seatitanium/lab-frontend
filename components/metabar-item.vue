<template>
  <div class="metabar-item">
    <slot/>
  </div>
</template>

<style lang="less">
@import "@/assets/var.less";

.metabar-item {

  &, .left, .right, .center {
    display: flex;
    align-items: center;
  }

  .left {
    gap: 8px;
    font-weight: 500;
    color: @primaryd;
    &::after {
      content: '·';
    }
  }

  .center {
    justify-content: center;
    gap: 8px;
  }

  gap: 8px;
  line-height: 1.2;
}
</style>