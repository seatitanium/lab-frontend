<template>
  <footer>
    <div class="container">
      <div class="footer-cols">
        <div class="first col">
          <div class="logo--footer">
            <logo-svg/>
          </div>
          <div class="footer-text">
            <p>Lab 是 Seati 玩家用于合理控制 Seati 服务器和查看各项状态或指标的网页端面板工具。</p>
            <p><small>&copy; 2024 Seati · Built with Nuxt 3 with 🤔</small></p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import LogoSvg from '~/assets/icons/seati/seati-white.svg?component';
</script>

<style lang="less" scoped>

.logo--footer {
  svg {
    width: 30%;
  }
}

footer {
  background: #212121;
  color: white;
  z-index: 100;
  position: relative;

  .container {
    padding: 32px 0;
  }
}

.footer-cols {
  display: flex;
  align-items: flex-start;
  gap: 3rem;

  .col {
    width: 30%;
  }
}

.footer-text {
  font-size: 14px;
  line-height: 1.5;
}

</style>