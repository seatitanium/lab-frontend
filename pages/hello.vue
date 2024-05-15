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

          <card @mouseenter="stateMianfeiScreen = true" @mouseleave="stateMianfeiScreen = false" style="grid-area: c"
                class="with-bg--blue">
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

          <card @mouseenter="stateBianjieScreen = true" @mouseleave="stateBianjieScreen = false" style="grid-area: d" class="with-bg--green">
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
    <screen-content flex-vertical flex-center>
      <div class="home-screen-text">
        <img :src="kaifangScreenCurrentTextImage" alt="kaifang"/>
        <img :class="{emphasis: kaifangScreenCurrentTextEmphasis}" v-if="kaifangScreenCurrentTextEmphasis"
             :src="kaifangScreenCurrentTextImage" alt="kaifang-emphasis"/>
      </div>
      <typewriter v-if="kaifangScreenDescription" class="typewriter--no-cursor" :type-interval="10">
        <p>我们不仅开放了<strong>大多数 API</strong>，还编写了<strong>相关文档</strong>。网站的可个性化程度也在不断提高。
        </p>
        <p>在保证 Seati <strong>公平、安全</strong>运行的前提下的<strong>大部分</strong>权限，也都被分配到了玩家手中。</p>
        <p>除此之外，我们愿意广泛收集<strong>所有人</strong>——不仅是玩家，更可能是同好，甚至是路人——的建议，来让 Seati 变得更好。
        </p>
      </typewriter>
    </screen-content>
    <div class="bg-kaifang">
      <open-bg ref="kaifangScreenBackgroundSvg"/>
    </div>
  </screen>
  <screen id="mianfei-screen" class="with-bg--darken" v-model="stateMianfeiScreen">
    <screen-content flex-vertical flex-center>
      <div class="home-screen-text">
        <img :src="getImageURL('mianfei', 4)" alt="mianfei"/>
      </div>
      <typewriter class="typewriter--no-cursor" :type-interval="10">
        <p>无论是 Lab 还是 Seati 均为免费性质，这是一个<strong>不以盈利为目的的业余兴趣项目</strong>。</p>
        <p>当然，我们仍然接受自愿的捐助，这一过程将保持<strong>公开透明</strong>，我们会专门<strong>编写页面</strong>记录这方面的内容。</p>
      </typewriter>
    </screen-content>
    <div class="bg-mianfei">
      <icon :path="mdiCurrencyUsdOff"/>
    </div>
  </screen>
  <screen id="bianjie-screen" class="with-bg--darken" v-model="stateBianjieScreen">
    <screen-content flex-vertical flex-center>
      <div class="home-screen-text">
        <img :src="getImageURL('bianjie', 4)" alt="bianjie"/>
      </div>
      <typewriter class="typewriter--no-cursor" :type-interval="10">
        <p>Lab 的设计标准倾向于将<strong>没必要的繁杂隐去</strong>、<strong>有必要的繁杂放在幕后</strong>，而将最为有效且直观的内容放在眼前<strong>触手可及</strong>的位置。</p>
        <p>我们希望<strong>无论哪种</strong>计算机水平的玩家都能够轻松愉悦、无障碍地使用 Lab，理解 Lab 与 Seati 服务器的紧密联系。</p>
      </typewriter>
    </screen-content>
    <div class="bg-bianjie">
      <icon :path="mdiCursorDefaultGestureOutline"/>
    </div>
  </screen>
</template>

<script setup lang="ts">
import {mdiCreationOutline, mdiCurrencyUsdOff, mdiCursorDefaultGestureOutline, mdiLaunch} from "@mdi/js";
import CardContent from "~/components/card-content.vue";
import CardBgText from "~/components/card-bg-text.vue";
import LoginModal from "~/components/login-modal.vue";
import anime from "animejs";
import OpenBg from '~/assets/images/hello/open.svg?component';
import typewriter from "typewriter-vue/src/components/Typewriter.vue";

const stateLoginModal = ref(false);
const stateKaifangScreen = ref(false);
const stateMianfeiScreen = ref(false);
const stateBianjieScreen = ref(false);
const kaifangScreenCurrentTextImage = ref('');
const kaifangScreenCurrentTextEmphasis = ref(false);
const kaifangScreenDescription = ref(false);
const kaifangScreenBackgroundSvg = ref(null);

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
    if (kaifangScreenBackgroundSvg.value !== null) {
      anime({
        // @ts-ignore
        targets: kaifangScreenBackgroundSvg.value.$el,
        opacity: [0, 1],
        easing: 'linear',
        duration: 100
      })
      anime({
        // @ts-ignore
        targets: kaifangScreenBackgroundSvg.value.$el.querySelectorAll('path'),
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInCirc',
        duration: 1500,
        delay: 500
      })
    }
    await sleep(1500);
    kaifangScreenDescription.value = true;
  } else {
    kaifangScreenCurrentTextEmphasis.value = false;
  }
})
</script>

<style lang="less" scoped>
@import "@/assets/var.less";

#mianfei-screen, #kaifang-screen, #bianjie-screen {
  font-size: 32px;
  line-height: 1.5;
  color: #bbb;

  strong {
    color: @primaryl;
  }
}

.bg-mianfei, .bg-bianjie {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 320;
  white-space: nowrap;
  display: flex;

  svg {
    width: 100vw;
    height: 100vh;
    transform: skew(-6deg);
    color: rgba(@primaryl, .1);
  }
}

.bg-kaifang svg {
  opacity: 0;
  fill: transparent;
  height: 100vh;
  position: absolute;
  stroke: rgba(@primaryl, .07);
  stroke-width: 1px;
  top: 50%;
  transform: translateY(-50%) translateX(50%);
  right: 50%;
}
</style>

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