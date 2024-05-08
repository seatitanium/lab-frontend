<template>
  <div class="modal-overlay">
    <div class="modal">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts" setup>
const model = defineModel();
</script>

<style lang="less">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  max-width: 100%; // prevent scroll width from causing x-overflow 24.5.8
  height: 100vh;
  overflow: hidden;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .2s ease;
  background: rgba(0, 0, 0, 0);

  &.transparent {
    pointer-events: none;

    .modal {
      pointer-events: auto;
    }
  }

  &.blurred {
    backdrop-filter: blur(10px);
  }

  &.darken {
    background: rgba(0, 0, 0, .4);
  }
}

.modal-overlay.w400 .modal {
  max-width: 400px;
}

.modal-overlay.w300 .modal {
  max-width: 300px;
}

.modal-overlay.w200 .modal {
  max-width: 200px;
}

.modal-overlay[class*="w"] .modal {
  min-width: unset;
}

.modal {
  background: white;
  border-radius: 20px;
  min-width: 400px;
  max-width: 700px;
  padding: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
}
</style>