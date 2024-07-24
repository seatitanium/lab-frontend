<template>
  <modal v-model="modalForgeDesc" class="with-bg--darken describe">
    <modal-content>
      <ForgeLogoFull/>
      <h2>此整合包使用 Forge 作为加载器</h2>
      <p>Minecraft 模组具有多种加载器，如 Forge、Fabric 和
        Quilt，不同的加载器之间的模组一般不互通，除非作者专门制作相应版本。</p>
      <p>此整合包使用的是 Forge 加载器。</p>
    </modal-content>
    <modal-actions>
      <btn class="with-bg--primary hover--dim" @click="modalForgeDesc = false">确定</btn>
    </modal-actions>
  </modal>
  <modal v-model="modalJavaDesc" class="with-bg--darken describe">
    <modal-content>
      <DukeWaving/>
      <h2>支持 Minecraft Java 版</h2>
      <p>Java 版是众多 Minecraft 版本之一，也是较为流行的版本，有别于基岩版、网易版等。本周目服务器支持 Java 版进入。</p>
    </modal-content>
    <modal-actions>
      <btn class="with-bg--primary hover--dim" @click="modalJavaDesc = false">确定</btn>
    </modal-actions>
  </modal>
  <modal v-model="modalOnlineModeDesc" class="with-bg--darken describe">
    <modal-content>
      <icon color="#4caf50" :path="mdiCheckAll"/>
      <h2>正版验证开启</h2>
      <p>服务器已经开启了正版验证，以保障玩家权益和质量。</p>
      <p>这代表着在进入服务器之前，你的客户端将自动连接至 MOJANG 的服务器来检查你的账号是否为正版。</p>
    </modal-content>
    <modal-actions>
      <btn class="with-bg--primary hover--dim" @click="modalOnlineModeDesc = false">确定</btn>
      <btn class="without-bg--primary hover--dim" href="https://www.minecraft.net/">购买正版</btn>
    </modal-actions>
  </modal>
</template>

<script setup lang="ts">
import {mdiCheckAll} from "@mdi/js";
import ForgeLogoFull from "assets/icons/forge-logo-full.svg";
import DukeWaving from "assets/icons/duke-waving.svg";

const modalForgeDesc = useState('modal-forge-description', () => false);
const modalJavaDesc = useState('modal-java-description', () => false);
const modalOnlineModeDesc = useState('modal-online-mode-description', () => false);
</script>