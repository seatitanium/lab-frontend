<script setup lang="ts">
  onMounted(async () => {
    const result = await get('https://www.curseforge.com/minecraft/modpacks/all-the-mods-9');
    console.log(result);
  })
</script>

<template>
  <div class="pack-description">

  </div>
</template>

<style scoped lang="less">

</style>