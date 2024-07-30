<template>
  <div class="metabar-item">
    <slot/>
  </div>
</template>

<style lang="less">
@import "@/assets/var.less";

.metabar-item {
  font-size: 14px;

  svg {
    height: 16px;
    width: 16px;
  }

  &, .left, .right, .center {
    display: flex;
    align-items: center;
  }

  .left {
    gap: 4px;
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

  gap: 4px;
  line-height: 1.2;
}
</style>