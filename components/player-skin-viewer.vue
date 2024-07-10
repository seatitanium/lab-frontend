<template>
  <div class="player-skin-viewer-container" :style="{width: props.width + 'px', height: props.height + 'px'}">
    <canvas ref="skinView"/>
  </div>
</template>

<script lang="ts" setup>
import * as skinview3d from 'skinview3d'

const skinView = ref<HTMLCanvasElement>();
const props = defineProps({
  image: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    default: 200
  },
  height: {
    type: Number,
    default: 400
  }
})

onMounted( () => {
  const image = new Image();
  image.src = "data:image/png;base64," + props.image;
  image.crossOrigin = '';
  image.addEventListener('load', e => {
    image.height = image.naturalHeight;
    image.width = image.naturalWidth;
    const viewer = new skinview3d.SkinViewer({
      canvas: skinView.value,
      skin: image,
      enableControls: true,
      width: props.width,
      height: props.height
    })
    viewer.autoRotate = true;
  });
})
</script>

<style lang="less" scoped>
.player-skin-viewer-container {
  border: 1px solid rgba(0, 0, 0, .21);
  border-radius: 10px;
  padding: 16px 32px;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}
</style>