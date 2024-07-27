<template>
  <div class="term-info">
    <div class="term-title">
      <nuxt-img class="term-image" :src="currentTerm.image" v-if="currentTerm.image"/>
      <div class="right">
        <h2>
          <term-icon no-click :num="num || termNumber || '7'"/>
          <span>{{ currentTerm.theme }} <small v-if="currentTerm.themeAlt">{{ currentTerm.themeAlt }}</small></span>
          <span class="badge" v-if="currentTerm.packVersion"><span class="v">v</span>{{currentTerm.packVersion}}</span>
        </h2>
        <div class="meta">
            <span class="active" v-if="!currentTerm.endAt"><icon
                :path="mdiCardsPlaying"/>进行中</span>
          {{ currentTerm.type }} / {{ currentTerm.created }} 年 / {{ currentTerm.author }} 制作 <span v-if="currentTerm.link">·</span>
          <a :href="currentTerm.link" target="_blank" v-if="currentTerm.link">在 MCMOD 中打开<icon :path="mdiLaunch"/></a>
          <slot v-if="displayTurnToTermsPage" name="turn-to-terms-btn"/>
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
    </section>
    <p>玩家列表&emsp;<span v-for="(x, i) in currentTermPlayers"><a :href="`https://namemc.com/profile/${x.uuid}`" target="_blank">{{ x.name }}</a><span v-if="i !== currentTermPlayers.length - 1">, </span></span></p>
    <section class="player-list" :class="{'narrow-avatars': narrowAvatars}">
      <player-avatar :hover-scale="narrowAvatars" v-for="x in currentTermPlayers" :uuid="x.uuid" :name="x.name" hover-name steve/>
    </section>
    <section class="download-group" v-if="userInformation.hasBoundValidMCID">
      <p>已上传资源<icon @click="termResourcesExplanationPopup = true" :path="mdiHelpCircleOutline"/></p>
      <inline-download-btn v-if="currentTerm.downloads.pack.name" :term="currentTerm.tag" :file="currentTerm.downloads.pack" type="整合包"/>
      <inline-download-btn v-if="currentTerm.downloads.mods.name" :term="currentTerm.tag" :file="currentTerm.downloads.mods" type="模组包"/>
      <inline-download-btn v-if="currentTerm.downloads.world.name" :term="currentTerm.tag" :file="currentTerm.downloads.world" type="存档"/>
    </section>
    <section class="download-group" v-else>
      <p>绑定 Minecraft ID 后可免费下载周目资源</p>
      <slot name="bind-mcid-btn"/>
    </section>
  </div>
</template>
<script setup lang="ts">
import {
  mdiCardsPlaying, mdiHelpCircleOutline,
  mdiLaunch
} from "@mdi/js";
import formatSecondsDays from "~/utils/formatSecondsDays";
import InlineDownloadBtn from "~/components/inline-download-btn.vue";
import TermIcon from "~/components/term-icon.vue";
import {useState} from "#app";
import {BackendCodes} from "~/consts";

const num = defineModel<string>('num')

const props = defineProps({
  termNumber: {
    type: String
  },
  narrowAvatars: {
    type: Boolean,
    default: false
  },
  displayTurnToTermsPage: {
    type: Boolean,
    default: false
  }
})

const termInformation = useState<Term[]>('term-information', () => [])
const currentTerm = computed(() => termInformation.value.filter(x => x.tag === `st${num.value || props.termNumber}`)[0])
const currentTermPeriod = computed(() => (currentTerm.value.endAt ? new Date(currentTerm.value.endAt) : new Date()).getTime() - new Date(currentTerm.value.startAt).getTime())
let currentTermPlayers = ref<ServerPlayer[]>([])

const termResourcesExplanationPopup = useState('popup-term-resources-explanation', () => false);

const userInformation = useState<UserExtended>('user-data');

async function getCurrentTermServerPlayers() {
  const result = await get<ServerPlayer[]>(`/api/server/involved-players?term=${num.value || props.termNumber}`);

  if (result.code === BackendCodes.OK) {
    currentTermPlayers.value = result.data;
  }
}

watch(num, () => {
  currentTermPlayers.value = [];
  getCurrentTermServerPlayers();
}, {
  immediate: true
})
</script>

<style lang="less" scoped>
@import "assets/var";

.term-image {
  box-shadow: 0 5px 0 rgba(0, 0, 0, .1);
}

.term-info {
  position: relative;
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

  &.narrow-avatars {
    .loading, .player-avatar {
      width: 5%;
    }
  }

  &:not(.narrow-avatars) {
    .loading, .player-avatar {
      width: 14.28571% !important;
    }
  }
}
</style>