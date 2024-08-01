<template>
  <header v-if="!firstAccess">
    <nav class="navbar">
      <div class="container">
        <div @click="setLocation('/')" class="logo--navbar">
          TiLab
        </div>
        <div class="navigation">
          <div class="navigation-item" v-for="x in navigation">
            <btn class="nav-btn hover--dim"
                 :class="useRoute().fullPath === x.route ? 'with-bg--primary' : 'with-bg--white'"
                 v-if="!x.hidden || useRoute().fullPath === x.route"
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
               :src="`https://crafatar.com/avatars/${userInformation.uuid}`"
               @contextmenu="handleUserAvatarContextMenu"/>
          <div class="avatar-placeholder" @contextmenu="handleUserAvatarContextMenu" @click="userActionsModal = true"
               v-else>
            {{ userInformation.username.charAt(0).toUpperCase() }}
          </div>
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
        <div class="left" v-if="userInformation.hasBoundValidMCID">
          <player-skin-viewer :skin="userInformation.skinBase64" :width="200"
                              :height="400"/>
        </div>
        <div class="right" :class="{fullWidth: !userInformation.hasBoundValidMCID}">
          <div class="top">
            <h2 :class="{mcid: userInformation.hasBoundValidMCID}">
              {{ userInformation.hasBoundValidMCID ? userInformation.mcid : userInformation.username }}</h2>
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
              <span class="mcid-not-exist-warning current"
                    v-else-if="userInformation.mcid && !userInformation.mcidExist">
                <icon :path="mdiAlertOutline"/>
                请及时更换无效 ID
              </span>
              <span class="mcid-not-verified current" v-else-if="userInformation.mcid && !userInformation.mcidVerified">
                <icon :path="mdiAlertOutline"/>
                请及时验证 ID
              </span>
              <span class="current note" v-else>
                <icon :path="mdiCreationOutline"/>
                解锁完整功能
              </span>
            </div>
            <div class="action" @click="userActionsModal = false; modalUserAction_password = true">
              <icon :path="mdiLockReset"/>
              <span class="text">修改密码</span>
            </div>
            <div class="action" @click="userActionsModal = false; modalUserAction_email = true">
              <icon :path="mdiEmailEditOutline"/>
              <span class="text">修改邮箱</span>
              <span class="current">
                {{ userInformation.email }}
              </span>
            </div>
            <div class="action" @click="userActionsModal = false; modalUserAction_nickname = true">
              <icon :path="mdiRenameOutline"/>
              <span class="text">{{ userInformation.nickname ? '修改' : '添加' }}昵称</span>
              <span class="current" v-if="userInformation.nickname">
                {{ userInformation.nickname }}
              </span>
              <span class="current note" v-else>
                <icon :path="mdiAccountHeartOutline"/>
                沟通交流更方便
              </span>
            </div>
            <div class="action red" @click="userActionsModal = false; modalUserAction_delete = true">
              <icon :path="mdiAccountOffOutline"/>
              <span class="text">注销账号</span>
            </div>
          </div>
        </div>
      </div>
    </modal-content>
  </modal>
  <context-menu v-model="contextMenuEnabled" :x="contextMenuX" :y="contextMenuY">
    <context-menu-item @click="logout">
      <icon :path="mdiLogout"/>
      退出登录
    </context-menu-item>
    <context-menu-item @click="loginModalState = true">
      <icon :path="mdiAccountConvertOutline "/>
      切换账户
    </context-menu-item>
  </context-menu>
  <bind-mcid-suggestion-modal v-model="bindSuggestionModal"/>
  <register-complete-modal v-model="registerCompleteNoticeModal"/>
  <mg-user-actions/>
  <login-modal/>
  <register-modal/>
  <tips-bind-mcid/>
  <term-modal/>
  <term-info-popups/>
</template>

