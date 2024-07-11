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
        <div class="user-information">

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
</template>

<script lang="ts" setup>
import setLocation from "~/utils/setLocation";
import {mdiCompare, mdiHome, mdiMinecraft} from "@mdi/js";
import getUsername from "~/utils/getUsername";
import {useState} from "#app";
import {BackendCodes} from "~/consts";
import playernameToSkin from "~/utils/playernameToSkin";

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
    }
  };
});

const someProblemModal = ref(false);
const errorInformationContent = ref('');

async function initUser() {
  const userResult = await get<User>(`/api/user/profile/${username.value}`);
  if (userResult.code !== BackendCodes.OK) {
    someProblemModal.value = true;
    errorInformationContent.value = JSON.stringify(userResult);
  } else {
    Object.assign(userInformation.value, userResult.data)
    const skinRes = await playernameToSkin(userInformation.value.mcid);
    userInformation.value.skinBase64 = skinRes.data;
  }

  const loginCountRes = await get<number>(`/api/user/stats/login/count?username=${username.value}`);
  if (loginCountRes.code === BackendCodes.OK) userInformation.value.analytics.loginCount = loginCountRes.data;

  const playtimeRes = await get<UserStatsPlaytime>(`/api/user/stats/playtime?username=${username.value}`);
  if (playtimeRes.code === BackendCodes.OK) {
    userInformation.value.analytics.playtime.total = playtimeRes.data.total;
    userInformation.value.analytics.playtime.afk = playtimeRes.data.afk;
  }
}

onMounted(() => {
  initUser();
})

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
</style>

<style lang="less">
@import "@/assets/var.less";

main {
  padding-top: @navbar-height;
}
</style>