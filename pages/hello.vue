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
          <btn @click="stateLoginModal = true" class="with-bg--primary hover--dropShadow">立即体验
            <icon :path="mdiCreationOutline"/>
          </btn>
          <btn class="without-bg--primary hover--dim" href="https://seati.cc">了解 Seati
            <icon :path="mdiLaunch"/>
          </btn>
        </div>
      </div>

      <section class="section__here_you_can">
        <div class="card-grid">
          <img style="grid-area: a" src="@/assets/images/2023-07-20_01.06.06.jpg"/>
          <card @mouseenter="stateKaifangScreen = true" @mouseleave="stateKaifangScreen = false" style="grid-area: b"
                class="with-bg--primary">
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
  <login-modal v-model="stateLoginModal"/>
  <screen id="kaifang-screen" class="with-bg--darken" v-model="stateKaifangScreen">
    <div class="home-screen-text">
      <img :src="kaifangScreenCurrentTextImage" alt="kaifang"/>
      <img :class="{emphasis: kaifangScreenCurrentTextEmphasis}" v-if="kaifangScreenCurrentTextEmphasis"
           :src="kaifangScreenCurrentTextImage" alt="kaifang-emphasis"/>
    </div>
  </screen>
</template>

<script setup lang="ts">
import {mdiCreationOutline, mdiCurrencyUsdOff, mdiCursorDefaultGestureOutline, mdiLaunch} from "@mdi/js";
import CardContent from "~/components/card-content.vue";
import CardBgText from "~/components/card-bg-text.vue";
import LoginModal from "~/components/login-modal.vue";
import anime from "animejs";

const stateLoginModal = ref(false);
const stateKaifangScreen = ref(false);
const stateMianfeiScreen = ref(false);
const stateBianjieScreen = ref(false);
const kaifangScreenCurrentTextImage = ref('');
const kaifangScreenCurrentTextEmphasis = ref(false);

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function switchState(target: boolean[], pos1: number, pos2: number) {
  target[pos1] = false;
  target[pos2] = true;
}

function* genPic(type: string, maximum = 4) {
  for (let i of Array(maximum).keys()) {
    yield getImageURL(type, i + 1);
  }
}

function getImageURL(type: string, index: number) {
  return new URL(`../assets/images/hello/${type}/${index}.svg`, import.meta.url).href;
}

watch(stateKaifangScreen, async v => {
  if (v) {
    const gen = genPic('kaifang');
    kaifangScreenCurrentTextImage.value = gen.next().value || '';
    await sleep(70);
    kaifangScreenCurrentTextImage.value = gen.next().value || '';
    await sleep(70);
    kaifangScreenCurrentTextImage.value = gen.next().value || '';
    await sleep(70);
    kaifangScreenCurrentTextImage.value = gen.next().value || '';
    kaifangScreenCurrentTextEmphasis.value = true;
  }
})

watch(kaifangScreenCurrentTextImage, v => console.log(v))
</script>

<style lang="less" scoped>
@keyframes EmphasisScale {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

.home-screen-text {
  max-width: 300px;
  position: relative;

  img {
    width: 100%;

    &.emphasis {
      position: absolute;
      left: 0;
      top: 0;
      transform: translateX(50%) translateY(50%);
      animation: EmphasisScale .6s ease;
      animation-delay: .3s;
      opacity: 0;
      animation-fill-mode: forwards;
    }
  }
}

.hello-card {
  .primary {
    h1 {
      font-size: 60px;

      em {
        font-variation-settings: 'CASL' 1, 'slnt' -15;
      }
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