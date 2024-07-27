<template>
  <modal v-model="model" class="with-bg--darken term-modal" with-close-btn>
    <modal-content>
      <term-info display-turn-to-terms-page v-model:num="termModalNum">
        <template #bind-mcid-btn>
          <btn class="with-bg--primary hover--dim" small @click="model = false; modalUserAction_mcid = true"><icon :path="mdiLinkVariantPlus"/> 立即绑定</btn>
        </template>
        <template #turn-to-terms-btn>
          <btn @click="model = false; navigateTo('/terms')" small class="turn-to-terms-page with-bg--primary hover--dim">
            <icon :path="mdiCardsPlaying"/>查看所有周目
          </btn>
        </template>
      </term-info>
    </modal-content>
  </modal>

</template>
<script setup lang="ts">
import {
  mdiCardsPlaying,
  mdiLinkVariantPlus
} from "@mdi/js";
import {useState} from "#app";

const termModalNum = useState('term-modal-num', () => '7');
const model = useState('term-modal');

const modalUserAction_mcid = useState('modal-user-action_mcid', () => false);
</script>

<style lang="less" scoped>
.term-modal .modal {
  min-width: 800px;
}
</style>