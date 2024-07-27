<template>
  <anywhere-popup class="resource-explanation" v-model="termResourcesExplanationPopup" :code="false">
    <p>在每个周目结束以后，其存档和相关数据都会被封存保留，但不会再重新以服务器的形式出现。在这里我们提供了原文件供给<strong>绑定了 Minecraft ID 的玩家</strong>下载。</p>
    <p><strong>整合包 <icon :path="mdiPackageVariant"/></strong> —— 该周目所使用的整合包，其版本与当时的存档所对应。</p>
    <p><strong>模组包 <icon :path="mdiWrenchOutline"/></strong> —— 从该模组的服务端或者客户端（整合包安装后）中提取出的模组集合，可用于启动存档。考虑到许多整合包具有私有的改动成分，单靠安装模组包并不一定能够正常游玩过往存档。</p>
    <p><strong>存档 <icon :path="mdiEarth"/></strong> —— 该周目最新版本的世界存档，为 world 文件夹压缩而来，可在相应版本的 Minecraft 中启动。</p>
  </anywhere-popup>
</template>
<script setup lang="ts">
import {mdiEarth, mdiPackageVariant, mdiWrenchOutline} from "@mdi/js";

const termResourcesExplanationPopup = useState('popup-term-resources-explanation', () => false);
</script>