<template>
  <modal class="with-bg--darken describe" v-model="model">
    <modal-content>
      <icon color="#009688" :path="mdiLinkVariantPlus"/>
      <h2>立即绑定你的游戏名</h2>
      <p>绑定游戏名后，你可以在 Lab 上随时查看自己在 Seati 游戏中的各种记录，并可体验在网页端向服务器发送信息等等功能。</p>
      <p>你可以随时更换已绑定的游戏名。</p>
    </modal-content>
    <modal-actions>
      <btn class="with-bg--primary hover--dim" @click="model = false; modalUserAction_mcid= true;">立即绑定</btn>
      <btn class="with-bg--white hover--dim" @click="model = false">不了</btn>
    </modal-actions>
  </modal>
</template>

<script setup lang="ts">
import {mdiLinkVariantPlus} from "@mdi/js";
import {useState} from "#app";

const model = defineModel();

const modalUserAction_mcid = useState('modal-user-action_mcid', () => false);

</script>