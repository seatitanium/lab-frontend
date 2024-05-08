<template>
  <div class="card-content-container">
    <slot/>
  </div>
</template>

<style>
.card-content-container {
  line-height: 1.5;
  z-index: 15;
  position: relative;

  > p:last-child {
    margin-bottom: 0;
  }
}
</style>