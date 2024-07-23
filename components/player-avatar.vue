<template>
  <img v-if="uuid.length > 0" :src="`https://crafatar.com/avatars/${uuid}`"/>
  <circle-spinner v-else :size="loadingSize"/>
</template>

<script lang="ts" setup>
import playernameToUUID from "~/utils/playernameToUUID";

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  loadingSize: {
    type: String,
    default: "20"
  }
})

const uuid = ref('');

watch(() => props.name, async v => {
  uuid.value = await playernameToUUID(v);
}, {
  immediate: true
})
</script>