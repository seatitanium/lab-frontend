<template>
  <div class="player-avatar" :class="{loading: (!uuid || uuid.length === 0) && !steve}">
    <img v-if="(uuid && uuid.length > 0) || uuidLocal" :src="`https://crafatar.com/avatars/${uuid || uuidLocal}`"/>
    <img src="~/assets/images/steve.png" v-else-if="steve"/>
    <circle-spinner v-else :size="loadingSize"/>
    <div class="hover-name-overlay" v-if="hoverName && name">
      <p>{{ name }}</p>
      <small v-if="!uuid || uuid.length === 0">非正版</small>
    </div>
  </div>
</template>

<script lang="ts" setup>
import playernameToUUID from "~/utils/playernameToUUID";

const props = defineProps({
  name: {
    type: String
  },
  loadingSize: {
    type: String,
    default: "20"
  },
  uuid: {
    type: String
  },
  steve: {
    type: Boolean,
    default: false
  },
  hoverName: {
    type: Boolean,
    default: false
  }
})

const uuidLocal = ref('');

watch(() => props.name, async v => {
  if (props.uuid) return;
  uuidLocal.value = await playernameToUUID(v || '');
}, {
  immediate: true
})
</script>

<style lang="less" scoped>
.player-avatar {
  position: relative;
  line-height: 0;

  img {
    width: 100%;
  }

  &:hover {
    .hover-name-overlay {
      opacity: 1;
    }
  }
}

.hover-name-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  line-height: 1.5;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: white;
  pointer-events: none;
  opacity: 0;
  transition: all .2s ease;
  background: rgba(0, 0, 0, .7);

  p {
    margin: 0;
    word-wrap: anywhere;
    padding: 0 4px;
    text-align: center;
  }
}
</style>