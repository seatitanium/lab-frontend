<template>
  <img :src="`https://crafatar.com/avatars/${uuid}`"/>
</template>

<script lang="ts" setup>
import getUUIDByPlayername from "~/utils/getAshconResponse";
import getAshconResponse from "~/utils/getAshconResponse";

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const uuid = (await getAshconResponse(props.name))?.uuid;
</script>