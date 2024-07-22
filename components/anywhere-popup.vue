<template>
  <div v-if="model" class="anywhere-popup-layer" @click="delayClose">
    <div class="anywhere-popup" :class="{closing}" @click="handleClickPopup">
      <code v-if="code">{{ content }}</code>
      <div v-else>
        <slot/>
      </div>
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

const closing = ref(false);

function delayClose() {
  closing.value = true;
  setTimeout(() => {
    model.value = false;
    closing.value = false;
  }, 300);
}

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

@keyframes RotateInPlace {
  0% {
    transform: rotate(0deg) translateX(2px) rotate(0deg);
  }

  100% {
    transform: rotate(360deg) translateX(2px) rotate(-360deg);
  }
}

@keyframes PopAppear {
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

@keyframes FadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
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
  z-index: 5000;

  .anywhere-popup {
    border: 5px solid black;
    background: white;
    box-shadow: 0 4px 5px rgba(0, 0, 0, .3);
    border-radius: 20px;
    padding: 20px;
    cursor: pointer;
    animation: RotateInPlace 2.2s linear .4s infinite, PopAppear .3s ease;
    transform: translateX(2px);

    &.closing {
      animation: RotateInPlace 2.2s linear .4s infinite, FadeOut .3s ease;
    }
  }
}
</style>