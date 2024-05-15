<template>
  <Transition name="screen-trans">
    <div v-if="model" class="screen-overlay">
      <slot/>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const model = defineModel();
</script>

<style lang="less" scoped>
@keyframes ScreenIn {
  0% {
    transform: scale(1.2);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.screen-trans-enter-active {
  animation: ScreenIn .2s ease;
}

.screen-trans-leave-active {
  animation: ScreenIn .2s ease reverse;
}

.screen-overlay {
  &.with-bg--darken {
    background: rgba(0, 0, 0, .7);
    color: white;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 300;
  pointer-events: none;
}
</style>