<template>
  <div class="modal-group">
    <Transition name="modal-trans">
      <div v-if="model" class="modal">
        <btn @click="model = false" icon v-if="withCloseBtn" class="hover--dim with-bg--white close-btn">
          <icon :path="mdiClose"/>
        </btn>
        <slot/>
      </div>
    </Transition>
    <Transition name="overlay-trans">
      <div v-if="model" class="modal-overlay" @click="model = !allowEsc">
        <slot name="overlay"/>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import {mdiClose} from "@mdi/js";

const model = defineModel();
const props = defineProps({
  allowEsc: {
    type: Boolean,
    default: true
  },
  withCloseBtn: {
    type: Boolean,
    default: false
  }
})

function keypressListener(e: KeyboardEvent) {
  if (e.key == "Escape" && props.allowEsc) {
    model.value = false;
  }
}

onMounted(() => window.addEventListener('keydown', keypressListener));
onUnmounted(() => window.removeEventListener('keydown', keypressListener));
</script>

<style lang="less">
@import "@/assets/var.less";

.overlay-trans-enter-active {
  animation: ModalInOverlay .3s ease;
}

.overlay-trans-leave-active {
  animation: ModalInOverlay .2s ease reverse;
  animation-delay: .25s;
}

.modal-trans-enter-active {
  animation: ModalIn--default .25s ease;
}

.animation--Up .modal-trans-enter-active {
  animation: ModalIn--up .25s ease;
}

.animation--Down .modal-trans-enter-active {
  animation: ModalIn--down .25s ease;
}

.modal-trans-leave-active {
  animation: ModalIn--default .25s ease reverse;
}

.animation--Up .modal-trans-leave-active {
  animation: ModalIn--up .25s ease reverse;
}

.animation--Down .modal-trans-leave-active {
  animation: ModalIn--down .25s ease reverse;
}


@keyframes ModalInOverlay {
  0% {
    background-color: rgba(0, 0, 0, 0);
    backdrop-filter: blur(0);
  }
}

.describe .modal {

  max-width: 450px;

  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;

    > svg, img {
      height: 150px;
      width: auto;
      margin: 16px 0;
      max-width: 70%;
    }

    > h2 {
      font-size: 28px;
      text-align: center;
    }

    > p {
      text-align: center;
      margin: 8px 0;
    }
  }

  .modal-actions {
    justify-content: center;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  max-width: 100%; // prevent scrollbar width from causing x-overflow 24.5.8
  height: 100vh;
  overflow: hidden;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .2s ease;
  background: rgba(0, 0, 0, 0);
}

.without-bg .modal-overlay {
  pointer-events: none;
}

.with-bg--blurred .modal-overlay {
  backdrop-filter: blur(8px);
}

.with-bg--darken .modal-overlay {
  background: rgba(0, 0, 0, .7);
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
  max-width: 800px;
  padding: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: 0 0;
  z-index: 1500;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
}
</style>