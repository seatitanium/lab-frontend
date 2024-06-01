<template>
  <div class="card-right-top">
    <slot/>
  </div>
</template>

<style lang="less">
.card-right-top {
  position: absolute;
  top: 30px;
  right: 20px;
  z-index: 100;
}

.equalp {
  .card-right-top {
    top: 32px;
    right: 32px;
  }
}

.narrow {
  .card-right-top {
    top: 16px;
    right: 16px;
  }
}
</style>