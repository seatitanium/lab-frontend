<template>
  <div>
    <NuxtLayout>
      <div class="error-layout">
        <icon color="#f44336" :path="mdiStickerAlertOutline"/>
        <h2>{{ error.statusCode }}</h2>
        <p>{{ error.statusMessage }}</p>
        <btn class="with-bg--primary hover--dim" @click="useRouter().go(-1)">&laquo; 后退</btn>
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import type { NuxtError } from "#app";
import {mdiAlertOutline, mdiArrowLeft, mdiStickerAlertOutline} from "@mdi/js";
const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<style lang="css" scoped>
.error-layout  {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 720px;

  > svg {
    width: 100px;
    height: 100px;
    margin-bottom: 32px;
  }

  h2 {
    font-size: 52px;
    margin: 0;
  }

  p {
    margin: 24px 0;
    font-size: 20px;
  }
}
</style>