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
          <div class="player-a" @click="modalPlaytimeA = true">
            <div class="text">
              游玩时长
            </div>
            <div class="value">
              {{ formatSecondsDense(userPlaytimeTotal - userPlaytimeAfk) }}
              <span class="afk">
            AFK = {{ formatSecondsDense(userPlaytimeAfk) }}
          </span>
            </div>
          </div>
          <div class="player-a">
            <div class="text">
              登入次数
            </div>
            <div class="value">
              {{ userInformation.analytics.loginCount }}
            </div>
          </div>
          <div class="player-a">
            <div class="text">
              参与周目
            </div>
            <div class="value">
              --
            </div>
          </div>
          <div class="player-a">
            <div class="text">
              首次加入
            </div>
            <div class="value">
              --
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
    <modal v-model="modalPlaytimeA" class="with-bg--darken describe">
      <modal-content>
        <icon color="#009688" :path="mdiClockStarFourPointsOutline"/>
        <h2>{{ userInformation.mcid }} 的游玩时长数据</h2>
        <div class="playtime">
          <div class="time">{{ formatSecondsDense(userPlaytimeTotal) }}</div>
          <div class="text">总在线时长</div>
        </div>
        <div class="playtime">
          <div class="time">{{ formatSecondsDense(userPlaytimeAfk) }}</div>
          <div class="text">挂机时长</div>
        </div>
        <div class="playtime">
          <div class="time">{{ formatSecondsDense(userPlaytimeTotal - userPlaytimeAfk) }}</div>
          <div class="text">有效时长</div>
        </div>
        <p>以上数据有效性截至页面刷新时间</p>
      </modal-content>
      <modal-actions>
        <btn class="with-bg--primary hover--dim" @click="modalPlaytimeA = false">确定</btn>
        <btn class="with-bg--white hover--dim" @click="playtimeDescriptionPopup = true">了解更多</btn>
      </modal-actions>
    </modal>
    <anywhere-popup v-model="playtimeDescriptionPopup" :code="false">
      <p>Seati
        会自动计算你的游玩时长数据，并存储在专用的数据库中。其中包含了<strong>总在线时长</strong>和<strong>挂机时长</strong>，<strong>有效时长</strong>为两者之差。
      </p>
      <p>Seati 的各种权益仅以<strong>有效时长</strong>为依据。</p>
    </anywhere-popup>
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
      <p>服务器已经开启了正版验证，以保障玩家权益和质量。</p>
      <p>这代表着在进入服务器之前，你的客户端将自动连接至 MOJANG 的服务器来检查你的账号是否为正版。</p>
    </modal-content>
    <modal-actions>
      <btn class="with-bg--primary hover--dim" @click="descOnlineModal = false">确定</btn>
      <btn class="without-bg--primary hover--dim" href="https://www.minecraft.net/">购买正版</btn>
    </modal-actions>
  </modal>
</template>

<script lang="ts" setup>
import getUsername from "~/utils/getUsername";
import {
  mdiAnvil, mdiCardsPlaying,
  mdiCheck, mdiCheckAll, mdiClockStarFourPointsOutline, mdiLanguageJava, mdiLaunch, mdiLinkVariantPlus,
  mdiMemory, mdiMinecraft, mdiRefresh, mdiRenameOutline
} from "@mdi/js";
import ForgeLogoFull from '~/assets/icons/forge-logo-full.svg'
import DukeWaving from '~/assets/icons/duke-waving.svg'
import formatSeconds from "~/utils/formatSeconds";
import formatSecondsDense from "../utils/formatSecondsDense";
import {useState} from "#app";

const username = getUsername();
const userInformation = useState<UserExtended>('user-data');
const userPlaytimeTotal = computed(() => userInformation.value.analytics.playtime.total * 1000);
const userPlaytimeAfk = computed(() => userInformation.value.analytics.playtime.afk * 1000);
const descForgeModal = ref(false);
const descOnlineModal = ref(false);
const descJavaModal = ref(false);
const termBgn = '2024-05-01';
const termTimeDelta = ref(formatSeconds(new Date().getTime() - new Date(termBgn).getTime()));

onMounted(() => {
  setInterval(() => {
    termTimeDelta.value = formatSeconds(new Date().getTime() - new Date(termBgn).getTime());
  }, 1000);
})

const modalPlaytimeA = ref(false);
const playtimeDescriptionPopup = ref(false);

definePageMeta({
  requireLogin: true
})

const modalUserAction_mcid = useState('modal-user-action_mcid', () => false);
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

.playtime {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 8px 0;

  .time {
    font-weight: bold;
    color: @primaryd;
    font-size: 40px;
  }

  .text {
    color: #aaa;
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