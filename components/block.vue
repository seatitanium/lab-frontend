<template>
  <div class="block">
    <slot/>
  </div>
</template>

<style lang="less">
@import "@/assets/var.less";
.block {
  border-radius: 10px;
  padding: 16px;
  margin: 16px 0;
  display: flex;
  align-items: center;
  gap: 16px;

  &.narrow {
    padding: 8px 16px;
  }

  &.with-bg--primary {
    background: @primaryl;
    color: @primaryd;
  }

  &.with-bg--orange {
    background: #fff3e0;
    color: #ff9800;
  }
}
</style>