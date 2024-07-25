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
  <modal v-model="modalUserAction_email" class="with-bg--darken">
    <modal-title>修改邮箱</modal-title>
    <modal-content>
      <p>如果你更换了邮箱，请在此修改。</p>
      <block class="with-bg--orange">
        <icon :path="mdiAlertOutline"/>
        <p>我们暂时无法提供对邮箱的验证服务。请自行检查邮箱正确性，避免将来出现问题。</p>
      </block>
      <form>
        <textfield class="email-textfield" placeholder="邮箱" bg-text v-model:input="emailToChange" v-model:temp-problem="emailTempProblem"/>
      </form>
    </modal-content>
    <modal-actions>
      <btn :disabled="!emailValid" class="with-bg--primary hover--dim" :loading="loading" @click="bindEmail">
        立即修改
      </btn>
      <btn @click="modalUserAction_email = false" class="with-bg--white hover--dim">
        取消
      </btn>
    </modal-actions>
  </modal>
  <modal v-model="modalUserAction_password" class="with-bg--darken">
    <modal-title>修改密码</modal-title>
    <modal-content>
      <p>如果知道当前的密码，且希望更换它，请在此修改。</p>
      <block class="with-bg--orange">
        <icon :path="mdiAlertOutline"/>
        <p>如果你忘记了密码，请联系讨论群管理员或发送邮件到 <a-support-email/> 寻求帮助。<br/>在此处修改密码需要以先前的密码作为凭据。</p>
      </block>
      <form>
        <textfield class="password-textfield" type="password" placeholder="原密码" bg-text required v-model:input="oldPassword" v-model:temp-problem="oldPasswordTempProblem"/>
        <textfield class="password-textfield" placeholder="新密码" bg-text required v-model:input="passwordToChange" v-model:temp-problem="passwordTempProblem"/>
      </form>
    </modal-content>
    <modal-actions>
      <btn :disabled="!passwordValid || oldPassword.length === 0" class="with-bg--primary hover--dim" :loading="loading" @click="bindPassword">
        立即更新
      </btn>
      <btn @click="modalUserAction_password = false" class="with-bg--white hover--dim">
        取消
      </btn>
    </modal-actions>
  </modal>
  <modal v-model="modalUserAction_delete" class="describe with-bg--darken">
    <modal-content>
      <icon :path="mdiAccountOffOutline" color="#f44336"/>
      <h2>注销账号</h2>
      <p>注销账号将完全删除服务器上与你有关的<strong>一切数据</strong>，并且<strong>不可恢复</strong>。我们<strong>不会</strong>对任何注销的用户信息进行额外的备份。</p>
      <p>如果确认需要注销账号，请联系讨论群内的任意管理员，或者发送邮件到 <a-support-email/> 进行申请。</p>
    </modal-content>
    <modal-actions>
      <btn class="with-bg--white hover--dim" @click="modalUserAction_delete = false">关闭</btn>
    </modal-actions>
  </modal>
  <error-modal allow-close no-retry :error-information-content="errorModalContent" v-model="modalError">
    <p>在执行操作过程中出现了一些问题。</p>
    <p>单击「<strong>错误信息</strong>」按钮查看内部错误信息，然后单击弹出的信息复制，将其传达给维护者以得到支持。</p>
  </error-modal>
</template>

<script lang="ts" setup>
import {useState} from "#app";
import {mdiAccountOffOutline, mdiAlert, mdiAlertOutline, mdiMinecraft, mdiRenameOutline} from "@mdi/js";
import patch from "~/utils/patch";
import {BackendCodes, GlobalRegex, SupportEmail} from "~/consts";
import getAshconResponse from "~/utils/getAshconResponse";
import ASupportEmail from "~/components/a-support-email.vue";
import {checkEmail, checkMCID, checkNickname, checkPassword} from "~/field-checks";

const loading = ref(false);

const userInformation = useState<UserExtended>('user-data');
const modalUserAction_mcid = useState('modal-user-action_mcid', () => false);
const mcidToBind = ref('');
const mcidTempProblem = ref('');
const mcidValid = computed(() => GlobalRegex.mcid.test(mcidToBind.value) && mcidToBind.value !== userInformation.value.mcid)
const mcidExistButNotVerified = computed(() => userInformation.value.mcidExist && !userInformation.value.mcidVerified);

const modalUserAction_nickname = useState('modal-user-action-nickname', () => false);
const nicknameToChange = ref('');
const nicknameTempProblem = ref('');
const nicknameValid = computed(() => nicknameTempProblem.value === '');

const modalUserAction_email = useState('modal-user-action-email', () => false);
const emailToChange = ref('');
const emailTempProblem = ref('');
const emailValid = computed(() => emailTempProblem.value === '');

const modalUserAction_password = useState('modal-user-action-password', () => false);
const oldPassword = ref('');
const passwordToChange = ref('');
const passwordTempProblem = ref('');
const oldPasswordTempProblem = ref('');
const passwordValid = computed(() => passwordTempProblem.value === '');

const modalUserAction_delete = useState('modal-user-action-delete', () => false);

const errorModalContent = ref('');
const modalError = ref(false);

watch(passwordToChange, v => {
  checkPassword(v, passwordTempProblem);
})

watch(emailToChange, v => {
  checkEmail(v, emailTempProblem)
})

watch(nicknameToChange, v => {
 checkNickname(v, nicknameTempProblem)
})

watch(mcidToBind, v => {
  if (v === userInformation.value.mcid) {
    mcidTempProblem.value = "请填写不同于当前的游戏名"
    return;
  }

  checkMCID(v, mcidTempProblem)
})

async function updateProfile(object: {[prop: string]: any}, callback: Function) {
  loading.value = true;

  const result = await patch(`/api/user/profile?username=${userInformation.value.username}`, object);
  loading.value = false;
  callback();

  if (result.code === BackendCodes.OK) {
    useRouter().go(0);
  } else {
    modalError.value = true;
    errorModalContent.value = JSON.stringify(result);
  }
}

async function bindPassword() {
  loading.value = true;

  const loginResult = await post("/api/auth/login", {
    username: userInformation.value.username,
    password: oldPassword.value
  });

  if (loginResult.code !== BackendCodes.OK) {
    oldPasswordTempProblem.value = "原密码不正确";
    loading.value = false;
    return;
  }

  await updateProfile({
    'password': passwordToChange.value
  }, () => {
    modalUserAction_password.value = false;
  })
}

function bindEmail() {
  updateProfile({
    'email': emailToChange.value
  }, () => {
    modalUserAction_email.value = false;
  })
}

function bindNickname() {
  updateProfile({
    'nickname': nicknameToChange.value
  }, () => {
    modalUserAction_nickname.value = false;
  })
}

async function bindMCID() {
  loading.value = true;
  const ashconResult = await getAshconResponse(mcidToBind.value);
  if (ashconResult.code === 404) {
    loading.value = false;
    mcidTempProblem.value = "此游戏名不存在";
    return;
  }

  await updateProfile({
    'mc_id': mcidToBind.value
  }, () => {
    modalUserAction_mcid.value = false;
  })
}
</script>

<style lang="less" scoped>
form {
  margin-top: 16px;
  width: 100%;
}
</style>