<script lang="ts" setup>
import setLocation from "~/utils/setLocation";
import {
  mdiAccountConvertOutline,
  mdiAccountHeartOutline,
  mdiAccountOffOutline, mdiAlertOutline, mdiCardsPlaying, mdiCreation, mdiCreationOutline,
  mdiEmailEditOutline,
  mdiHome, mdiInformation, mdiInformationVariant, mdiInformationVariantCircle, mdiInformationVariantCircleOutline,
  mdiLinkVariant, mdiLinkVariantPlus, mdiLockReset, mdiLogout,
  mdiMinecraft, mdiPodium, mdiRenameOutline
} from "@mdi/js";
import getUsername from "~/utils/getUsername";
import {navigateTo, useRoute, useState} from "#app";
import {BackendCodes, LocalStorageAuthTokenKey, LocalStorageAuthUsernameKey} from "~/consts";
import playernameToSkin from "~/utils/playernameToSkin";
import {playernameToUUID} from "#imports";
import AvatarSpinner from "~/components/avatar-spinner.vue";
import formatTimeStringFromDate from "../utils/formatTimeStringFromDate";
import MgUserActions from "~/components/modal-groups/mg-user-actions.vue";
import getToken from "~/utils/getToken";
import getAshconResponse from "~/utils/getAshconResponse";
import ContextMenu from "~/components/context-menu.vue";
import BindMcidSuggestionModal from "~/components/bind-mcid-suggestion-modal.vue";
import TipsBindMcid from "~/components/tips-modal/tips-bind-mcid.vue";
import TermModal from "~/components/term-modal.vue";
import TermInfoPopups from "~/components/popup-groups/term-info-popups.vue";
import {useLocalStorage} from "@vueuse/core";

const username = getUsername();
const token = getToken();

const contextMenuEnabled = ref(false);
const contextMenuX = ref(0);
const contextMenuY = ref(0);

const termInformation = useState<Term[]>('term-information', () => [])

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
      loginRecords: [],
      playtime: {
        afk: 0,
        total: 0
      },
      firstLoginRecord: {
        id: -1,
        actionType: false,
        createdAt: "",
        player: "",
        tag: ""
      },
      termsInvolved: []
    },
    uuid: "",
    mcidExist: false,
    hasBoundValidMCID: false,
    loading: true,
    mcidVerified: false,
    playtimeAfkMillis: 0,
    playtimeTotalMillis: 0
  };
});

const someProblemModal = useState('error-modal-state', () => false);
const loginModalState = useState('login-modal');
const errorInformationContent = useState('error-modal-content', () => '');
const userActionsModal = ref(false);
const bindSuggestionModal = ref(false);
const registerCompleteNoticeModal = ref(false);

const modalUserAction_mcid = useState('modal-user-action_mcid', () => false);
const modalUserAction_nickname = useState('modal-user-action-nickname', () => false);
const modalUserAction_email = useState('modal-user-action-email', () => false);
const modalUserAction_password = useState('modal-user-action-password', () => false);
const modalUserAction_delete = useState('modal-user-action-delete', () => false);

const userLoginState = useState('user-login-state', () => false);

const firstAccess = useLocalStorage('tisea-first-access-lab', () => true);

async function initTermData() {
  const termResult = await get<Term[]>(`/server/terms`);

  if (termResult.code === BackendCodes.OK) {
    Object.assign(termInformation.value, termResult.data)
  } else {
    someProblemModal.value = true;
    errorInformationContent.value = JSON.stringify(termResult);
    return;
  }
}

