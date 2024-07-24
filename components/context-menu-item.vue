<template>
  <div class="context-menu-item">
    <slot/>
  </div>
</template>

<style lang="less">
@import "assets/var";

.context-menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all .2s ease;
  padding: 12px 16px;

  &:first-child {
    border-top-left-radius: @context-menu-border-radius;
    border-top-right-radius: @context-menu-border-radius;
  }

  &:last-child {
    border-bottom-left-radius: @context-menu-border-radius;
    border-bottom-right-radius: @context-menu-border-radius;
  }

  svg {
    color: @primaryd;
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: @primaryl;
  }
}
</style>