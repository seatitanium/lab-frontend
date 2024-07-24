<template>
  <div class="page-index container">
    <div class="page-title">
      <h1>欢迎，{{ userInformation.nickname || userInformation.username }}</h1>
      <p>选择下列功能之一，单击以跳转到相关页面以进行操作。这些功能在不断的更新中。</p>
    </div>
    <section class="section__player_analytics">
      <div class="user-profile loading" v-if="userInformation.loading">
        <div class="text textaligncenter">
          <circle-spinner size="25"/>
          <p>加载用户信息中</p>
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
          <div class="player-a" @click="modalLoginRecord = true">
            <div class="text">
              登入次数
            </div>
            <div class="value">
              {{ userInformation.analytics.loginCount }}
            </div>
          </div>
          <div class="player-a" @click="modalTermsInvolved = true">
            <div class="text">
              参与周目
            </div>
            <div class="value">
              {{ userInformation.analytics.termsInvolved.length }}
            </div>
          </div>
          <div class="player-a" @click="modalFirstLogin = true">
            <div class="text">
              首次加入
            </div>
            <div class="value">
              {{ formatTimeStringFromStringPartialYM(userInformation.analytics.firstLoginRecord.createdAt) }}
            </div>
          </div>
        </section>
      </div>
      <div class="user-profile empty" v-else>
        <div class="text textaligncenter">
          <h2>{{ userInformation.mcidVerified ? '绑定有效' : '验证' }} Minecraft ID 以查看个人统计信息</h2>
          <p v-if="userInformation.mcidVerified">绑定后，此处会展示包括游玩时长、登入次数的个人统计信息</p>
          <p v-else>请用 {{ userInformation.mcid }} 登入 Seati 服务器，按照提示进行操作以验证 Minecraft ID</p>
        </div>
        <btn class="with-bg--primary hover--dim" @click="modalUserAction_mcid = true">
          <icon :path="userInformation.mcidVerified ? mdiLinkVariantPlus : mdiRefresh"/>
          {{ userInformation.mcidVerified ? '立即绑定': '重新绑定' }}
        </btn>
      </div>
    </section>
    <section>
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
                <div class="main">当前周目 <term-icon num="13"/></div>
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
              <div class="badge preset--forge" @click="modalForgeDesc = true">Forge</div>
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

definePageMeta({
  requireLogin: true
})

const modalForgeDesc = useState('modal-forge-description', () => false);
const modalJavaDesc = useState('modal-java-description', () => false);
const modalOnlineModeDesc = useState('modal-online-mode-description', () => false);

const termBgn = '2024-05-01';
const termTimeDelta = ref(formatSeconds(new Date().getTime() - new Date(termBgn).getTime()));

const modalPlaytime = useState('modal-playtime', () => false);
const modalLoginRecord = useState('modal-login-record', () => false);
const modalTermsInvolved = useState('modal-terms-involved', () => false);
const modalFirstLogin = useState('modal-first-login', () => false);

const modalUserAction_mcid = useState('modal-user-action_mcid', () => false);

const userInformation = useState<UserExtended>('user-data');

onMounted(() => {
  setInterval(() => {
    termTimeDelta.value = formatSeconds(new Date().getTime() - new Date(termBgn).getTime());
  }, 1000);
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

        .afk {
          font-size: 12px;
          font-weight: normal;
          color: #aaa;
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