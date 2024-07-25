<template>
  <modal v-model="registerModalState" class="with-bg--darken" :allow-esc="false">
    <modal-title>
      注册
    </modal-title>
    <modal-content>
      <p>立即注册 Lab 账号，畅享 Seati 全功能。</p>
      <block class="with-bg--primary" style="max-width: 500px">
        <icon :path="mdiInformationOutline"/>
        <p>游戏名为<strong>选填</strong>，你可以稍后绑定。注册后，登入服务器使用指令完成绑定流程。绑定后平台所有功能可用。
        </p>
      </block>
      <form>
        <textfield placeholder="用户名" bg-text required v-model:input="username"
                   v-model:temp-problem="usernameProblem"/>
        <textfield placeholder="游戏名" bg-text v-model:input="mcid" v-model:temp-problem="mcidProblem"/>
        <textfield placeholder="邮箱" type="email" bg-text required v-model:input="email"
                   v-model:temp-problem="emailProblem"/>
        <textfield placeholder="密码" type="password" required bg-text v-model:input="password"
                   v-model:temp-problem="passwordProblem"/>
        <textfield placeholder="确认密码" type="password" required bg-text v-model:input="passwordConfirm"
                   v-model:temp-problem="passwordConfirmProblem"/>

      </form>
    </modal-content>
    <modal-actions class="right">
      <btn class="with-bg--white hover--dim" @click="registerModalState = false; loginModalState = true">转到登录</btn>
      <btn :loading="registerLoading" :disabled="!allValid" class="with-bg--primary hover--dim" @click="register">注册
      </btn>
    </modal-actions>
  </modal>
</template>

<script lang="ts" setup>

import {checkEmail, checkMCID, checkPassword, checkUsername} from "~/field-checks";
import noneMatchRef from "~/utils/noneMatchRef";
import allMatchRef from "~/utils/allMatchRef";
import {mdiInformationOutline} from "@mdi/js";
import {BackendCodes} from "~/consts";
import {useLocalStorage} from "@vueuse/core";
import getAfterRegisterNoticeConfig from "~/utils/getAfterRegisterNoticeConfig";

const loginModalState = useState('login-modal');
const registerModalState = useState('register-modal', () => false);

const username = ref('');
const usernameProblem = ref('')
const email = ref('')
const emailProblem = ref('')
const password = ref('')
const passwordProblem = ref('')
const passwordConfirm = ref('')
const passwordConfirmProblem = ref('')
const mcid = ref('')
const mcidProblem = ref('')

const allValid = computed(() => allMatchRef('', usernameProblem, emailProblem, passwordProblem, passwordConfirmProblem, mcidProblem) && noneMatchRef('', username, email, password, passwordConfirm))

watch(username, v => checkUsername(v, usernameProblem))
watch(email, v => checkEmail(v, emailProblem))
watch(password, v => checkPassword(v, passwordProblem))
watch(mcid, v => {
  if (v.length === 0) {
    mcidProblem.value = ''
    return;
  }

  checkMCID(v, mcidProblem)
})

watch(passwordConfirm, v => {
  if (v !== password.value) {
    passwordConfirmProblem.value = '密码不一致';
  } else {
    passwordConfirmProblem.value = '';
  }
})

const registerLoading = ref(false);

async function register() {
  registerLoading.value = true;

  const result = await post(`/api/auth/register`, {
    'username': username.value,
    'password': password.value,
    'email': email.value,
    'mcid': mcid.value
  });

  registerLoading.value = false;

  if (result.code === BackendCodes.OK) {
    await doLogin({
      username: username.value,
      password: password.value
    }, () => {
      const store = getAfterRegisterNoticeConfig();
      store.value = {
        mcid: mcid.value !== '',
        ready: true
      }
      useRouter().go(0);
    }, r => console.error(r))
  } else {
    if (result.code === BackendCodes.DuplicatedUserRegistration) {
      usernameProblem.value = '此用户名已被使用'
    }
    console.warn(result)
  }
}
</script>