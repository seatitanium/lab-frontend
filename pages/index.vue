<template>
  <div class="page-index container">
    <div class="index-title">
      <h1>欢迎，{{ user.nickname || user.username }}</h1>
      <p>选择下列功能之一，单击以跳转到相关页面以进行操作。这些功能在不断的更新中。</p>
    </div>
    <div class="index-functions">
      <card v-for="x in indexFunctions" @click="handleSiteFunctionClick(x)">
        <card-title>{{ x.title }}</card-title>
        <card-content>
          <p>{{ x.description }}</p>
        </card-content>
        <card-bg-icon>
          <icon :path="x.icon"/>
        </card-bg-icon>
        <card-right-top>
          v{{ x.version }}
        </card-right-top>
      </card>
    </div>
    <div class="index-term-description">
    </div>
    <div class="index-term-information">
      <card>
        <card-right-top>
          <div class="badges">
            <div class="badge preset--forge">Forge</div>
            <div class="badge preset--online">正版验证
              <icon :path="mdiCheck"/>
            </div>
            <div class="badge preset--mcje">
              <DukeWaving/>
              Java 版
            </div>
          </div>
        </card-right-top>
        <card-title>当前周目</card-title>
        <card-content>
          <div class="term-title">
            <div class="term-name">
              <img src="~/assets/images/term-logo.png"/>
              <div class="right">
                <div class="main">All the Mods 9 <small>ATM9</small></div>
                <div class="sub">整合包 / 2022 / ATMTeam</div>
              </div>
            </div>
          </div>
          <h2>简介</h2>
          <div class="term-description">
            <p>ATM9 has over 400 mods and countless quests and a built in proper endgame. Can you craft the ATM Star? Do
              you dare take on the Gregstar?</p>
            <p>All the Mods started out as a private pack for just a few friends of mine that turned into something
              others wanted to play! It has all the basics that most other "big name" packs include but with a nice mix
              of some of newer or lesser-known mods as well.
            </p>
            <p>In All the Mods 9 we will continue the tradition adding many new mods while going for more stability.</p>
            <p> Does "All the Mods" really contain ALL THE MODS? No, of course not.</p>
          </div>
          <h2>版本与配置</h2>
          <div class="term-versions">
            <div class="term-version">
              <div class="icon">
                <MCJELogoFull/>
              </div>
              <div class="number">
                1.20.1
              </div>
            </div>
            <div class="term-version">
              <div class="icon">
                <ForgeLogoFull/>
              </div>
              <div class="number">
                40.0.12
              </div>
            </div>
            <div class="term-version">
              <div class="icon" style="transform: translateY(-10px)">
                <JavaLogoHorizontal/>
              </div>
              <div class="number">
                21
              </div>
            </div>
          </div>

          <div class="term-conditions">
            <div class="condition" v-for="x in [WindowsPCRecommendedSetupList, WindowsLaptopRecommendedSetupList, MacAppleSiliconRecommendedSetupList]">
              <div class="title">{{ x.title }}</div>
              <div class="row">
                <div class="col1">
                  <div class="col1-row">
                    <icon :path="mdiMemory"/>
                    分配 RAM
                  </div>
                  <div class="col1-row">
                    <icon :path="mdiCubeOutline"/>
                    CPU
                  </div>
                  <div class="col1-row">
                    <icon :path="mdiMonitor"/>
                    光影显示卡
                  </div>
                  <div class="col1-row">
                    <icon :path="x.title.includes('Mac') ? mdiApple : mdiMicrosoft"/>
                    操作系统
                  </div>
                </div>
                <div class="col2">
                  <div class="col2-row">
                    {{ x.items.memory }} GiB
                  </div>
                  <div class="col2-row">
                    {{ x.items.cpu }}
                  </div>
                  <div class="col2-row">
                    {{ x.items.gpu || 'N/A'}}
                  </div>
                  <div class="col2-row">
                    {{ x.items.system || 'N/A'}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </card-content>
      </card>
    </div>
  </div>
  <modal v-model="someProblemModal" :allow-esc="false" class="with-bg--blurred with-bg--darken">
    <modal-title>
      出现了一些问题
    </modal-title>
    <modal-content>
      <p>
        在获取关键信息的时候出现了一些问题，导致页面无法正常运作。
      </p>
      <p>
        单击「<strong>重试</strong>」立即刷新页面。
      </p>
      <p>
        如果问题仍然存在，单击「<strong>错误信息</strong>」按钮查看内部错误信息，然后单击弹出的信息复制，将其传达给维护者以得到支持。
      </p>
    </modal-content>
    <modal-actions class="right">
      <btn class="without-bg--primary hover--dim" @click="errorInformationPopup = true">错误信息</btn>
      <btn class="with-bg--primary hover--dim" @click="$router.go(0)">重试</btn>
    </modal-actions>
  </modal>
  <anywhere-popup v-model="errorInformationPopup" :content="errorInformationContent"/>
</template>

<script lang="ts" setup>
import getUsername from "~/utils/getUsername";
import {BackendCodes} from "~/consts";
import type {Ref} from "vue";
import {
  mdiAbacus, mdiApple,
  mdiBook,
  mdiCheck,
  mdiCpu64Bit,
  mdiCubeOutline,
  mdiMemory, mdiMicrosoft,
  mdiMicrosoftWindows,
  mdiMonitor,
  mdiServer
} from "@mdi/js";
import ForgeLogoFull from '~/assets/icons/forge-logo-full.svg'
import MCJELogoFull from '~/assets/icons/mcje-full.svg'
import DukeWaving from '~/assets/icons/duke-waving.svg'
import JavaLogoHorizontal from '~/assets/icons/java-horizontal.svg'

interface SiteFunction {
  title: string,
  description: string,
  icon: string,
  model?: Ref<boolean>,
  href?: string,
  version: string
}

interface RecommendedSetupList {
  title: string,
  items: {
    memory: string | number,
    cpu: string,
    gpu?: string,
    system?: string
  }
}

let user = reactive<User>({
  id: 0,
  username: '',
  nickname: '',
  email: '',
  mcid: '',
  createdAt: 0,
  updatedAt: 0
});

const WindowsPCRecommendedSetupList: RecommendedSetupList = {
  title: 'Windows 台式机',
  items: {
    memory: 8,
    cpu: '近三年，中配',
    system: '10, 11',
    gpu: 'GTX 1060'
  }
}

const WindowsLaptopRecommendedSetupList: RecommendedSetupList = {
  title: 'Windows 笔记本',
  items: {
    memory: 8,
    cpu: '近三年，中配',
    system: '10, 11',
    gpu: 'GTX 1070 Laptop'
  }
}

const MacAppleSiliconRecommendedSetupList: RecommendedSetupList = {
  title: 'Mac (Apple Silicon)',
  items: {
    memory: 8,
    cpu: 'Apple M1 Pro',
    system: '13, 14',
    gpu: 'Apple M3 Max'
  }
}

const indexFunctions: SiteFunction[] = [
  {
    title: '服务器',
    description: '查看服务器状态与玩家在线情况，管理服务器的启停。此外还可探索在线聊天等更多功能。',
    icon: mdiServer,
    href: '/instance',
    version: '0.1.0'
  },
  {
    title: '财务',
    description: '查看 Seati 公开的财务信息以及服务器、OSS 等阿里云服务的消费状况',
    icon: mdiAbacus,
    href: '/bill',
    version: '0.1.0'
  },
  {
    title: '文档',
    description: '更进一步了解 Lab 平台用法以及周围 API 注解，推荐有一定理解力与技术力的用户参考',
    icon: mdiBook,
    href: '/doc',
    version: '0.1.0'
  }
]

function handleSiteFunctionClick(func: SiteFunction) {
  if (func.href) location.href = func.href;
  else if (func.model) func.model.value = !func.model.value
}

const username = getUsername();
const someProblemModal = ref(false);
const errorInformationPopup = ref(false);
const errorInformationContent = ref('');

async function initUser() {
  const userResult = await get<UserResp>(`/api/user/profile/${username.value}`);
  if (userResult.code !== BackendCodes.OK) {
    someProblemModal.value = true;
    errorInformationContent.value = JSON.stringify(userResult);
  } else {
    Object.assign(user, userResult.data)
  }
}

onMounted(() => {
  initUser();
})
</script>

<style lang="less" scoped>
.term-title {

  display: flex;
  flex-direction: column;
  gap: 16px;

  .term-name {
    display: flex;
    gap: 16px;
    align-items: center;

    > img {
      object-fit: fill;
      width: 80px;
      height: 80px;
      border-radius: 10px;
    }

    .right {
      .main {
        font-size: 40px;
        font-weight: bold;

        small {
          font-size: 25px;
          font-weight: 500;
        }
      }

      .sub {
        font-size: 20px;
      }
    }
  }
}

.index-term-information {
  .badges {
    display: flex;
    align-items: center;
    gap: 16px;

    .badge {
      border-radius: 10px;
      padding: 5px 10px;
      display: inline-flex;
      align-items: center;
      gap: 4px;

      svg {
        height: 20px;
      }

      &.preset--forge {
        background: #1e2d41;
        color: white;
      }

      &.preset--online {
        background: #e8f5e9;
        color: #4caf50;
      }

      &.preset--mcje {
        gap: 8px;
        border: 1px solid rgba(0, 0, 0, .2);
      }
    }
  }
}

.term-versions {
  display: flex;
  align-items: stretch;
  gap: 30px;

  .term-version {
    width: 33.33%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 100px;

    .number {
      font-size: 30px;
      text-align: center;
      border: 1.5px solid rgba(0, 0, 0, .1);
      padding: 10px;
      line-height: 1;
      border-radius: 10px;
    }

    .icon {
      height: 80%;
      text-align: center;

      svg {
        height: 100%;
        width: 80%;
      }
    }
  }
}

.term-conditions {
  display: flex;
  align-items: center;
  gap: 30px;

  .condition {
    width: 33.33%;
    border: 1px solid rgba(0, 0, 0, .2);
    padding: 16px;
    border-radius: 10px;

    .title {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 16px;
    }

    .row {
      display: flex;
      align-items: flex-start;
      gap: 32px;

      .col1 .col1-row, .col2 .col2-row {
        height: 30px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .col1 .col1-row {
        font-weight: bold;
      }
    }
  }
}
</style>

<style lang="less" scoped>
.index-title {
  padding: 32px 0;

  h1 {
    font-size: 40px;
  }

  p {
    font-size: 20px;
    margin: 8px 0;
  }
}

.index-functions {
  display: flex;
  align-items: stretch;
  gap: 16px;

  > * {
    cursor: pointer;
    width: 33.33%;
  }
}
</style>