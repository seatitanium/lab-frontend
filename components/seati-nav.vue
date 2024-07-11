<template>
  <header>
    <nav class="navbar">
      <div class="container">
        <div @click="setLocation('/')" class="logo--navbar">
          TiLab
        </div>
        <div class="navigation">
          <div class="navigation-item" v-for="x in navigation">
            <btn class="nav-btn hover--dim" :class="useRoute().fullPath === x.route ? 'with-bg--primary' : 'with-bg--white'" @click="navigateTo(x.route)">
              <icon :path="x.icon"/>
              {{ x.name }}
            </btn>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import LogoSvg from '~/assets/icons/seati/seati.svg?component';
import setLocation from "~/utils/setLocation";
import {mdiCompare, mdiHome, mdiMinecraft} from "@mdi/js";

const navigation = [
  {
    name: "主页",
    route: "/",
    icon: mdiHome
  },
  {
    name: "服务器",
    route: "/instance",
    icon: mdiMinecraft
  },
  {
    name: "排行榜",
    route: "/board",
    icon: mdiCompare
  }
]
</script>

<style lang="less" scoped>
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
  cursor: pointer;
  font-variation-settings: 'CASL' 1, 'slnt' -10, 'wght' 800;
  font-size: 40px;
}

.container {
  display: flex;
  align-items: center;
  gap: 32px;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-btn {
  padding: 6px 15px;

  svg {
    width: 20px;
  }
}
</style>

<style lang="less">
@import "@/assets/var.less";

main {
  padding-top: @navbar-height;
}
</style>