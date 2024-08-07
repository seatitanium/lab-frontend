<template>
  <div class="container">
    <div class="hello-card">
      <div class="top">
        <div class="primary textaligncenter">
          <h1>
            👋 欢迎来到 <em>TiLab</em>！
          </h1>
          <p>一站式服务器信息获取与控制平台</p>
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
          <img class="card1Animation main-image" ref="card1" style="grid-area: a"
               src="@/assets/images/2023-07-20_01.06.06.jpg"/>
          <card ref="card2" @mouseenter="stateKaifangScreen = true"
                @mouseleave="stateKaifangScreen = false"
                style="grid-area: b"
                class="card2Animation with-bg--primary">
            <card-title>开放</card-title>
            <card-content>
              <p>Lab 是一个开放的平台，所有注册玩家都可以对服务器进行操作。</p>
              <p>无论是有关新功能新设计的好点子💡还是针对现状的改进建议，随时欢迎你的提出。</p>
            </card-content>
            <card-bg-text class="--extraEnlarged --classicFont">
              Open
            </card-bg-text>
          </card>

          <card ref="card3" @mouseenter="stateMianfeiScreen = true"
                @mouseleave="stateMianfeiScreen = false"
                style="grid-area: c"
                class="card3Animation with-bg--blue">
            <card-title>
              免费
            </card-title>
            <card-content>
              <p>Lab 免费开放给所有玩家使用。Seati 是公益服务器，也不会有任何形式的游戏内收费项目。</p>
            </card-content>
            <card-bg-icon class="--centralSkewed">
              <icon :path="mdiCurrencyUsdOff"/>
            </card-bg-icon>
          </card>

          <card ref="card4" @mouseenter="stateBianjieScreen = true"
                @mouseleave="stateBianjieScreen = false"
                style="grid-area: d" class="card4Animation with-bg--green">
            <card-title>便捷</card-title>
            <card-content>
              <p>我们借助互联网技术，为玩家提供一个便捷的平台。随时随地只要有可以上网的电脑，便可以与服务器互动。</p>
              <p>除此之外，不断优化的 UI 设计将帮助玩家更无障碍地使用平台。</p>
            </card-content>
            <card-bg-icon class="--enlarged">
              <icon :path="mdiCursorDefaultGestureOutline"/>
            </card-bg-icon>
          </card>
        </div>
      </section>
    </div>
  </div>
  <login-modal allow-close/>
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
        <p>我们愿意广泛收集建议，让 Seati 变得更好。
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
        <p>无论是 Lab 还是 Seati 均为免费性质，这是一个<strong>不以盈利为目的的兴趣项目</strong>。</p>
        <p>我们仍然接受自愿的捐助，这一过程将保持<strong>公开透明</strong>。
        </p>
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
        <p>Lab 的设计标准倾向于将<strong>没必要的繁杂隐去</strong>，而将最为有效的内容直观地放在眼前<strong>触手可及</strong>的位置。
        </p>
        <p>我们希望<strong>任何</strong>玩家都能够轻松愉悦、无障碍地使用 Lab。
        </p>
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
import typewriter from 'typewriter-vue/src/components/Typewriter.vue';
import {definePageMeta} from "#imports";

const stateLoginModal = useState('login-modal');
const stateKaifangScreen = ref(false);
const stateMianfeiScreen = ref(false);
const stateBianjieScreen = ref(false);
const kaifangScreenCurrentTextImage = ref('');
const kaifangScreenCurrentTextEmphasis = ref(false);
const kaifangScreenDescription = ref(false);
const kaifangScreenBackgroundSvg = ref(null);

const [card1, card2, card3, card4] = [ref(null), ref(null), ref(null), ref(null)];

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

definePageMeta({
  title: '欢迎'
})
</script>

<style lang="less" scoped>
.main-image {
  box-shadow: 0 1.5px 3px rgba(0, 0, 0, .3);
}

@keyframes Card1 {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes Card2 {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes Card3 {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes Card4 {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

[class*="Animation"] {
  animation-fill-mode: forwards;
  animation-play-state: running
}

@cardAnimationDuration: .7s;
@cardAnimationFunction: cubic-bezier(.61, 0, .32, 1.04);

.card1Animation {
  animation: Card1 @cardAnimationDuration @cardAnimationFunction;
}

.card2Animation {
  animation: Card2 @cardAnimationDuration @cardAnimationFunction;
}

.card3Animation {
  animation: Card3 @cardAnimationDuration @cardAnimationFunction;
}

.card4Animation {
  animation: Card4 @cardAnimationDuration @cardAnimationFunction;
}
</style>

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
  margin-bottom: 32px;

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
        font-variation-settings: 'CASL' 1, 'slnt' -10;
        font-style: normal;
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
    grid-template-areas: "a a b" "c d d";
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;

    > img:not([class*="Animation"]), > .card:not([class*="Animation"]) {
      opacity: 0;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
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