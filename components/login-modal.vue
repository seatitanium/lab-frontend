<template>
  <modal v-model="model" class="darken w400">
    <modal-title>登录</modal-title>
    <modal-content>
      <p>Lab 的功能需要与你的服务器账号关联，登录后即可畅享所有功能。</p>
      <form class="login-form">
        <textfield placeholder="用户名"/>
        <textfield placeholder="密码" />
      </form>
    </modal-content>
    <modal-actions class="right">
      <btn class="without-bg--primary hover--dim">关闭</btn>
      <btn class="with-bg--primary hover--dim">登录</btn>
    </modal-actions>
  </modal>
</template>

<script lang="ts" setup>

const model = defineModel();

</script>

<style lang="less" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>