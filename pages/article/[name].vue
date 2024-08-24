<template>
  <article class="article container">
    <div class="function-bar">
      <span>功能 &raquo;</span>
      <div class="functions">
        <btn @click="isLayerIndicatorEnabled = !isLayerIndicatorEnabled" class="layer-indicator-toggle" :class="isLayerIndicatorEnabled ? 'with-bg--primaryDark' : 'with-bg--white with-border'" small>层级指示 <icon v-if="isLayerIndicatorEnabled" :path="mdiCheck"/><icon v-else :path="mdiClose"/></btn>
      </div>
    </div>
    <content-doc :path="articleRoute" class="article-content" :class="{layerIndicator: isLayerIndicatorEnabled}">
      <template #not-found>
        <p>The document content could not be found.</p>
        <p>Please contact the administrator at <a href="mailto:i@seati.cc">i@seati.cc</a>.</p>
      </template>
    </content-doc>
  </article>
</template>

<script lang="ts" setup>
import {useRoute} from "#app";
import {mdiCheck, mdiClose, mdiPlus, mdiWheelchairAccessibility} from "@mdi/js";

const articleName = computed(() => useRoute().params.name);
const articleRoute = computed(() => `/${articleName.value}`)

definePageMeta({
  title: '文章'
});

const isLayerIndicatorEnabled = useCookie('tisea-article-enable-layer-indicator', {
  default() {
      return false;
  },
});
</script>

<style lang="less" scoped>
@import "assets/var";

.article {
  padding: 20px 0;
}

.function-bar {
  position: absolute;
  right: 0;
  top: 36px;
  transform: translateY(50%);
  transform-origin: center;
  display: flex;
  align-items: center;
  gap: 16px;

  > span {
    display: flex;
    align-items: center;
    color: @primaryd;
    gap: 8px;
  }

  .functions {
    display: flex;
    align-items: center;
  }

}
</style>