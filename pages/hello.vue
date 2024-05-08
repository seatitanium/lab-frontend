<template>
  <div class="container">
    <div class="hello-card">
      <div class="top">
        <div class="primary textaligncenter">
          <h1>
            👋 欢迎来到 <em>TiLab</em>！
          </h1>
          <p>Seati 为玩家搭建的一站式服务器信息获取与控制平台</p>
        </div>

        <div class="apply">
          <btn class="with-bg--primary">立即体验
            <icon :path="mdiCreationOutline"/>
          </btn>
          <btn class="without-bg--primary" href="https://seati.cc">了解 Seati
            <icon :path="mdiLaunch"/>
          </btn>
        </div>
      </div>

      <section class="section__here_you_can">
        <div class="card-grid">
          <img style="grid-area: a" src="@/assets/images/2023-07-20_01.06.06.jpg"/>
          <card style="grid-area: b" class="with-bg--primary">
            <card-title>开放</card-title>
            <card-content>
              <p>Lab 是一个开放的平台。所有注册过的玩家可以在这里零距离体验服务器的管理功能，尽情发挥主观能动性。</p>
              <p>随着游玩时间、信用等级的提升，你将能够操控服务器的更多功能。</p>
            </card-content>
            <card-bg-text class="--extraEnlarged --classicFont">
              Open
            </card-bg-text>
          </card>

          <card style="grid-area: c" class="with-bg--blue">
            <card-title>
              免费
            </card-title>
            <card-content>
              <p>免费的不仅是平台，更是游戏。Seati 运营成本=服主投入+玩家自愿捐助，简洁明了，没有其余收费项目。</p>
            </card-content>
            <card-bg-icon class="--centralSkewed">
              <icon :path="mdiCurrencyUsdOff"/>
            </card-bg-icon>
          </card>

          <card style="grid-area: d" class="with-bg--green">
            <card-title>便捷</card-title>
            <card-content>
              <p>简明而有力的用户界面与功能设计，使得任何具有基础能力的玩家得以迅速上手
                Lab，轻松获取到有用信息。</p>
              <p>经过优化的沉浸式用户体验，让任何操作都变得无比灵活敏捷。</p>
            </card-content>
            <card-bg-icon class="--enlarged">
              <icon :path="mdiCursorDefaultGestureOutline"/>
            </card-bg-icon>
          </card>
        </div>
      </section>
    </div>
  </div>
  <login-modal/>
</template>

<style lang="less" scoped>
.hello-card {
  .primary {
    h1 {
      font-size: 60px;
    }

    p {
      font-size: 24px;
    }
  }

  .apply {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 20px 0;
  }
}

.top {
  padding: 64px 0;
  width: 70%;
  margin: 0 auto;
}

section {
  margin: 32px 0;
}

.section__here_you_can {
  margin-top: 0;
  .card-grid {
    display: grid;
    grid-template: "a a b" "c d d";
    grid-gap: 20px;

    img {
      display: block;
      width: 100%;
      object-fit: cover;
      border-radius: 20px;
    }

    .card {
      padding: 40px;

      .card-content-container {
        font-size: 22px;
        line-height: 1.8;
      }
    }
  }
}
</style>

<script setup lang="ts">
import {mdiCreationOutline, mdiCurrencyUsdOff, mdiCursorDefaultGestureOutline, mdiLaunch} from "@mdi/js";
import CardContent from "~/components/card-content.vue";
import CardBgText from "~/components/card-bg-text.vue";
import LoginModal from "~/components/login-modal.vue";
</script>