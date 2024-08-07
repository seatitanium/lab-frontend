<template>
  <div class="page-index container">
    <div class="page-title">
      <h1 v-if="userLoginState">欢迎，{{ userInformation.nickname || userInformation.username }}</h1>
      <h1 v-else>未登录</h1>
      <p>要开始，请选择下列功能之一，单击以进行相关操作，或选择上方导航栏中的选项跳转至相关页面。</p>
    </div>
    <section class="section__player_analytics">
      <div class="user-profile loading" v-if="userInformation.loading">
        <div class="text textaligncenter">
          <circle-spinner size="25"/>
          <p>加载用户信息中</p>
        </div>
      </div>
      <div class="user-profile empty" v-else-if="!userLoginState">
        <div class="text textaligncenter">
          <h2>请登录后查看个人统计信息</h2>
          <p>个人统计信息仅在绑定 Minecraft ID 且登录状态下可用</p>
        </div>
      </div>
      <div class="user-profile" v-else-if="userInformation.hasBoundValidMCID">
        <section class="player-analytics">
          <div class="player-a" @click="modalPlaytime = true">
            <div class="text">
              游玩时长
            </div>
            <div class="value">
              {{ formatSecondsDense(userInformation.playtimeTotalMillis - userInformation.playtimeAfkMillis) }}
              <span class="afk">
            AFK = {{ formatSecondsDense(userInformation.playtimeAfkMillis) }}
          </span>
            </div>
          </div>
          <div class="player-a" @click="() => {
            if (userInformation.analytics.loginCount > 0) {
              modalLoginRecord = true
            }
          }">
            <div class="text">
              登入次数
            </div>
            <div class="value">
              {{ userInformation.analytics.loginCount }}
            </div>
          </div>
          <div class="player-a" @click="() => {
            if (userInformation.analytics.termsInvolved.length > 0) {
              modalTermsInvolved = true
            }
          }">
            <div class="text">
              参与周目
            </div>
            <div class="value">
              {{ userInformation.analytics.termsInvolved.length }}<small>/{{ getTermCount() }}</small>
            </div>
          </div>
          <div class="player-a" @click="() => {
            if (userInformation.analytics.firstLoginRecord.createdAt) {
              modalFirstLogin = true
            }
          }">
            <div class="text">
              首次加入
            </div>
            <div class="value">
              {{ userInformation.analytics.firstLoginRecord.createdAt ? formatTimeStringFromStringPartialYM(userInformation.analytics.firstLoginRecord.createdAt) : '未曾加入' }}
            </div>
          </div>
        </section>
      </div>
      <div class="user-profile empty" v-else>
        <div class="text textaligncenter">
          <h2>{{ !userInformation.mcidExist ? '绑定有效' : '验证' }} Minecraft ID 以查看个人统计信息</h2>
          <p v-if="!userInformation.mcidExist">绑定后，此处会展示包括游玩时长、登入次数的个人统计信息</p>
          <p v-else>请用 {{ userInformation.mcid }} 登入 Seati 服务器，按照提示进行操作以验证 Minecraft ID</p>
        </div>
        <btn class="with-bg--primary hover--dim" @click="modalUserAction_mcid = true">
          <icon :path="!userInformation.mcidExist ? mdiLinkVariantPlus : mdiRefresh"/>
          {{ !userInformation.mcidExist ? '立即绑定' : '重新绑定' }}
        </btn>
      </div>
    </section>
    <section v-if="currentTerm">
      <div class="index-term-information">
        <card class="equalp">
          <card-right-top>
            <div class="badges">
              <div class="badge preset--online" @click="modalOnlineModeDesc = true">正版验证
                <icon :path="mdiCheck"/>
              </div>
              <div class="badge preset--mcje" @click="modalJavaDesc = true">
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
                <div class="main">当前周目
                  <term-icon num="13"/>
                </div>
                <div class="sub">
                  <icon color="#004d40" :path="mdiCardsPlaying"/>
                  <strong>进行中</strong> · {{ termTimeDelta }}
                </div>
              </div>
              <div class="term-information">
                <ul>
                  <li>
                    <icon :path="mdiMinecraft"/>
                    Minecraft 版本
                    <slim>{{ currentTerm.version }}</slim>
                  </li>
                  <li>
                    <icon :path="mdiAnvil"/>
                    Forge 版本
                    <slim>{{ currentTermSet.forge }}</slim>
                  </li>
                  <li>
                    <icon :path="mdiMemory"/>
                    分配内存
                    <slim>{{ currentTermSet.ram }}GB 或以上</slim>
                  </li>
                  <li>
                    <icon :path="mdiLanguageJava"/>
                    Java 版本
                    <slim>{{ currentTermSet.java }} 或以上</slim>
                  </li>
                </ul>
              </div>
            </div>
          </card-content>
        </card>
      </div>
    </section>
    <section v-if="currentTerm">
      <div class="index-pack-information">
        <card class="equalp">
          <card-right-top>
            <div class="badges">
              <div class="badge preset--forge" @click="modalForgeDesc = true">Forge</div>
            </div>
          </card-right-top>
          <card-content>
            <div class="pack-title">
              <div class="pack-name">
                <img class="pack-logo" src="../assets/images/pack-logo.png"/>
                <div class="right">
                  <div class="main">{{ currentTerm.theme }} <small v-if="currentTerm.themeAlt">{{ currentTerm.themeAlt }}</small></div>
                  <div class="sub">{{ currentTerm.type }} / {{ currentTerm.created}} 年 / {{ currentTerm.author }} 制作</div>
                </div>
              </div>
            </div>
            <div class="pack-description" v-html="currentTermSet.description"/>
          </card-content>
          <modal-actions v-if="currentTerm.link" style="position: absolute;bottom: 32px; right: 32px;" class="nopadding absolute">
            <btn :href="currentTerm.link" class="without-bg--primary hover--dim">在 MCMOD 中打开
              <icon :path="mdiLaunch"/>
            </btn>
          </modal-actions>
        </card>
      </div>
    </section>
  </div>
  <mg-index-badges/>
  <mg-user-analytics/>
