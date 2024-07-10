<template>
  <img :src="`https://crafatar.com/avatars/${uuid}`"/>
</template>

<script lang="ts" setup>
import playernameToUUID from "~/utils/playernameToUUID";

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const uuid = await playernameToUUID(props.name);
</script>