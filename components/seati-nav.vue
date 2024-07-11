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
          <avatar-spinner v-if="userInformation.uuid === ''"/>
          <img @click="userActionsModal = true" draggable="false" v-else
               :src="`https://crafatar.com/avatars/${userInformation.uuid}`"/>
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
        <div class="left">
          <player-skin-viewer v-if="userInformation.skinBase64 !== ''" :skin="userInformation.skinBase64" :width="200"
                              :height="400"/>
        </div>
        <div class="right">
          <div class="top">
            <h2>{{ userInformation.mcid }}</h2>
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
            <div class="action">
              <icon :path="userInformation.mcid !== '' ? mdiLinkVariant : mdiLinkVariantPlus"/>
              {{ userInformation.mcid !== '' ? '更新' : '绑定' }} Minecraft ID
              <span class="current">
                {{ userInformation.mcid }}
              </span>
            </div>
            <div class="action">
              <icon :path="mdiLockReset"/>
              修改密码
            </div>
            <div class="action">
              <icon :path="mdiEmailEditOutline"/>
              修改邮箱
              <span class="current">
                {{ userInformation.email }}
              </span>
            </div>
            <div class="action">
              <icon :path="mdiRenameOutline"/>
              {{ userInformation.nickname ? '修改' : '添加'}}昵称
              <span class="current">
                {{ userInformation.nickname }}
              </span>
            </div>
            <div class="action red">
              <icon :path="mdiAccountOffOutline"/>
              注销账号
            </div>
          </div>
        </div>
      </div>
    </modal-content>
  </modal>
</template>

<script lang="ts" setup>
import setLocation from "~/utils/setLocation";
import {
  mdiAccountOffOutline,
  mdiCheck,
  mdiClockPlusOutline,
  mdiCompare,
  mdiConnection, mdiEmail, mdiEmailEdit, mdiEmailEditOutline,
  mdiHome,
  mdiKeyVariant,
  mdiLinkVariant, mdiLinkVariantPlus, mdiLockReset,
  mdiMinecraft, mdiPencilOutline, mdiRenameOutline
} from "@mdi/js";
import getUsername from "~/utils/getUsername";
import {useState} from "#app";
import {BackendCodes} from "~/consts";
import playernameToSkin from "~/utils/playernameToSkin";
import {playernameToUUID} from "#imports";
import AvatarSpinner from "~/components/avatar-spinner.vue";
import formatTimeStringFromDate from "../utils/formatTimeStringFromDate";

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
    uuid: ""
  };
});

const someProblemModal = useState('error-modal-state', () => false);
const errorInformationContent = useState('error-modal-content', () => '');
const userActionsModal = ref(false);

async function initUser() {
  if (username.value === '') return;
  const userResult = await get<User>(`/api/user/profile/${username.value}`);
  if (userResult.code !== BackendCodes.OK) {
    someProblemModal.value = true;
    errorInformationContent.value = JSON.stringify(userResult);
  } else {
    Object.assign(userInformation.value, userResult.data)
    const skinRes = await playernameToSkin(userInformation.value.mcid);
    userInformation.value.skinBase64 = skinRes.data;
    userInformation.value.uuid = await playernameToUUID(userInformation.value.mcid);

    const loginCountRes = await get<number>(`/api/user/stats/login/count?username=${username.value}`);
    if (loginCountRes.code === BackendCodes.OK) userInformation.value.analytics.loginCount = loginCountRes.data;

    const playtimeRes = await get<UserStatsPlaytime>(`/api/user/stats/playtime?username=${username.value}`);
    if (playtimeRes.code === BackendCodes.OK) {
      userInformation.value.analytics.playtime.total = playtimeRes.data.total;
      userInformation.value.analytics.playtime.afk = playtimeRes.data.afk;
    }
  }
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
    icon: mdiCompare
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
        font-family: 'Minecraft', monospace;
        font-weight: normal;
        margin: 0;
        font-size: 48px;
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
      }

      &:hover {

        .current {
          opacity: 0;
        }

        border-radius: 20px;
        padding: 16px 0;
        svg {
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
        font-weight: bold;
        font-variation-settings: 'wght' 800;
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