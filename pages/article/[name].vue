<template>
  <article class="article container">
    <content-doc :path="articleRoute">
      <template #not-found>
        <p>The document content could not be found.</p>
        <p>Please contact the administrator at <a href="mailto:i@seati.cc">i@seati.cc</a>.</p>
      </template>
    </content-doc>
  </article>
</template>

<script lang="ts" setup>
import {useRoute} from "#app";

const articleName = computed(() => useRoute().params.name);
const articleRoute = computed(() => `/${articleName.value}`)

definePageMeta({
  title: '文章'
})
</script>

<style lang="less" scoped>
.article {
  padding: 20px 0;
}
</style>