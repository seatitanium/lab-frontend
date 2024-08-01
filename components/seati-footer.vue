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
            <p class="copyright"><small>&copy; 2024 Seati · Built with Nuxt 3 with 🤔</small></p>
          </div>
        </div>
        <div class="second col">
          <h2>更多</h2>
          <nuxt-link to="/about">关于 TiLab</nuxt-link>
          <nuxt-link to="/hello">欢迎页面</nuxt-link>
          <nuxt-link to="/messageboard">留言板</nuxt-link>
          <nuxt-link to="/article/faq">常见问题 FAQ</nuxt-link>
          <a>用户手册</a>
          <a href="https://t.me/seati_lab" target="_blank">Telegram 频道</a>
        </div>
        <div class="third col">
          <h2>系列站点</h2>
          <a href="https://wiki.seati.cc">Seati Wiki</a>
          <a href="https://seati.cc">官网</a>
          <a href="https://moment.seati.cc">Moment 图库</a>
          <a>API 文档</a>
        </div>
        <div class="third col">
          <h2>Mod 生态</h2>
          <a target="_blank" href="https://www.mcmod.cn">MCMOD 百科</a>
          <a target="_blank" href="https://www.curseforge.com/">CurseForge</a>
          <a target="_blank" href="https://modrinth.com/">Modrinth</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import LogoSvg from '~/assets/icons/seati/seati-white.svg?component';
</script>

<style lang="less" scoped>
@import "@/assets/var.less";

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
    padding: 48px 0;
  }
}

.footer-cols {
  display: flex;
  align-items: flex-start;
  gap: 3rem;

  .col.first {
    width: 30%;
  }

  .col:not(.first) {
    width: 20%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .col {
    h2 {
      font-size: 18px;
      margin: 0 0 8px;
    }

    a {
      color: white;
      opacity: .6;
      font-size: 16px;
      transition: all .2s ease;

      &:hover {
        opacity: 1;
        text-decoration: none;
      }
    }
  }
}

.footer-text {
  font-size: 14px;
  line-height: 1.5;

  .copyright {
    opacity: .6;
  }
}

</style>