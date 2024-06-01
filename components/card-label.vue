<template>
  <div class="card-label">
    <slot/>
  </div>
</template>

<style lang="less" scoped>
@import "@/assets/var.less";

.card-label {
  font-weight: 500;
  color: @primaryd;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 16px;

  svg {
    width: 20px;
    height: 20px;
  }
}
</style>