async function initUserData() {
  if (username.value === '' || token.value === '') {
    userLoginState.value = false;
    userInformation.value.loading = false;
    return;
  }

  const result = await get(`/auth/check?token=${token.value}`);

  userLoginState.value = result.code === BackendCodes.OK;

  if (!userLoginState.value) return;

  const userResult = await get<User>(`/user/profile?username=${username.value}`);

  if (userResult.code !== BackendCodes.OK) {
    someProblemModal.value = true;
    errorInformationContent.value = JSON.stringify(userResult);
    return;
  } else {
    Object.assign(userInformation.value, userResult.data);

    if (userInformation.value.mcid.length > 0) {
      const ashconResp = await getAshconResponse(userInformation.value.mcid);
      userInformation.value.mcidExist = ashconResp.code !== 404;
      userInformation.value.hasBoundValidMCID = userInformation.value.mcidExist && userInformation.value.mcidVerified;

      const skinResp = await playernameToSkin(userInformation.value.mcid);
      if (skinResp) userInformation.value.skinBase64 = skinResp.data;
      userInformation.value.uuid = await playernameToUUID(userInformation.value.mcid);

      const loginTotalCountResp = await get<number>(`/user/stats/login/total?username=${userInformation.value.username}`);
      if (loginTotalCountResp.code === BackendCodes.OK) {
        userInformation.value.analytics.loginCount = loginTotalCountResp.data;
      }

      const loginRecordsResp = await get<LoginRecord[]>(`/user/stats/login?username=${userInformation.value.username}`);
      if (loginRecordsResp.code === BackendCodes.OK) {
        Object.assign(userInformation.value.analytics.loginRecords, loginRecordsResp.data);
      }

      const playtimeRecordResp = await get<PlaytimeRecord>(`/user/stats/playtime?username=${userInformation.value.username}`);
      if (playtimeRecordResp.code === BackendCodes.OK) {
        userInformation.value.analytics.playtime.total = playtimeRecordResp.data.total;
        userInformation.value.playtimeTotalMillis = playtimeRecordResp.data.total * 1000;
        userInformation.value.analytics.playtime.afk = playtimeRecordResp.data.afk;
        userInformation.value.playtimeAfkMillis = playtimeRecordResp.data.afk * 1000;
      }

      const firstLoginRecordResp = await get<LoginRecord>(`/user/first-login?username=${userInformation.value.username}`);
      if (firstLoginRecordResp.code === BackendCodes.OK) {
        Object.assign(userInformation.value.analytics.firstLoginRecord, firstLoginRecordResp.data);
      }

      const termsInvolvedResp = await get<Term[]>(`/user/terms-involved?username=${userInformation.value.username}`);
      if (termsInvolvedResp.code === BackendCodes.OK) {
        Object.assign(userInformation.value.analytics.termsInvolved, termsInvolvedResp.data);
      }
    }
  }

  userInformation.value.loading = false;
}

const afterRegisterNoticeConfig = getAfterRegisterNoticeConfig();

async function initPage() {
  await initTermData();
  await initUserData();

  if (afterRegisterNoticeConfig.value.ready) {
    if (afterRegisterNoticeConfig.value.mcid === true) {
      registerCompleteNoticeModal.value = true;
    } else {
      bindSuggestionModal.value = true;
    }

    afterRegisterNoticeConfig.value.ready = false;
  }

  if (firstAccess.value && useRoute().path !== '/hello' && !userLoginState.value) {
    navigateTo('/hello');
    firstAccess.value = false;
    return;
  }

  if (useRoute().meta.requireLogin === true) {
    if (!userLoginState.value) {
      loginModalState.value = true;
    }
  }
}

onMounted(() => {
  initPage();
});

onUpdated(() => {
  initPage();
});

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
  },
  {
    name: "周目",
    route: "/terms",
    icon: mdiCardsPlaying
  },
  {
    name: "你好",
    route: "/hello",
    icon: mdiCreation,
    hidden: true
  },
  {
    name: "关于",
    route: "/about",
    icon: mdiInformationVariantCircle,
    hidden: true
  }
]

function handleUserAvatarContextMenu(e: MouseEvent) {
  e.preventDefault();

  contextMenuX.value = e.x;
  contextMenuY.value = e.y;
  contextMenuEnabled.value = true;
}

function logout() {
  localStorage.removeItem(LocalStorageAuthUsernameKey);
  localStorage.removeItem(LocalStorageAuthTokenKey);
  useRouter().go(0);
}
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
  font-size: 40px;
  .logo-variation;
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
    &.fullWidth {
      width: 100%;
    }

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

        &.mcid-not-verified {
          color: #ff9800;
          background: #fff8e1;
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

<style lang="less">
.anywhere-popup-layer.resource-explanation {
  strong {
    display: inline-flex;
    align-items: center;
    gap: 6px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>