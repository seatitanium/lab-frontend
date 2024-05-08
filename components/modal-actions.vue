<template>
  <div class="modal-actions">
    <slot/>
  </div>
</template>

<style lang="less">
.modal-actions {
  display: flex;
  align-items: center;
  gap: 15px;
  padding-top: 32px;

  &.right {
    justify-content: flex-end;
  }
}
</style>