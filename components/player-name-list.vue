<template>
  <span v-for="(x, i) in currentTermPlayers">
    <a v-if="x.uuid" :href="`https://namemc.com/profile/${x.uuid}`"
       target="_blank">{{ x.name }}</a>
    <span v-else>{{ x.name }}</span><span
      v-if="i !== currentTermPlayers.length - 1">, </span>
  </span>
</template>

<script lang="ts" setup>
const props = defineProps({
  currentTermPlayers: {
    type: Array,
    required: true
  }
});
</script>