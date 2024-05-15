<template>
  <modal v-model="model" class="with-bg--darken w400 animation--Scale">
    <modal-title>登录</modal-title>
    <modal-content>
      <p>Lab 的功能需要与你的服务器账号关联，登录后即可畅享所有功能。</p>
      <form class="login-form">
        <textfield bg-text placeholder="用户名"/>
        <textfield bg-text type="password" placeholder="密码"/>
      </form>
      <div tabindex="0" class="register__now">
        还没有账号？<br/>
        <h2>现在就注册一个</h2>
        <icon :path="mdiArrowRight"/>
      </div>
    </modal-content>
    <modal-actions class="right">
      <btn class="without-bg--primary hover--dim" @click="model = false">关闭</btn>
      <btn class="with-bg--primary hover--dim" :loading="loginLoading" @click="login">登录</btn>
    </modal-actions>
  </modal>
</template>

<script lang="ts" setup>
import {mdiArrowRight} from "@mdi/js";

const model = defineModel();
const loginLoading = ref(false);

function login() {
  loginLoading.value = true;
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