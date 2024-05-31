<template>
  <div class="metabar">
    <slot/>
  </div>
</template>

<style lang="less">
.metabar {
  display: flex;
  flex-direction: row;
  gap: 16px;
}
</style>