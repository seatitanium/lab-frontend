<template>
  <div class="card-bg-text">
    <slot/>
  </div>
</template>

<style lang="less">
.card-bg-text {
  font-size: 120px;
  position: absolute;
  opacity: .15;
  right: 32px;
  bottom: 32px;

  &.--extraEnlarged {
    font-size: 290px;
    left: -80px;
    bottom: -50px;
  }

  &.--classicFont {
    font-family: 'Times New Roman', serif;
    font-style: italic
  }
}
</style>