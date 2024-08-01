<template>
  <seati-nav/>
  <main v-if="!firstAccess">
    <slot/>
  </main>
  <seati-footer v-if="!firstAccess"/>
</template>

<script lang="ts" setup>
import {useLocalStorage} from "@vueuse/core";

const firstAccess = useLocalStorage('tisea-first-access-lab', () => true);
</script>