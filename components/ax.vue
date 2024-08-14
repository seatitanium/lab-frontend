<template>
  <a :href="href" :target="isOutside ? '_blank' : '_self'"><slot/><icon v-if="isOutside" :path="mdiLaunch"/></a>
</template>

<script lang="ts" setup>
import {mdiLaunch} from "@mdi/js";

const props = defineProps({
  href: {
    type: String,
    required: true
  }
})

const isOutside = computed(() => props.href?.startsWith('http') || props.href?.startsWith('//'));
</script>

<style lang="less" scoped>

</style>