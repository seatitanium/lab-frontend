<template>
  <div class="page-index container">
    <div class="index-title">
      <h1>欢迎，{{ user.nickname || user.username }}</h1>
      <p>选择下列功能之一，单击以跳转到相关页面以进行操作。这些功能在不断的更新中。</p>
    </div>
    <section>
      <div class="index-functions">
        <card class="equalp" v-for="x in indexFunctions" @click="handleSiteFunctionClick(x)">
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
    </section>
    <section>
      <div class="index-term-information">
        <card class="equalp">
          <card-right-top>
            <div class="badges">
              <div class="badge preset--online" @click="descOnlineModal = true">正版验证
                <icon :path="mdiCheck"/>
              </div>
              <div class="badge preset--mcje" @click="descJavaModal = true">
                <DukeWaving/>
                Java 版
              </div>
            </div>
          </card-right-top>
          <card-content>
            <div class="left">
              <img src="~/assets/images/2023-07-20_01.08.34.jpg"/>
            </div>
            <div class="right">
              <div class="term-title">
                <div class="main">当前周目<img src="~/assets/images/terms/st13.png"/></div>
                <div class="sub">
                  <icon :path="mdiCardsPlaying"/>
                  进行中 · {{ termTimeDelta }}
                </div>
              </div>
              <div class="term-information">
                <ul>
                  <li>
                    <icon :path="mdiMinecraft"/>
                    Minecraft
                    <slim>Java 1.20.1</slim>
                  </li>
                  <li>
                    <icon :path="mdiAnvil"/>
                    Forge
                    <slim>24.9.2</slim>
                  </li>
                  <li>
                    <icon :path="mdiMemory"/>
                    分配内存
                    <slim>8GiB 或以上</slim>
                  </li>
                  <li>
                    <icon :path="mdiLanguageJava"/>
                    Java
                    <slim>21 或以上</slim>
                  </li>
                </ul>
              </div>
            </div>
          </card-content>
        </card>
      </div>
    </section>
    <section>
      <div class="index-pack-information">
        <card class="equalp">
          <card-right-top>
            <div class="badges">
              <div class="badge preset--forge" @click="descForgeModal = true">Forge</div>
            </div>
          </card-right-top>
          <card-content>
            <div class="pack-title">
              <div class="pack-name">
                <img class="pack-logo" src="../assets/images/pack-logo.png"/>
                <div class="right">
                  <div class="main">All the Mods 9 <small>ATM9</small></div>
                  <div class="sub">整合包 / 2022 / ATMTeam</div>
                </div>
              </div>
            </div>
            <div class="pack-description">
              <p>ATM9 has over 400 mods and countless quests and a built in proper endgame. Can you craft the ATM Star?
                Do
                you dare take on the Gregstar?</p>
              <p>All the Mods started out as a private pack for just a few friends of mine that turned into something
                others wanted to play! It has all the basics that most other "big name" packs include but with a nice
                mix
                of some of newer or lesser-known mods as well.
              </p>
              <p>In All the Mods 9 we will continue the tradition adding many new mods while going for more
                stability.</p>
              <p> Does "All the Mods" really contain ALL THE MODS? No, of course not.</p>
            </div>
          </card-content>
          <modal-actions style="position: absolute;bottom: 32px; right: 32px;" class="nopadding absolute">
            <btn class="without-bg--primary hover--dim">在 CurseForge 上了解更多
              <icon :path="mdiLaunch"/>
            </btn>
          </modal-actions>
        </card>
      </div>
    </section>
  </div>
  <modal v-model="descForgeModal" class="with-bg--darken describe">
    <modal-content>
      <ForgeLogoFull/>
      <h2>此整合包使用 Forge 作为加载器</h2>
      <p>Minecraft 模组具有多种加载器，如 Forge、Fabric 和
        Quilt，不同的加载器之间的模组一般不互通，除非作者专门制作相应版本。</p>
      <p>此整合包使用的是 Forge 加载器。</p>
    </modal-content>
    <modal-actions>
      <btn class="with-bg--primary hover--dim" @click="descForgeModal = false">确定</btn>
    </modal-actions>
  </modal>
  <modal v-model="descJavaModal" class="with-bg--darken describe">
    <modal-content>
      <DukeWaving/>
      <h2>支持 Minecraft Java 版</h2>
      <p>Java 版是众多 Minecraft 版本之一，也是较为流行的版本，有别于基岩版、网易版等。本周目服务器支持 Java 版进入。</p>
    </modal-content>
    <modal-actions>
      <btn class="with-bg--primary hover--dim" @click="descJavaModal = false">确定</btn>
    </modal-actions>
  </modal>
  <modal v-model="descOnlineModal" class="with-bg--darken describe">
    <modal-content>
      <icon color="#4caf50" :path="mdiCheckAll"/>
      <h2>正版验证开启</h2>
      <p>服务器已经开启了正版验证，以保障玩家权利和质量。</p>
      <p>这代表着在进入服务器之前，你的客户端将自动连接至 MOJANG 的服务器来检查你的账号是否为正版。</p>
    </modal-content>
    <modal-actions>
      <btn class="with-bg--primary hover--dim" @click="descOnlineModal = false">确定</btn>
      <btn class="without-bg--primary hover--dim" href="https://www.minecraft.net/">购买正版</btn>
    </modal-actions>
  </modal>
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
  mdiAbacus, mdiAnvil, mdiApple,
  mdiBook, mdiCardsPlaying,
  mdiCheck, mdiCheckAll, mdiClose,
  mdiCpu64Bit,
  mdiCubeOutline, mdiDownload, mdiHelpCircleOutline, mdiInformationOutline, mdiLanguageJava, mdiLaunch,
  mdiMemory, mdiMicrosoft,
  mdiMicrosoftWindows, mdiMinecraft,
  mdiMonitor, mdiMore, mdiPlayCircle, mdiPlayCircleOutline,
  mdiServer
} from "@mdi/js";
import ForgeLogoFull from '~/assets/icons/forge-logo-full.svg'
import MCJELogoFull from '~/assets/icons/mcje-full.svg'
import DukeWaving from '~/assets/icons/duke-waving.svg'
import JavaLogoHorizontal from '~/assets/icons/java-horizontal.svg'
import getDateMessageFrom from "~/utils/getDateMessageFrom";

