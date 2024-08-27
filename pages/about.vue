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
        <a target="_blank" href="https://github.com/seatitanium/lab-frontend">repo-frontend</a> · <a target="_blank"
                                                                                                     href="https://github.com/seatitanium/lab-backend">repo-backend</a></small>
    </section>

    <section class="section__design">
      <h2>Design Keystone</h2>
      <div class="techstacks">
        <div class="stack">
          <PictogrammersLogo/>
          <h3>Material Design Icons</h3>
          <a href="https://pictogrammers.com/library/mdi/" target="_blank">访问仓库
            <icon :path="mdiLaunch"/>
          </a>
        </div>
        <div class="stack">
          <img src="~/assets/images/about/recursive-repo-artwork.png"/>
          <h3>Recursive by ArrowType</h3>
          <a href="https://recursive.design" target="_blank">访问 recursive.design
            <icon :path="mdiFormatFont"/>
          </a>
        </div>
        <div class="stack">
          <img src="~/assets/images/about/material-design-palette.png"/>
          <h3>Material Design Palette</h3>
          <a href="https://chromewebstore.google.com/detail/simple-material-design-pa/onaeadclbaeleijcfmmhopgmmmpedifa?pli=1"
             target="_blank">在 chrome 应用商店中打开
            <icon :path="mdiLaunch"/>
          </a>
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
        <a @click="donateModal = true"><span>捐助 Seati 服务器</span>
          <icon :path="mdiCurrencyUsd"/>
        </a>
        <a @click="aboutDonateModal = true"><span>关于捐助</span></a>
        <a @click="aboutRefundModal = true"><span>退款</span></a>
      </div>
    </section>

    <modal v-model="donateModal" class="with-bg--darken">
      <modal-title>捐助 Seati 服务器</modal-title>
      <modal-content>
        <p>Seati 的一切费用均由服主个人承担，但是仍然接受无偿捐助。</p>
        <p>你的捐助会以不区分先后顺序的方式写在<strong>关于</strong>页面的 Kind Donator 一节中，并标出你的捐助金额。</p>
        <p>进行捐助即代表你已经阅读并同意<a @click="donateModal = false; aboutRefundModal = true;">退款窗口</a>中的内容。
        </p>
        <p>选择支付方式查看相应的收款二维码（关联银行卡账户为代收）。</p>
        <div class="donate-methods">
          <div class="method" @click="alipayQRModal = true; donateModal = false;">
            <AlipayEn/>
            <span class="payment-name">支付宝</span>
            <div class="spacer"></div>
            <span class="checktext">查看收款二维码 &raquo;</span>
          </div>
          <div class="method" @click="wechatPayQRModal = true; donateModal = false;">
            <WechatPayEn/>
            <span class="payment-name">微信支付</span>
            <div class="spacer"></div>
            <span class="checktext">查看收款二维码 &raquo;</span>
          </div>
          <div class="method" @click="qqPayQRModal = true; donateModal = false;">
            <QQPay/>
            <span class="payment-name">QQ 支付</span>
            <div class="spacer"></div>
            <span class="checktext">查看收款二维码 &raquo;</span>
          </div>
        </div>
        <block class="with-bg--primary">
          <icon :path="mdiInformationOutline"/>
          请在付款备注中注明你的游戏名或者其它你希望在名单上显示的昵称。如果需要匿名也请备注。如无备注，将按照账户昵称录入。
        </block>
        <p>如果你不希望在付款记录中透露姓名，可以选择跳转至<a href="https://afdian.com/a/seatide" target="_blank">爱发电</a>进行捐助。由于该平台的限制，该页面可能显示「未认证创作者」，忽略即可。</p>
        <p>如果需要其它方式来捐助，欢迎联系 <a href="mailto:i@seati.cc">i@seati.cc</a> 并附上相关要求内容，一般
          24 小时内会得到回复。</p>
      </modal-content>
      <modal-actions class="right">
        <btn class="with-bg--white hover--dim" @click="donateModal = false">关闭</btn>
      </modal-actions>
    </modal>

    <modal v-model="alipayQRModal" class="with-bg--darken describe">
      <modal-content>
        <img class="qr" src="~/assets/images/alipay-qr.jpg"/>
      </modal-content>
      <modal-actions>
        <btn class="with-bg--primary hover--dim" @click="alipayQRModal = false; donateModal = true;">返回</btn>
      </modal-actions>
    </modal>

    <modal v-model="wechatPayQRModal" class="with-bg--darken describe">
      <modal-content>
        <img class="qr" src="~/assets/images/wechat-pay-qr.jpg"/>
      </modal-content>
      <modal-actions>
        <btn class="with-bg--primary hover--dim" @click="wechatPayQRModal = false; donateModal = true;">返回</btn>
      </modal-actions>
    </modal>

    <modal v-model="qqPayQRModal" class="with-bg--darken describe">
      <modal-content>
        <img class="qr" src="~/assets/images/qq-pay-qr.jpg"/>
      </modal-content>
      <modal-actions>
        <btn class="with-bg--primary hover--dim" @click="qqPayQRModal = false; donateModal = true;">返回</btn>
      </modal-actions>
    </modal>

    <modal v-model="aboutDonateModal" class="with-bg--darken describe">
      <modal-content>
        <icon color="#ff9800" :path="mdiCurrencyUsd"/>
        <h2>关于捐助</h2>
        <p>
          捐助是一种自愿的经济支持行为，其本身不以获得任何特权或者回报为目的，其意义亦不受金额大小的衡量。其本身是一种<strong>善行</strong>（kindness）。
        </p>
        <p>
          捐助可以帮助那些高投入低收入的产品持续运行，或者为它们争取更多的机会。这一切建立在捐助者具有相应经济能力的情况下。</p>
        <p>如果你是未成年人或家庭经济困难人士，请不要捐助。</p>
      </modal-content>
      <modal-actions class="right">
        <btn class="with-bg--white hover--dim" @click="aboutDonateModal = false">关闭</btn>
      </modal-actions>
    </modal>

    <modal v-model="aboutRefundModal" class="with-bg--darken">
      <modal-title>退款</modal-title>
      <modal-content>
        <p>符合以下任意一种情形的，可联系 <a href="mailto:i@seati.cc">i@seati.cc</a> 获取退款金额。</p>
        <ul>
          <li>捐助者为未成年的</li>
          <li>付款时间起 5x24h 以内的（小于 ¥10 的款项，时间缩短为 24h）</li>
          <li>特殊情况</li>
        </ul>
        <p>除了「特殊情况」外，如果资料提供充分，你大概率会在 24h
          内收到你的退款；对于特殊情况，将根据所给的理由以及提供的依据而断定是否给予退款。</p>
        <p>以下是需要提供的资料：</p>
        <ul>
          <li>需要退回款项的支付信息，务必包含支付时间和金额</li>
          <li>可用于识别捐助者的唯一名称，例如<strong>真实姓名</strong>（对于微信和支付宝）</li>
          <li>对于捐助者为未成年的，需要提供有说服力的证据 —— 例如身份证的照片（不重要的信息可打码）</li>
          <li>对于特殊情况的，需要提供具体的理由和相关证据</li>
        </ul>
        <p>
          此外，需要注意：对于未成年捐助者，我们有退回相关款项的义务，但也大概率会在款项退回后永久封禁相关玩家的账号来避免将来可能产生的误解或隐患。</p>
        <block class="with-bg--red">
          <icon :path="mdiAlertOutline"/>
          <span><strong>特别注意：</strong>如果你通过爱发电进行捐助，平台将在提现之时收取 6% 手续费，然而，在退款时，我们依然会按照原金额返还。为了保障双方的权益，在此规定<strong>任何通过爱发电的捐助者只有一次退款机会。</strong></span>
        </block>
      </modal-content>
      <modal-actions class="right">
        <btn class="with-bg--white hover--dim" @click="aboutRefundModal = false">关闭</btn>
      </modal-actions>
    </modal>

    <section class="section__special_thanks">
      <h2>Special Thanks to</h2>
      <p>所有的捐助者<small>（名单见 Kind Donator 一节）</small></p>
      <p>123JK 提供优美的过往周目内摄影作品</p>
      <p><a href="https://bottle.moe" target="_blank">SomeBottle</a> 的灵感启发</p>
      <p>所有忠实的玩家们</p>
    </section>

    <section class="section__copyright">
      <h2>Copyright</h2>
      <p>Gin-Gonic Framework Logo by <a href="https://github.com/javierprovecho" target="_blank">Javier Provecho</a> is
        licensed under a <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Creative Commons
          Attribution 4.0 International License</a>. The Go gopher eyes were designed by <a
            href="https://reneefrench.blogspot.com/" target="_blank">Renee French</a>.</p>
      <p>Recursive Font: Copyright 2020 The Recursive Project Authors (<a href="https://github.com/arrowtype/recursive">https://github.com/arrowtype/recursive</a>)<br/>This
        Font Software is licensed under the SIL Open Font License, Version 1.1.</p>
      <p>This site is open-source with its code stored in two public GitHub repositories under <a
          href="https://github.com/seatitanium" target="_blank">seatitanium</a>. The original source code of this
        project is licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Creative
          Commons Attribution 4.0 International License</a>. </p>
    </section>

    <section class="section__contact">
      <h2>Contact Us</h2>
      <p>如在使用过程中有任何问题，或者对页面或功能有建议，欢迎发信至 <a href="mailto:i@seati.cc">i@seati.cc</a></p>
      <p>If you encounter any issues or have suggestions for the design or functionality, please contact us at <a
          href="mailto:i@seati.cc">i@seati.cc</a>. </p>
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
import WechatPayEn from '~/assets/icons/wechat-pay-en.svg';
import AlipayEn from '~/assets/icons/alipay-en.svg';
import QQPay from '~/assets/icons/qq-pay.svg';
import {
  mdiAlertOutline,
  mdiCurrencyUsd,
  mdiFormatFont,
  mdiHelpCircleOutline,
  mdiInformationOutline,
  mdiLaunch
} from "@mdi/js";
import {definePageMeta} from "#imports";

const candidateImages = [Image1, Image2, Image3, Image4, Image5, Image6];

const background = ref('');

const donateModal = ref(false);
const aboutDonateModal = ref(false);
const aboutRefundModal = ref(false);
const alipayQRModal = ref(false);
const wechatPayQRModal = ref(false);
const qqPayQRModal = ref(false);

background.value = candidateImages[Math.floor(Math.random() * candidateImages.length)]

const donations = ref<Donation[]>([]);

async function getDonations() {
  const donationResult = await get(`/donations`);

  donations.value = donationResult as unknown as Donation[];
}

onMounted(() => {
  getDonations();
})

definePageMeta({
  title: '关于'
})
</script>

<style lang="less" scoped>
@import "@/assets/var.less";

img.qr {
  height: 500px;
}

.donate-methods {
  padding: 16px 0;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  gap: 16px;

  .method {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 10px;
    padding: 20px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: all .2s ease;

    .payment-name {
      font-size: 28px;

      &::before {
        content: '·';
        margin: 0 12px;
      }
    }

    .checktext {
      opacity: 0;
      transition: all .2s ease;
      transform: translateX(-10px);
      color: @primaryd;
    }

    &:hover .checktext {
      opacity: 1;
      transform: translateX(0);
    }

    &:hover {
      transform: translate(5px, -5px);
      box-shadow: -5px 5px 0 rgba(0, 0, 0, .1);
    }

    svg {
      height: 40px;
    }
  }
}

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