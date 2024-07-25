<template>
  <modal class="with-bg--darken" v-model="model">
    <modal-title>Tips 如何验证即将绑定的游戏名</modal-title>
    <modal-content>
      <div class="steps">
        <div class="step">
          <div class="number">1</div>
          <div class="content">
            <p>使用<strong>要绑定的游戏名</strong>进入服务器</p>
          </div>
        </div>
        <div class="step">
          <div class="number">2</div>
          <div class="content">
            <p>不出意外，你会收到类似于下图的信息：</p><img src="~/assets/images/verify-message.png"/>
          </div>
        </div>
        <div class="step">
          <div class="number">3</div>
          <div class="content">
            <p>键入指令 <code>/seati lab verify</code>。如果提示“绑定成功”，则代表成功绑定，刷新页面可见。</p>
          </div>
        </div>
      </div>
      <p>如果此过程中遇到任何问题，请联系管理员寻求帮助。</p>
    </modal-content>
    <modal-actions class="right">
      <btn @click="model = false" class="with-bg--white hover--dim">关闭</btn>
    </modal-actions>
  </modal>
</template>

<script lang="ts" setup>
const model = useState('tips-bind-mcid', () => false);
</script>