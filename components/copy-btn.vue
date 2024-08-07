<template>
  <btn v-if="hiddenIfEmpty ? !!value : true" @click="copy" class="copy-btn with-bg--white with-border">
    <icon :path="copyIcon"/>
    {{ copyText }}
  </btn>
</template>

<script lang="ts" setup>
import {mdiCheck, mdiClipboardTextOutline} from "@mdi/js";

const props = defineProps({
  value: {
    type: String,
  },
  hiddenIfEmpty: {
    type: Boolean,
    default: false,
  }
})

const copyText = ref('单击复制');
const copyIcon = ref(mdiClipboardTextOutline);

async function copy() {
  if (!props.value) return;
  await navigator.clipboard.writeText(props.value)
  copyIcon.value = mdiCheck;
  copyText.value = "复制成功";
  setTimeout(() => {
    copyIcon.value = mdiClipboardTextOutline;
    copyText.value = "单击复制";
  }, 1000);
}
</script>

<style lang="less">
@import "@/assets/var.less";

.copy-btn {
  padding: 4px 12px;
  font-size: 12px;
  gap: 4px;
  transition: all .2s ease;

  svg {
    width: 15px;
    height: 15px;
  }

  &:hover {
    background: @primary;
    color: white;
    border-color: transparent;
  }
}
</style>