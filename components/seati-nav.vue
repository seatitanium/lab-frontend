<template>
  <header>
    <nav class="navbar">
      <div class="container">
        <div @click="setLocation('/')" class="logo--navbar">
          TiLab
        </div>
        <div class="navigation">
          <div class="navigation-item" v-for="x in navigation">
            <btn class="nav-btn hover--dim"
                 :class="useRoute().fullPath === x.route ? 'with-bg--primary' : 'with-bg--white'"
                 @click="navigateTo(x.route)">
              <icon :path="x.icon"/>
              {{ x.name }}
            </btn>
          </div>
        </div>
        <div class="spacer"></div>
        <div class="user-avatar" v-if="userInformation.id > 0">
          <avatar-spinner v-if="userInformation.loading"/>
          <img @click="userActionsModal = true" draggable="false" v-else-if="userInformation.hasBoundValidMCID"
               :src="`https://crafatar.com/avatars/${userInformation.uuid}`"/>
          <div class="avatar-placeholder" @click="userActionsModal = true" v-else>{{ username.charAt(0).toUpperCase() }}</div>
        </div>
      </div>
    </nav>
  </header>
  <error-modal v-model="someProblemModal" :error-information-content="errorInformationContent"
               :retry-func="() => $router.go(0)">
    <p>
      在获取关键信息的时候出现了一些问题，导致页面无法正常运作。
    </p>
    <p>
      单击「<strong>重试</strong>」立即刷新页面。
    </p>
    <p>
      如果问题仍然存在，单击「<strong>错误信息</strong>」按钮查看内部错误信息，然后单击弹出的信息复制，将其传达给维护者以得到支持。
    </p>
  </error-modal>
  <modal v-model="userActionsModal" class="with-bg--darken" with-close-btn>
    <modal-content>
      <div class="user-actions-container">
        <div class="left" v-if="userInformation.skinBase64 !== ''">
          <player-skin-viewer :skin="userInformation.skinBase64" :width="200"
                              :height="400"/>
        </div>
        <div class="right">
          <div class="top">
            <h2 :class="{mcid: userInformation.hasBoundValidMCID}">{{ userInformation.hasBoundValidMCID ? userInformation.mcid : userInformation.username}}</h2>
            <div class="namesub">普通玩家</div>
          </div>
          <metabar>
            <metabar-item>
             <span class="left">
               创建于
             </span>
              <span class="right">
               {{ formatTimeStringFromDate(new Date(userInformation.createdAt)) }}
             </span>
            </metabar-item>
            <metabar-item>
             <span class="left">
               最近更新
             </span>
              <span class="right">
               {{ formatTimeStringFromDate(new Date(userInformation.updatedAt)) }}
             </span>
            </metabar-item>
          </metabar>
          <div class="actions">
            <div class="action" @click="userActionsModal = false; modalUserAction_mcid = true">
              <icon :path="userInformation.hasBoundValidMCID ? mdiLinkVariant : mdiLinkVariantPlus"/>
              <span class="text">{{ userInformation.hasBoundValidMCID ? '更新' : '绑定' }} Minecraft ID</span>
              <span class="current" v-if="userInformation.hasBoundValidMCID">
                {{ userInformation.mcid }}
              </span>
              <span class="mcid-not-exist-warning current" v-else-if="userInformation.mcid && !userInformation.mcidExist">
                <icon :path="mdiAlertOutline"/>
                请及时更换无效 ID
              </span>
              <span class="current note" v-else>
                <icon :path="mdiCreationOutline"/>
                解锁完整功能
              </span>
            </div>
            <div class="action">
              <icon :path="mdiLockReset"/>
              <span class="text">修改密码</span>
            </div>
            <div class="action">
              <icon :path="mdiEmailEditOutline"/>
              <span class="text">修改邮箱</span>
              <span class="current">
                {{ userInformation.email }}
              </span>
            </div>
            <div class="action" @click="userActionsModal = false; modalUserAction_nickname = true">
              <icon :path="mdiRenameOutline"/>
              <span class="text">{{ userInformation.nickname ? '修改' : '添加'}}昵称</span>
              <span class="current" v-if="userInformation.nickname">
                {{ userInformation.nickname }}
              </span>
              <span class="current note" v-else>
                <icon :path="mdiAccountHeartOutline"/>
                沟通交流更方便
              </span>
            </div>
            <div class="action red">
              <icon :path="mdiAccountOffOutline"/>
              <span class="text">注销账号</span>
            </div>
          </div>
        </div>
      </div>
    </modal-content>
  </modal>
  <mg-user-actions/>
</template>

<script lang="ts" setup>
import setLocation from "~/utils/setLocation";
import {
  mdiAccountHeartOutline,
  mdiAccountOffOutline, mdiAlertOutline, mdiCreationOutline,
  mdiEmailEditOutline,
  mdiHome,
  mdiLinkVariant, mdiLinkVariantPlus, mdiLockReset,
  mdiMinecraft, mdiPodium, mdiRenameOutline
} from "@mdi/js";
import getUsername from "~/utils/getUsername";
import {useState} from "#app";
import {BackendCodes} from "~/consts";
import playernameToSkin from "~/utils/playernameToSkin";
import {playernameToUUID} from "#imports";
import AvatarSpinner from "~/components/avatar-spinner.vue";
import formatTimeStringFromDate from "../utils/formatTimeStringFromDate";
import MgUserActions from "~/components/modal-groups/mg-user-actions.vue";
import getAshconResponse from "~/utils/getAshconResponse";

