<template>
  <modal v-model="modalUserAction_mcid" :class="{describe: !userInformation.hasBoundValidMCID}" class="with-bg--darken">
    <modal-content v-if="!userInformation.hasBoundValidMCID">
      <icon :path="mdiMinecraft"/>
      <h2>{{ mcidExistButNotVerified ? '重新' : '立即' }}绑定 Minecraft ID</h2>
      <block class="with-bg--orange" v-if="mcidExistButNotVerified">
        <icon :path="mdiAlertOutline"/>
        你已经绑定了一个游戏名（{{ userInformation.mcid}}），但没有验证
      </block>
      <p>Minecraft ID 是指你在 MOJANG 处注册的游戏名称，显示在游戏内的聊天中。</p>
      <p>绑定后，你可以在 TiLab 中与游戏进行信息交互，并可享受后续推出的更多相关功能。</p>
      <form>
        <textfield class="mcid-textfield" placeholder="游戏名" bg-text v-model:input="mcidToBind"
                   v-model:tempProblem="mcidTempProblem" required/>
      </form>
    </modal-content>
    <modal-title v-if="userInformation.hasBoundValidMCID">更新 Minecraft ID</modal-title>
    <modal-content v-if="userInformation.hasBoundValidMCID">
      <p>如果你希望绑定另一个不同的游戏名，可以在此处修改。</p>
      <form>
        <textfield class="mcid-textfield" placeholder="游戏名" bg-text v-model:input="mcidToBind"
                   v-model:tempProblem="mcidTempProblem" required/>
      </form>
    </modal-content>
    <modal-actions>
      <btn :disabled="!mcidValid" class="with-bg--primary hover--dim" :loading="loading" @click="bindMCID">
        {{ mcidExistButNotVerified ? '重新' : '立即'}}{{ !userInformation.hasBoundValidMCID ? '绑定' : '修改' }}
      </btn>
      <btn @click="modalUserAction_mcid = false" class="with-bg--white hover--dim">
        取消
      </btn>
    </modal-actions>
  </modal>
  <modal v-model="modalUserAction_nickname" :class="{describe: !userInformation.nickname}" class="with-bg--darken">
    <modal-content v-if="!userInformation.nickname">
      <icon :path="mdiRenameOutline"/>
      <h2>添加昵称</h2>
      <p>如果昵称存在，它将会代替用户名显示在页面的主要位置。</p>
      <p>不同于用户名不可修改且有严格的格式：昵称的格式<strong>比较随意</strong>，也<strong>可以随意修改</strong>。</p>
      <form>
        <textfield class="nickname-textfield" placeholder="昵称" bg-text v-model:input="nicknameToChange"
                   v-model:tempProblem="nicknameTempProblem"/>
      </form>
    </modal-content>
    <modal-title v-if="userInformation.nickname !== ''">更新昵称</modal-title>
    <modal-content v-if="userInformation.nickname !== ''">
      <p>可以在此处修改你的昵称，<strong>留空提交代表删除昵称</strong>。</p>
      <form>
        <textfield class="nickname-textfield" placeholder="昵称" bg-text v-model:input="nicknameToChange"
                   v-model:tempProblem="nicknameTempProblem"/>
      </form>
    </modal-content>
    <modal-actions>
      <btn :disabled="!nicknameValid" class="with-bg--primary hover--dim" :loading="loading" @click="bindNickname">
        {{ nicknameToChange.length > 0 ? (userInformation.nickname === '' ? '立即添加' : '立即修改') : '删除昵称' }}
      </btn>
      <btn @click="modalUserAction_nickname = false" class="with-bg--white hover--dim">
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
import {mdiAlertOutline, mdiMinecraft, mdiPencilOutline, mdiRenameOutline} from "@mdi/js";
import patch from "~/utils/patch";
import {BackendCodes} from "~/consts";
import getAshconResponse from "~/utils/getAshconResponse";

const loading = ref(false);

const regexMCID = /^[a-zA-Z0-9_]{2,16}$/;
const regexNickname = /^[\u4E00-\u9FFFA-Za-z0-9_]{3,15}$/;

const userInformation = useState<UserExtended>('user-data');
const modalUserAction_mcid = useState('modal-user-action_mcid', () => false);
const mcidToBind = ref('');
const mcidTempProblem = ref('');
const mcidValid = computed(() => regexMCID.test(mcidToBind.value) && mcidToBind.value !== userInformation.value.mcid)
const mcidExistButNotVerified = computed(() => userInformation.value.mcidExist && !userInformation.value.mcidVerified);

const modalUserAction_nickname = useState('modal-user-action-nickname', () => false);
const nicknameToChange = ref('');
const nicknameTempProblem = ref('');
const nicknameValid = computed(() => regexNickname.test(nicknameToChange.value) || nicknameToChange.value.length === 0)

const errorModalContent = ref('');
const modalError = ref(false);

watch(nicknameToChange, v => {
  if (v.length === 0) {
    nicknameTempProblem.value = '';
    return;
  }

  if (!regexNickname.test(v)) {
    if (!/^[\u4E00-\u9FFFA-Za-z0-9_]+$/.test(v)) {
      nicknameTempProblem.value = "只能包含汉字、英文、下划线或数字";
    } else {
      nicknameTempProblem.value = "长度为 3~15 位"
    }
  } else {
    nicknameTempProblem.value = '';
  }
})

watch(mcidToBind, v => {
  if (v === userInformation.value.mcid) {
    mcidTempProblem.value = "请填写不同于当前的游戏名"
    return;
  }
  if (!regexMCID.test(v)) {
    if (!/^[a-zA-Z0-9_]+$/.test(v)) {
      mcidTempProblem.value = "只能包含英文、下划线或者数字"
    } else {
      mcidTempProblem.value = "长度为 2~16 位";
    }
  } else {
    mcidTempProblem.value = ''
  }
})

async function bindNickname() {
  loading.value = true;

  const result = await patch(`/api/user/profile?username=${userInformation.value.username}`, {
    'nickname': nicknameToChange.value
  });
  loading.value = false;
  modalUserAction_nickname.value = false;

  if (result.code === BackendCodes.OK) {
    useRouter().go(0);
  } else {
    modalError.value = true;
    errorModalContent.value = JSON.stringify(result);
  }
}

async function bindMCID() {
  loading.value = true;
  const ashconResult = await getAshconResponse(mcidToBind.value);
  if (ashconResult.code === 404) {
    loading.value = false;
    mcidTempProblem.value = "此游戏名不存在";
    return;
  }
  const result = await patch(`/api/user/profile?username=${userInformation.value.username}`, {
    'mc_id': mcidToBind.value
  });
  loading.value = false;
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
form {
  margin-top: 16px;
  width: 100%;
}
</style>