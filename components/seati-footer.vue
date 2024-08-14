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
        <div class="links">
          <div class="col">
            <h2>更多页面 &raquo;</h2>
            <nuxt-link to="/about">关于 TiLab</nuxt-link>
            <nuxt-link to="/hello">欢迎页面</nuxt-link>
            <nuxt-link to="/messageboard">留言板</nuxt-link>
            <nuxt-link to="/article/faq">常见问题 FAQ</nuxt-link>
            <ax>用户手册</ax>
          </div>
          <div class="col">
            <h2>Seati 系列站点 &raquo;</h2>
            <ax href="https://wiki.seati.cc">Seati Wiki</ax>
            <ax href="https://seati.cc">官网</ax>
            <ax href="https://moment.seati.cc">Moment 图库</ax>
            <ax>API 文档</ax>
          </div>
          <div class="col">
            <h2>模组生态 &raquo;</h2>
            <ax href="https://www.mcmod.cn">MCMOD 百科</ax>
            <ax href="https://www.curseforge.com/">CurseForge</ax>
            <ax href="https://modrinth.com/">Modrinth</ax>
          </div>
          <div class="col">
            <h2>Lab 发展 &raquo;</h2>
            <ax href="https://t.me/seati_lab" target="_blank">Telegram 频道</ax>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import LogoSvg from '~/assets/icons/seati/seati-white.svg?component';
import Ax from "~/components/ax.vue";
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
  gap: 10rem;

  > .col {
    width: 30%;
  }

  .links {
    width: 70%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;

    .col {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;

      h2 {
        font-size: 16px;
        margin: 0 32px 0 0;
      }

      a {
        color: white;
        opacity: .6;
        font-size: 14px;
        transition: all .2s ease;

        &:hover {
          opacity: 1;
          text-decoration: none;
        }

        &:not(:last-of-type):after {
          content: '·';
          margin: 0 8px;
          opacity: .4;
        }
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