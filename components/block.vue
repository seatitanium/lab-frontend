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

  svg {
    min-width: 24px;
  }

  &.clickable {
    cursor: pointer;
  }

  &.narrow {
    padding: 8px 16px;
  }

  &.no-margin-bottom {
    margin-bottom: 0;
  }

  &.with-border {
    border: 1px solid rgba(0, 0, 0, .2);
    color: @primaryd;
  }

  &.with-bg--primary {
    background: @primaryl;
    color: @primaryd;
  }

  &.with-bg--indigo {
    background: @indigol;
    color: @indigo;

    a, strong {
      color: @indigod;
    }
  }

  &.with-bg--orange {
    background: @orangel;
    color: @orange;

    a, strong {
      color: @oranged;
    }
  }

  &.with-bg--red {
    background: #ffebee;
    color: #f44336;

    a, strong {
      color: #b71c1c;
    }
  }
}
</style>