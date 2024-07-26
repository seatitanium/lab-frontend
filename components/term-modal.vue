<template>
  <modal v-model="model" class="with-bg--darken term-modal" with-close-btn>
    <modal-content>
      <div class="term-title">
        <nuxt-img :src="currentTerm.image" v-if="currentTerm.image"/>
        <div class="right">
          <h2>
            <term-icon no-click :num="termModalNum"/>
            <span>{{ currentTerm.theme }} <small v-if="currentTerm.themeAlt">{{ currentTerm.themeAlt }}</small></span>
            <span class="badge" v-if="currentTerm.packVersion"><span class="v">v</span>{{currentTerm.packVersion}}</span>
          </h2>
          <div class="meta">
            <span class="active" v-if="!currentTerm.endAt"><icon
                :path="mdiCardsPlaying"/>进行中</span>
            {{ currentTerm.type }} / {{ currentTerm.created }} 发布 / {{ currentTerm.author }} 制作 ·
            <a :href="currentTerm.link" target="_blank" v-if="currentTerm.link">在 MCMOD 中打开<icon :path="mdiLaunch"/></a>
          </div>
        </div>
      </div>
      <section class="term-data">
        <div class="item">
          <h2>{{ currentTerm.startAt }}</h2>
          <small>开始时间</small>
        </div>
        <div class="item" v-if="currentTerm.endAt">
          <h2>{{ currentTerm.endAt }}</h2>
          <small>结束时间</small>
        </div>
        <div class="item">
          <h2>{{ formatSecondsDays(currentTermPeriod) }}</h2>
          <small>跨度</small>
        </div>
        <div class="item">
          <h2>{{ currentTermPlayers.length }}</h2>
          <small>参与人数</small>
        </div>
        <div class="item">
          <h2>{{ (currentTermPlayers.length / parseInt(formatSecondsDays(currentTermPeriod).substring(-1))).toFixed(2) }}</h2>
          <small>参与指数 <icon @click="involvementIndexExplanationPopup = true" :path="mdiHelpCircleOutline"/></small>
        </div>
      </section>
      <p>玩家列表&emsp;<span v-for="(x, i) in currentTermPlayers"><a :href="`https://namemc.com/profile/${x.uuid}`" target="_blank">{{ x.name }}</a><span v-if="i !== currentTermPlayers.length - 1">, </span></span></p>
      <section class="player-list">
        <player-avatar v-for="x in currentTermPlayers" :uuid="x.uuid" :name="x.name" hover-name steve/>
      </section>
      <section class="download-group" v-if="userInformation.hasBoundValidMCID">
        <p>已上传资源<icon @click="resourcesExplanationPopup = true" :path="mdiHelpCircleOutline"/></p>
        <inline-download-btn v-if="currentTerm.downloads.pack.name" :term="currentTerm.tag" :file="currentTerm.downloads.pack" type="整合包"/>
        <inline-download-btn v-if="currentTerm.downloads.mods.name" :term="currentTerm.tag" :file="currentTerm.downloads.mods" type="模组包"/>
        <inline-download-btn v-if="currentTerm.downloads.world.name" :term="currentTerm.tag" :file="currentTerm.downloads.world" type="存档"/>
      </section>
      <section class="download-group" v-else>
        <p>绑定 Minecraft ID 后可免费下载周目资源</p>
        <btn class="with-bg--primary hover--dim" small @click="model = false; modalUserAction_mcid = true"><icon :path="mdiLinkVariantPlus"/> 立即绑定</btn>
      </section>
    </modal-content>
  </modal>
  <anywhere-popup v-model="involvementIndexExplanationPopup" :code="false">
    <p><strong>参与指数</strong>是该周目<strong>参与人数</strong>与<strong>跨度</strong>（结束时间减去起始时间的天数）的比值，该比值的范围为 >= 0。该比值越大，认为该周目的参与度越高。</p>
    <p>请注意，参与指数只能作为一个粗略的参考。在当前的系统下，任意登入操作均会被认定为一次参与，因此该指数并未排除游玩时间过短的玩家。我们将在以后改进这一点。</p>
  </anywhere-popup>
  <anywhere-popup class="resource-explanation" v-model="resourcesExplanationPopup" :code="false">
    <p>在每个周目结束以后，其存档和相关数据都会被封存保留，但不会再重新以服务器的形式出现。在这里我们提供了原文件供给<strong>绑定了 Minecraft ID 的玩家</strong>下载。</p>
    <p><strong>整合包 <icon :path="mdiPackageVariant"/></strong> —— 该周目所使用的整合包，其版本与当时的存档所对应。</p>
    <p><strong>模组包 <icon :path="mdiWrenchOutline"/></strong> —— 从该模组的服务端或者客户端（整合包安装后）中提取出的模组集合，可用于启动存档。考虑到许多整合包具有私有的改动成分，单靠安装模组包并不一定能够正常游玩过往存档。</p>
    <p><strong>存档 <icon :path="mdiEarth"/></strong> —— 该周目最新版本的世界存档，为 world 文件夹压缩而来，可在相应版本的 Minecraft 中启动。</p>
  </anywhere-popup>
