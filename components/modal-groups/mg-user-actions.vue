<template>
  <modal v-model="modalUserAction_mcid" :class="{describe: !userInformation.hasBoundValidMCID}" class="with-bg--darken">
    <modal-content v-if="!userInformation.hasBoundValidMCID">
      <icon :path="mdiMinecraft"/>
      <h2>立即绑定 Minecraft ID</h2>
      <p>Minecraft ID 是指你在 MOJANG 处注册的游戏名称，显示在游戏内的聊天中。</p>
      <p>绑定后，你可以在 TiLab 中与游戏进行信息交互，并可享受后续推出的更多相关功能。</p>
      <form class="mcid-form">
        <textfield class="mcid-textfield" placeholder="游戏名" bg-text v-model:input="mcidToBind"
                   v-model:tempProblem="mcidTempProblem" required/>
      </form>
    </modal-content>
    <modal-title v-if="userInformation.hasBoundValidMCID">更新 Minecraft ID</modal-title>
    <modal-content v-if="userInformation.hasBoundValidMCID">
      <p>如果你希望绑定另一个不同的游戏名，可以在此处修改。</p>
      <form class="mcid-form">
        <textfield class="mcid-textfield" placeholder="游戏名" bg-text v-model:input="mcidToBind"
                   v-model:tempProblem="mcidTempProblem" required/>
      </form>
    </modal-content>
    <modal-actions>
      <btn :disabled="!mcidValid" class="with-bg--primary hover--dim" :loading="mcidBindLoading" @click="bindMCID">
        立即{{ !userInformation.hasBoundValidMCID ? '绑定' : '修改'}}
      </btn>
      <btn @click="modalUserAction_mcid = false" class="with-bg--white hover--dim">
        取消
      </btn>
    </modal-actions>
  </modal>
  <error-modal allow-close no-retry :error-information-content="errorModalContent" v-model="modalError">
    <p>在执行操作过程中出现了一些问题。</p>
    <p>单击「<strong>错误信息</strong>」按钮查看内部错误信息，然后单击弹出的信息复制，将其传达给维护者以得到支持。</p>
  </error-modal>
</template>

<script lang="ts" setup>
import {useState} from "#app";
import {mdiMinecraft} from "@mdi/js";
import patch from "~/utils/patch";
import {BackendCodes} from "~/consts";
import getAshconResponse from "~/utils/getAshconResponse";

const userInformation = useState<UserExtended>('user-data');
const modalUserAction_mcid = useState('modal-user-action_mcid', () => false);
const mcidToBind = ref('');
const mcidTempProblem = ref('');
const mcidBindLoading = ref(false);
const mcidValid = computed(() => /^[a-zA-Z0-9_]{2,16}$/.test(mcidToBind.value))

const errorModalContent = ref('');
const modalError = ref(false);

watch(mcidToBind, v => {
  if (!/^[a-zA-Z0-9_]{2,16}$/.test(v)) {
    if (!/^[a-zA-Z0-9_]+$/.test(v)) {
      mcidTempProblem.value = "只能包含英文、下划线或者数字"
    } else {
      mcidTempProblem.value = "长度为 2~16 位";
    }
  } else {
    mcidTempProblem.value = ''
  }
})

async function bindMCID() {
  mcidBindLoading.value = true;
  const ashconResult = await getAshconResponse(mcidToBind.value);
  if (ashconResult.code === 404) {
    mcidBindLoading.value = false;
    mcidTempProblem.value = "此游戏名不存在";
    return;
  }
  const result = await patch(`/api/user/profile?username=${userInformation.value.username}`, {
    'mc_id': mcidToBind.value
  });
  mcidBindLoading.value = false;
  modalUserAction_mcid.value = false;

  if (result.code === BackendCodes.OK) {
    useRouter().go(0);
  } else {
    modalError.value = true;
    errorModalContent.value = JSON.stringify(result);
  }
}
</script>

<style lang="less" scoped>
.mcid-form {
  margin-top: 16px;
  width: 100%;
}
</style>