<template>
  <modal class="with-bg--darken describe" v-model="model">
    <modal-content>
      <icon color="#009688" :path="mdiCheckDecagramOutline"/>
      <h2>注册成功</h2>
      <p>恭喜，你已经注册成功！</p>
      <p>你绑定的 Minecraft ID 是 {{ userInformation.mcid }}，仅需一步验证，即可体验全部功能。你可以随时进行此步骤。</p>
    </modal-content>
    <modal-actions>
      <btn class="with-bg--primary hover--dim" @click="model = false; tipsBindMCID = true">查看验证步骤</btn>
      <btn class="with-bg--white hover--dim" @click="model = false">稍后验证</btn>
    </modal-actions>
  </modal>
</template>

<script lang="ts" setup>
import {mdiCheckDecagramOutline} from "@mdi/js";
import {useState} from "#app";

const model = defineModel();
const userInformation = useState<UserExtended>('user-data');

const tipsBindMCID = useState('tips-bind-mcid', () => false);
</script>