</template>

<script lang="ts" setup>
import {
  mdiAnvil, mdiCardsPlaying,
  mdiCheck, mdiLanguageJava, mdiLaunch, mdiLinkVariantPlus,
  mdiMemory, mdiMinecraft, mdiRefresh
} from "@mdi/js";
import DukeWaving from '~/assets/icons/duke-waving.svg'
import formatSeconds from "~/utils/formatSeconds";
import formatSecondsDense from "../utils/formatSecondsDense";
import {useState} from "#app";
import formatTimeStringFromStringPartialYM from "../utils/formatTimeStringFromStringPartialYM";
import MgUserAnalytics from "~/components/modal-groups/mg-user-analytics.vue";
import MgIndexBadges from "~/components/modal-groups/mg-index-badges.vue";
import {BackendCodes} from "~/consts";
import getCurrentTerm from "~/utils/getCurrentTerm";
import {definePageMeta} from "#imports";

definePageMeta({
  requireLogin: true
})

const modalForgeDesc = useState('modal-forge-description', () => false);
const modalJavaDesc = useState('modal-java-description', () => false);
const modalOnlineModeDesc = useState('modal-online-mode-description', () => false);

const modalPlaytime = useState('modal-playtime', () => false);
const modalLoginRecord = useState('modal-login-record', () => false);
const modalTermsInvolved = useState('modal-terms-involved', () => false);
const modalFirstLogin = useState('modal-first-login', () => false);

const modalUserAction_mcid = useState('modal-user-action_mcid', () => false);

const userInformation = useState<UserExtended>('user-data');
const userLoginState = useState('user-login-state');
const currentTerm = computed(() => getCurrentTerm());

const termTimeDelta = ref(formatSeconds(currentTerm.value ? (new Date().getTime() - new Date(currentTerm.value.startAt).getTime()) : 0))

const currentTermSet = reactive<TermSet>({
  tag: "",
  forge: "",
  ram: "",
  java: "",
  description: ""
});

async function getTermSet() {
  const result = await get<TermSet>(`/server/current-term-set`);

  if (result.code === BackendCodes.OK) {
    Object.assign(currentTermSet, result.data);
  }
}

onMounted(() => {
  getTermSet();

  setInterval(() => {
    termTimeDelta.value = formatSeconds(currentTerm.value ? (new Date().getTime() - new Date(currentTerm.value.startAt).getTime()) : 0);
  }, 1000);
})

definePageMeta({
  title: '首页'
})
</script>

<style lang="less" scoped>
.page-index {
  padding: 32px 0;
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


.pack-description {
  padding: 16px 0;
}
</style>

<style lang="less" scoped>
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

<style lang="less" scoped>

@import "@/assets/var.less";

.section__player_analytics {
  .player-analytics {
    display: flex;
    align-items: center;
    gap: 16px;

    .player-a {
      cursor: pointer;
      border-radius: 10px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
      width: 25%;
      padding: 16px;

      .text {
        padding-bottom: 8px;
        font-weight: 500;
      }

      .value {
        font-weight: bold;
        color: @primaryd;
        font-size: 38px;

        @media (max-width: 1200px) {
          font-size: 32px;
        }

        .afk {
          font-size: 12px;
          font-weight: normal;
          color: #aaa;

          @media (max-width: 1200px) {
            font-size: 10px;
          }
        }
      }
    }
  }
}

.user-profile {
  &.empty, &.loading {
    border-radius: 20px;
    border: 2px dashed #ddd;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  &.empty {
    .text {
      h2 {
        color: @primaryd;
        font-size: 30px;
        font-weight: bold;
      }
    }
  }
}
</style>