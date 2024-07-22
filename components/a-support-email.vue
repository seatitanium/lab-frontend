<template>
  <a :href="'mailto:' + SupportEmail">{{ SupportEmail }}</a>
</template>
<script setup lang="ts">
import {SupportEmail} from "~/consts";
</script>

<style scoped>
a {
  display: inline;
}
</style>