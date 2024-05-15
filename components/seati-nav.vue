<template>
  <header>
    <nav class="navbar">
      <div class="container">
        <div class="logo--navbar">
          <logo-svg/>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import LogoSvg from '~/assets/icons/seati/seati.svg?component';
</script>

<style lang="less">
@import "@/assets/var";

.navbar {
  height: @navbar-height;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  z-index: 200;
}

.logo--navbar {
  svg {
    height: calc(.5 * @navbar-height);
  }
}

main {
  padding-top: @navbar-height;
}
</style>