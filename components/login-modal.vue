<template>
  <modal v-model="model" class="with-bg--darken w400 animation--Scale">
    <modal-title>登录</modal-title>
    <modal-content>
      <p>Lab 的功能需要与你的服务器账号关联，登录后即可畅享所有功能。</p>
      <fields ref="loginForm" class="login-form">
        <textfield v-model="username" required bg-text placeholder="用户名"/>
        <textfield v-model="password" required bg-text type="password" placeholder="密码"/>
      </fields>
      <div tabindex="0" class="register__now">
        还没有账号？<br/>
        <h2>现在就注册一个</h2>
        <icon :path="mdiArrowRight"/>
      </div>
    </modal-content>
    <modal-actions class="right">
      <btn class="without-bg--primary hover--dim" @click="model = false">关闭</btn>
      <btn class="with-bg--primary hover--dim" :loading="loginLoading" @click="login" :disable="!formValid">登录</btn>
    </modal-actions>
  </modal>
</template>

<script lang="ts" setup>
import {mdiArrowRight} from "@mdi/js";
import {useLocalStorage} from "@vueuse/core";
import post from "~/utils/post";

const model = defineModel();
const loginLoading = ref(false);
const loginForm = ref<VerifyForm>(null);

const username = ref('');
const password = ref('');

const formValid = computed(() => {
  if (loginForm.value !== null) return loginForm.value.getValidity();
  return false;
});

async function login() {
  if (!formValid) return;

  loginLoading.value = true;

  const result = await post<LoginResp>('/api/auth/login', {
    username: username.value,
    password: password.value
  });

  loginLoading.value = false;

  if (result.code === 0) {
    const token = useLocalStorage('tisea-auth-token', '');
    token.value = result.data;
  } else {
    console.log(result)
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/var.less";

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
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