<template>
  <div v-if="model" class="anywhere-popup-layer" @click="model = false">
    <div class="anywhere-popup" @click="handleClickPopup">
      <code v-if="code">{{ content }}</code>
      <p v-else>{{ content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const model = defineModel();
const props = defineProps({
  content: {
    type: String
  },
  code: {
    type: Boolean,
    default: true
  }
})

function keypressListener(e: KeyboardEvent) {
  if (e.key == "Escape") {
    model.value = false;
  }
}

function handleClickPopup() {
  if (props.content) navigator.clipboard.writeText(props.content);
}

onMounted(() => window.addEventListener('keydown', keypressListener));
onUnmounted(() => window.removeEventListener('keydown', keypressListener));
</script>

<style lang="less" scoped>

@keyframes Wiggle {
  0% {
    transform: rotate(0deg) translateX(2px) rotate(0deg);
  }

  100% {
    transform: rotate(360deg) translateX(2px) rotate(-360deg);
  }
}

@keyframes Appear {
  0% {
    transform: scale(1) translateX(2px);
  }

  50% {
    transform: scale(1.1) translateX(2px);
  }

  100% {
    transform: scale(1) translateX(2px);
  }
}

.anywhere-popup-layer {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .anywhere-popup {
    border: 5px solid black;
    background: white;
    box-shadow: 0 4px 5px rgba(0, 0, 0, .3);
    border-radius: 20px;
    padding: 20px;
    cursor: pointer;
    animation: Wiggle 2.2s linear .4s infinite, Appear .3s ease;
    transform: translateX(2px);
  }
}
</style>