interface SiteFunction {
  title: string,
  description: string,
  icon: string,
  model?: Ref<boolean>,
  href?: string,
  version: string
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
const descForgeModal = ref(false);
const descOnlineModal = ref(false);
const descJavaModal = ref(false);
const errorInformationPopup = ref(false);
const errorInformationContent = ref('');

const termBgn = '2024-05-01';
const termTimeDelta = ref(getDateMessageFrom(new Date(termBgn)));

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

  setInterval(() => {
    termTimeDelta.value = getDateMessageFrom(new Date(termBgn));
  }, 1000)
})
</script>

<style lang="less" scoped>

.page-index {
  padding: 32px 0;
}

section {
  padding: 16px 0;

  &:nth-of-type(1) {
    padding-top: 0;
  }

  &:last-of-type {
    padding-bottom: 0;
  }
}

.index-term-information {
  .card-content-container {
    display: flex;
    gap: 32px;
  }

  .left {
    width: 30%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
    }
  }

  .right {
    width: 70%;

    .term-information {
      padding: 16px 0;

      ul {
        padding: 0;

        li {
          list-style: none;
          font-size: 32px;
          line-height: 1.8;
          display: flex;
          align-items: center;
          gap: 16px;

          > svg {
            height: 30px;
            width: 30px;
          }
        }
      }
    }

    .term-title {
      .sub {
        font-size: 20px;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .main {
        font-size: 40px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: bold;

        img {
          height: 45px;
          border-radius: 10px;
        }
      }
    }
  }
}

.pack-title {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .pack-name {
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
        line-height: 1.2;
        margin-bottom: 10px;

        small {
          font-size: 25px;
          font-weight: 500;
        }
      }

      .sub {
        font-size: 20px;
        line-height: 1;
      }
    }
  }

  .pack-logo {
    box-shadow: 0 3px 0 rgba(0, 0, 0, .1);
    object-fit: cover;
  }
}

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
    cursor: pointer;

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


.pack-description {
  padding: 16px 0;
}
</style>

<style lang="less" scoped>
.index-title {
  padding-bottom: 32px;

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
  gap: 32px;

  > * {
    cursor: pointer;
    width: 33.33%;
  }
}
</style>