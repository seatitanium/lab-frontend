<template>
  <modal v-model="loginModalState" class="with-bg--darken with-bg--blur w400 animation--Scale" :allow-esc="false">
    <modal-title>登录</modal-title>
    <modal-content>
      <p>Lab 的功能需要与你的服务器账号关联，登录后即可畅享所有功能。</p>
      <form class="login-form">
        <textfield v-model:tempProblem="usernameTempProblem" v-model:input="username" required bg-text placeholder="用户名"/>
        <textfield v-model:tempProblem="passwordTempProblem" v-model:input="password" required bg-text type="password" placeholder="密码"/>
      </form>
      <div tabindex="0" class="register__now">
        还没有账号？<br/>
        <h2>现在就注册一个</h2>
        <icon :path="mdiArrowRight"/>
      </div>
    </modal-content>
    <modal-actions class="right">
      <btn class="without-bg--primary hover--dim" @click="loginModalState = false" v-if="allowClose">关闭</btn>
      <btn class="with-bg--primary hover--dim" :loading="loginLoading" @click="login" :disabled="!formValid">登录</btn>
    </modal-actions>
  </modal>
</template>

<script lang="ts" setup>
import {mdiArrowRight} from "@mdi/js";
import {useLocalStorage} from "@vueuse/core";
import post from "~/utils/post";
import {BackendCodes} from "~/consts";

const props = defineProps({
  allowClose: {
    type: Boolean,
    default: false
  }
})

const loginModalState = useState('login-modal', () => false);
const loginLoading = ref(false);

const username = ref('');
const usernameTempProblem = ref('');
const password = ref('');
const passwordTempProblem = ref('');

const formValid = computed(() => {
  return username.value !== '' && password.value !== '';
});

async function login() {
  if (!formValid.value) return;

  loginLoading.value = true;

  const result = await post<LoginRes>('/api/auth/login', {
    username: username.value,
    password: password.value
  });

  loginLoading.value = false;

  if (result.code === BackendCodes.OK) {
    const token = useLocalStorage('tisea-auth-token', '');
    const username = useLocalStorage('tisea-auth-username', '');
    token.value = result.data.token;
    username.value = result.data.username;
    useRouter().go(0);
  } else {
    console.log(result)
    if (result.code === BackendCodes.TargetNotExist) {
      usernameTempProblem.value = '这个用户名不存在。';
    }

    if (result.code === BackendCodes.AuthenticationFailed) {
      passwordTempProblem.value = '请检查密码是否正确。';
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/var.less";

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 16px;
}

.register__now {
  margin: 16px 0;
  padding: 16px;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  background-image: url('@/assets/images/2023-07-20_01.08.34.jpg');
  position: relative;
  cursor: pointer;
  overflow: hidden;
  .textshadow--default;

  h2 {
    font-size: 24px;
    margin: 0;
  }

  svg {
    opacity: 0;
    transform: translateX(-20px) translateY(50%);
    transition: all .2s ease;
    position: absolute;
    right: -16px;
    bottom: 50%;
    width: 200px;
    height: 200px;
  }

  &:hover {
    svg {
      transform: translateX(0) translateY(50%);
      opacity: .4;
    }
  }
}
</style>