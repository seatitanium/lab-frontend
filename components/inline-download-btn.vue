<template>
  <btn small class="with-bg--primary hover--dim" :href="fileURL"><icon :path="presetIcon"/>下载{{ type }} {{ props.file.size ? `(${props.file.size})` : '' }}</btn>
</template>
<script setup lang="ts">
import {mdiDownloadOutline, mdiEarth, mdiPackage, mdiPackageVariant, mdiWrench, mdiWrenchOutline} from "@mdi/js";
const props = defineProps({
  file: {
    type: Object,
    required: true
  },
  type: {
    type: String,
  },
  term: {
    type: String,
    required: true
  }
})

const presetIcon = computed(() => {
  if (!props.type) return mdiDownloadOutline;
  switch (props.type) {
    case "整合包": return mdiPackageVariant;
    case "存档": return mdiEarth;
    case "模组包": return mdiWrenchOutline;
    default: return mdiDownloadOutline;
  }
})

const fileURL = computed(() => toSeatiCOSURL(props.file.name, props.term?.startsWith("st") ? props.term?.slice(2) : props.term))
</script>