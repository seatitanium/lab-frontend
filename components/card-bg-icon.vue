<template>
  <div class="card-bg-icon">
    <slot/>
  </div>
</template>

<style lang="less">
.card-bg-icon {
  position: absolute;
  opacity: .15;

  right: 32px;
  bottom: 22px;

  svg {
    height: 120px;
    width: 120px;
    z-index: 12;
  }

  &.--centralSkewed {
    right: 50%;
    bottom: 50%;
    transform: translateX(50%) translateY(50%) skew(-10deg) scale(2);
  }

  &.--enlarged {
    svg {
      height: 300px;
      width: 300px;
    }
    bottom: -10px;
  }
}
</style>