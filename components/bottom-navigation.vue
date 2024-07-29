<template>
  <div class="bottom-navigation-container">
    <card class="narrow without-border">
      <card-content class="actions">
        <slot/>
      </card-content>
    </card>
  </div>
</template>

<style lang="less" scoped>
.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

@keyframes FlowUp {
  0% {
    transform: translate(-50%, 100%);
  }

  100% {
    transform: translateY(-50%, 0);
  }
}

.bottom-navigation-container {
  position: fixed;
  bottom: 5px;
  width: 50vw;
  left: 50%;
  transform: translateX(-50%);
  padding: 0;
  z-index: 300;
  background: rgba(255, 255, 255, .6);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
  animation: FlowUp .4s ease;
}
</style>