<template>
  <div class="modal-content">
    <slot/>
  </div>
</template>

<style lang="less">
.modal-content {
  line-height: 1.5;
  margin: 16px 0;
  max-height: 75vh;
  scrollbar-width: none;
  overflow-y: auto;
}
</style>