</template>
<script setup lang="ts">
import {
  mdiCardsPlaying,
  mdiDownloadOutline, mdiEarth,
  mdiHelpCircleOutline,
  mdiLaunch, mdiLinkVariantPlus,
  mdiPackageVariant,
  mdiPlus, mdiWrenchOutline
} from "@mdi/js";
import TermIcon from "~/components/term-icon.vue";
import {useState} from "#app";
import {BackendCodes} from "~/consts";
import formatSecondsDays from "../utils/formatSecondsDays";
import InlineDownloadBtn from "~/components/inline-download-btn.vue";

const termModalNum = useState('term-modal-num', () => '7');
const model = useState('term-modal');

const termInformation = useState<Term[]>('term-information', () => [])
const currentTerm = computed(() => termInformation.value.filter(x => x.tag === `st${termModalNum.value}`)[0])
const currentTermPeriod = computed(() => (currentTerm.value.endAt ? new Date(currentTerm.value.endAt) : new Date()).getTime() - new Date(currentTerm.value.startAt).getTime())
let currentTermPlayers = ref<ServerPlayer[]>([])

const involvementIndexExplanationPopup = ref(false);
const resourcesExplanationPopup = ref(false);

const userInformation = useState<UserExtended>('user-data');
const modalUserAction_mcid = useState('modal-user-action_mcid', () => false);

async function getCurrentTermServerPlayers() {
  const result = await get<ServerPlayer[]>(`/api/server/involved-players?term=${termModalNum.value}`);

  if (result.code === BackendCodes.OK) {
    currentTermPlayers.value = result.data;
  }
}

watch(termModalNum, () => {
  currentTermPlayers.value = [];
  getCurrentTermServerPlayers();
  console.log(currentTerm.value)
}, {
  immediate: true
})
</script>

<style lang="less" scoped>
@import "assets/var";

.resource-explanation {
  strong {
    display: inline-flex;
    align-items: center;
    gap: 4px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
}

.active {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: @primaryd;
  font-weight: bold;
  &::after {
    content: "·";
    font-weight: normal;
    color: black;
  }
}

.term-modal .modal {
  min-width: 800px;
}

.term-title {
  display: flex;
  align-items: center;
  gap: 16px;

  img {
    height: 85px;
    width: 85px;
    object-fit: cover;
    border-radius: 10px;
  }

  .right {
    h2 {
      font-size: 40px;
      margin: 0;
      line-height: 1.7;
      display: flex;
      align-items: center;
      gap: 16px;

      .badge {
        font-size: 20px;
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: 50px;
        padding: 0 12px;
        .v {
          font-weight: normal;
        }
      }

      small {
        font-size: 20px;
        font-variation-settings: 'wght' 400;
      }
    }

    .meta {
      font-size: 16px;
      font-weight: normal;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}

.download-group {
  display: flex;
  align-items: center;
  margin: 16px 0;
  gap: 16px;

  p {
    display: flex;
    align-items: center;
    gap: 4px;

    svg {
      width: 20px;
      cursor: pointer;
    }
  }
}

.term-data {
  margin: 16px 0;
  display: flex;
  align-items: center;
  column-gap: 32px;
  flex-wrap: wrap;

  .item {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }

  h2 {
    font-size: 32px;
    color: @primaryd;
    margin: 8px 0;
  }

  small {
    font-size: 16px;
    font-weight: normal;
    display: inline-flex;
    align-items: center;
    gap: 4px;

    svg {
      width: 20px;
      cursor: pointer;

    }
  }
}

.player-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .loading, .player-avatar {
    width: 14.28571% !important;
  }
}
</style>