const username = getUsername();

const userInformation = useState<UserExtended>('user-data', () => {
  return {
    id: -1,
    username: '',
    nickname: '',
    email: '',
    mcid: '',
    createdAt: 0,
    updatedAt: 0,
    skinBase64: '',
    analytics: {
      loginCount: 0,
      playtime: {
        afk: 0,
        total: 0
      }
    },
    uuid: "",
    mcidExist: false,
    hasBoundValidMCID: false,
    loading: true
  };
});

const someProblemModal = useState('error-modal-state', () => false);
const errorInformationContent = useState('error-modal-content', () => '');
const userActionsModal = ref(false);

const modalUserAction_mcid = useState('modal-user-action_mcid', () => false);
const modalUserAction_nickname = useState('modal-user-action-nickname', () => false);

async function initUser() {
  if (username.value === '') return;
  const userResult = await get<User>(`/api/user/profile?username=${username.value}`);
  if (userResult.code !== BackendCodes.OK) {
    someProblemModal.value = true;
    errorInformationContent.value = JSON.stringify(userResult);
  } else {
    Object.assign(userInformation.value, userResult.data)

    if (userInformation.value.mcid.length > 0) {
      const ashconResponse = await getAshconResponse(userInformation.value.mcid);
      userInformation.value.mcidExist = ashconResponse.code !== 404;
      userInformation.value.hasBoundValidMCID = userInformation.value.mcidExist;
      const skinRes = await playernameToSkin(userInformation.value.mcid);
      if (skinRes) userInformation.value.skinBase64 = skinRes.data;
      userInformation.value.uuid = await playernameToUUID(userInformation.value.mcid);

      const loginCountRes = await get<number>(`/api/user/stats/login/count?playername=${userInformation.value.mcid}`);
      if (loginCountRes.code === BackendCodes.OK) userInformation.value.analytics.loginCount = loginCountRes.data;

      const playtimeRes = await get<UserStatsPlaytime>(`/api/user/stats/playtime?playername=${userInformation.value.mcid}`);
      if (playtimeRes.code === BackendCodes.OK) {
        userInformation.value.analytics.playtime.total = playtimeRes.data.total;
        userInformation.value.analytics.playtime.afk = playtimeRes.data.afk;
      }
    }
  }

  userInformation.value.loading = false;
}

initUser();

const navigation = [
  {
    name: "主页",
    route: "/",
    icon: mdiHome
  },
  {
    name: "服务器",
    route: "/instance",
    icon: mdiMinecraft
  },
  {
    name: "排行榜",
    route: "/board",
    icon: mdiPodium
  }
]
</script>

<style lang="less" scoped>
@import "@/assets/var";

.navbar {
  height: @navbar-height;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  z-index: 200;
}

.logo--navbar {
  cursor: pointer;
  font-variation-settings: 'CASL' 1, 'slnt' -10, 'wght' 800;
  font-size: 40px;
}

.container {
  display: flex;
  align-items: center;
  gap: 32px;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-btn {
  padding: 6px 15px;

  svg {
    width: 20px;
  }
}

.spacer {
  flex: 1;
}

.user-avatar {
  img {
    border-radius: 100%;
    height: 40px;
    cursor: pointer;
  }

  .avatar-placeholder {
    font-size: 20px;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: 1px solid rgba(0, 0, 0, .2);
    cursor: pointer;
  }
}

.user-actions-container {
  display: flex;
  align-items: flex-start;
  gap: 32px;

  .right {
    .top {
      display: flex;
      align-items: baseline;
      gap: 8px;

      h2 {
        &.mcid {
          font-family: 'Minecraft', monospace;
          font-weight: normal;
          font-size: 48px;
        }

        font-variation-settings: 'wght' 800;
        margin: 0;
        font-size: 38px;
      }

      .namesub {
        color: #aaa;
      }
    }
  }

  .actions {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin: 24px 0;

    .action {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 25px;
      padding: 8px 0;
      gap: 16px;
      cursor: pointer;
      transition: all .2s ease;
      font-variation-settings: 'wght' 400;

      .current {
        font-size: 14px;
        color: #aaa;
        opacity: 1;
        transition: all .2s ease;
        display: inline-flex;
        align-items: center;
        gap: 8px;

        &.note {
          color: @primaryd;
          background: @primaryl;
          border-radius: 30px;
          padding: 0 14px;
          .animation--RotateInPlace;
        }

        &.mcid-not-exist-warning {
          color: #f44336;
          background: #ffebee;
          border-radius: 30px;
          padding: 0 14px;
        }

        svg {
          width: 20px;
        }
      }

      &:hover {

        .current {
          opacity: 0;
        }

        border-radius: 20px;
        padding: 16px 0;

        > svg {
          transform: rotate(6deg) scale(2) translateX(-4px);
        }

        &.red {
          background: #ffebee;
          color: #f44336;
        }

        &:not(.red) {
          background: @primaryl;
          color: @primaryd;
        }

        > .text {
          font-weight: bold;
          font-variation-settings: 'wght' 800;
        }
      }

      svg {
        transition: all .2s ease;
        width: 35px;
        height: 35px;
      }
    }
  }
}
</style>

<style lang="less">
@import "@/assets/var.less";

main {
  padding-top: @navbar-height;
}
</style>