<template>
  <div class="page-about container">
    <div class="about-banner" :style="{
      backgroundImage: `url(${background})`
    }">
      <div class="logo-text">TiLab</div>
    </div>
    <section class="section__powered_by">
      <h2>Powered by</h2>
      <div class="techstacks">
        <div class="stack">
          <GinLogo/>
          <h3>Gin Web Framework</h3>
          <a href="https://github.com/gin-gonic/gin" target="_blank">访问仓库
            <icon :path="mdiLaunch"/>
          </a>
        </div>
        <div class="stack">
          <NuxtLogo/>
          <h3>Nuxt 3</h3>
          <a href="https://nuxt.com" target="_blank">访问网站
            <icon :path="mdiLaunch"/>
          </a>
        </div>
        <div class="stack">
          <VueLogo/>
          <h3>Vue 3</h3>
          <a href="https://vuejs.org" target="_blank">访问网站
            <icon :path="mdiLaunch"/>
          </a>
        </div>
        <div class="stack">
          <GitHubLogo/>
          <h3>GitHub Actions</h3>
          <a href="https://github.com" target="_blank">访问网站
            <icon :path="mdiLaunch"/>
          </a>
        </div>
      </div>
    </section>

    <section class="section__developers">
      <h2>Credits</h2>
      <p>Subilan <small>前端 后端</small></p>
      <p>WindSpiritSR <small>后端</small></p>
      <small>欢迎有兴趣的朋友一同参与维护 / Any contribution is welcome and appreciated<br/>
        <a target="_blank" href="https://github.com/seatitanium/lab-frontend">repo-frontend</a> · <a target="_blank" href="https://github.com/seatitanium/lab-backend">repo-backend</a></small>
    </section>

    <section class="section__design">
      <h2>Design Keystone</h2>
      <div class="techstacks">
        <div class="stack">
          <PictogrammersLogo/>
          <h3>Material Design Icons</h3>
          <a href="https://pictogrammers.com/library/mdi/" target="_blank">访问仓库<icon :path="mdiLaunch"/></a>
        </div>
        <div class="stack">
          <img src="~/assets/images/about/recursive-repo-artwork.png"/>
          <h3>Recursive by ArrowType</h3>
          <a href="https://recursive.design" target="_blank">访问 recursive.design<icon :path="mdiFormatFont"/></a>
        </div>
        <div class="stack">
          <img src="~/assets/images/about/material-design-palette.png"/>
          <h3>Material Design Palette</h3>
          <a href="https://chromewebstore.google.com/detail/simple-material-design-pa/onaeadclbaeleijcfmmhopgmmmpedifa?pli=1" target="_blank">在 chrome 应用商店中打开<icon :path="mdiLaunch"/></a>
        </div>
      </div>
    </section>

    <section class="section__donators">
      <h2>Kind Donators</h2>
      <div class="donations" v-if="donations.length > 0">
        <div class="donation" v-for="x in donations">
          <span class="money"><span class="symbol">¥</span><counter :value="x.amount"/></span>
          <div class="spacer"/>
          <span class="from">from</span>
          <span class="name">{{ x.name }}</span>
        </div>
      </div>
      <p v-else>Loading donations...</p>
      <small>排名不分先后 / Not listed in order<br/>Data since 2022</small>
      <div class="total">
        <span class="money">
          <span class="symbol">¥</span><counter :value="donations.map(x => x.amount).reduce((a, b) => a + b, 0)"/>
        </span>
        <div class="spacer"/>
        <span class="total-text">Total</span>
      </div>
      <div class="donate-links">
        <a><span>捐助 Seati 服务器</span><icon :path="mdiCurrencyUsd"/></a>
        <a><span>关于捐助</span></a>
        <a><span>退款</span></a>
      </div>
    </section>

    <section class="section__special_thanks">
      <h2>Special Thanks to</h2>
      <p>所有的捐助者<small>（名单见 Kind Donator 一节）</small></p>
      <p>123JK 提供优美的过往周目内摄影作品</p>
      <p>所有忠实的玩家们</p>
    </section>

    <section class="section__copyright">
      <h2>Copyright</h2>
      <p>Gin-Gonic Framework Logo by <a href="https://github.com/javierprovecho" target="_blank">Javier Provecho</a> is licensed under a <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Creative Commons Attribution 4.0 International License</a>. The Go gopher eyes were designed by <a href="https://reneefrench.blogspot.com/" target="_blank">Renee French</a>.</p>
      <p>Recursive Font: Copyright 2020 The Recursive Project Authors (<a href="https://github.com/arrowtype/recursive">https://github.com/arrowtype/recursive</a>)<br/>This Font Software is licensed under the SIL Open Font License, Version 1.1.</p>
      <p>This site is open-source with its code stored in two public GitHub repositories under <a href="https://github.com/seatitanium" target="_blank">seatitanium</a>. The original source code of this project is licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Creative Commons Attribution 4.0 International License</a>. </p>
    </section>

    <section class="section__contact">
      <h2>Contact Us</h2>
      <p>如在使用过程中有任何问题，或者对页面或功能有建议，欢迎发信至 <a href="mailto:i@seati.cc">i@seati.cc</a></p>
      <p>If you encounter any issues or have suggestions for the design or functionality, please contact us at <a href="mailto:i@seati.cc">i@seati.cc</a>. </p>
    </section>
  </div>
</template>

<script lang="ts" setup>
import Image1 from '~/assets/images/about/2023-07-20_01.06.06.jpg';
import Image2 from '~/assets/images/about/2023-07-20_01.07.46.jpg';
import Image3 from '~/assets/images/about/2023-07-20_01.08.34.jpg';
import Image4 from '~/assets/images/about/2023-07-20_01.11.00.jpg';
import Image5 from '~/assets/images/about/2023-07-20_01.23.30.jpg';
import Image6 from '~/assets/images/about/2023-07-20_01.24.08.jpg';
import GinLogo from '~/assets/icons/gin.svg';
import NuxtLogo from '~/assets/icons/nuxt-green-black.svg';
import VueLogo from '~/assets/icons/vue.svg';
import GitHubLogo from '~/assets/icons/github-mark.svg';
import PictogrammersLogo from '~/assets/icons/pictogrammers-full.svg';
import {mdiCurrencyUsd, mdiFormatFont, mdiLaunch} from "@mdi/js";

const candidateImages = [Image1, Image2, Image3, Image4, Image5, Image6];

const background = ref('');

background.value = candidateImages[Math.floor(Math.random() * candidateImages.length)]

const donations = ref<Donation[]>([]);

async function getDonations() {
  const donationResult  = await get(`/donations`);

  donations.value = donationResult as unknown as Donation[];
}

onMounted(() => {
  getDonations();
})
</script>

<style lang="less" scoped>
@import "@/assets/var.less";

.container {
  padding: 32px 0;
}

.about-banner {
  padding: 70px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 20px;
  .common-shadow;

  .logo-text {
    font-size: 92px;
    color: white;
    margin: 0;
    line-height: 1;
    text-shadow: 0 4px 5px rgba(0, 0, 0, .4);
    .logo-variation;
  }
}

section {
  margin: 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h2 {
    color: @primaryd;
    .logo-variation;
    font-size: 32px;
    margin-bottom: 16px;
  }

  small {
    margin: 8px 0;
  }
}

.section__developers {
  gap: 16px;

  p {
    margin: 0;
    font-size: 22px;
  }
}

.section__powered_by {
  gap: 32px;
}

.techstacks {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 64px;
  flex-wrap: wrap;

  .stack {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    > svg {
      height: 120px;
      max-width: 250px;
      margin-bottom: 16px;
    }

    > img {
      height: 120px;
      margin-bottom: 16px;
    }

    h3 {
      font-size: 24px;
    }

    p, h3 {
      margin: 0;
    }
  }
}

.section__copyright {
  p {
    width: 70%;
    line-height: 1.8;
  }
}

.section__donators {
  .spacer {
    flex: 1;
  }

  .donations, .total {
    width: 40vw;
  }

  .donations {
    font-size: 22px;
    margin-bottom: 16px;

    .donation {
      display: flex;
      align-items: baseline;
      gap: 8px;

      .from {
        font-variation-settings: 'slnt' -8;
      }

      .name {
        color: @primaryd;
        font-weight: bold;
      }
    }
  }

  .money {
    font-variation-settings: 'CASL' 1, 'slnt' -8, 'wght' 700;
    font-size: 33px;

    .symbol {
      font-variation-settings: 'CASL' 0, 'MONO' 1;
      font-size: 20px;
    }
  }

  .total {
    border-top: 1px solid black;
    padding-top: 16px;
    margin-top: 16px;
    display: flex;
    align-items: center;

    .total-text {
      font-variation-settings: 'CASL' 1, 'slnt' -5, 'wght' 700;
      font-size: 48px;
    }

    .money {
      .symbol {
        font-size: 28px;
      }

      font-size: 48px;
    }
  }
}

.donate-links {
  margin-top: 16px;
  display: flex;
  align-items: center;

  a:not(:last-child) {
    &::after {
      content: "·";
      display: inline-block;
      margin: 0 8px;
    }
  }

  a:hover {
    text-decoration: none;
  }

  a:hover span {
    text-decoration: underline;
  }
}

small {
  line-height: 1.8;
}
</style>