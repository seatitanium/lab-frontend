<template>
  <seati-nav/>
  <main v-if="!firstAccess">
    <slot/>
  </main>
  <seati-footer v-if="!firstAccess"/>
</template>

<script lang="ts" setup>
import {useFavicon, useLocalStorage, usePreferredDark} from "@vueuse/core";
import {useHead} from "#imports";
import {useRoute} from "#app";

const firstAccess = useLocalStorage('tisea-first-access-lab', () => true);
const route = useRoute();
const titleWithPrefix = computed(() => `TiLab - ${route.meta.title}`);
const titleWithSuffix = computed(() => `${route.meta.title} | TiLab`)

useHead({
  meta: [
    {
      property: 'og:title',
      content: titleWithPrefix
    }
  ],
  title: titleWithSuffix
})

onMounted(() => {
  const isDark = usePreferredDark();
  const favicon = computed(() => isDark.value ? '/favicon-white.png' : 'favicon-black.png');
  useFavicon(favicon, {
    rel: 'icon'
  })
})
</script>