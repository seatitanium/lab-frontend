<template>
  <modal v-model="model" class="with-bg--darken term-modal">
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
            {{ currentTerm.type }} / {{ currentTerm.created }} / {{ currentTerm.author }} ·
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
      <section class="player-list">
        <player-avatar v-for="x in currentTermPlayers" :uuid="x.uuid" :name="x.name" hover-name steve/>
      </section>
    </modal-content>
    <modal-actions class="right">
      <btn class="with-bg--primary hover--dim" @click="model = false">关闭</btn>
    </modal-actions>
  </modal>
  <anywhere-popup v-model="involvementIndexExplanationPopup" :code="false">
    <p><strong>参与指数</strong>是该周目<strong>参与人数</strong>与<strong>跨度</strong>（结束时间减去起始时间的天数）的比值，该比值的范围为 >= 0。该比值越大，认为该周目的参与度越高。</p>
    <p>请注意，参与指数只能作为一个粗略的参考。在当前的系统下，任意登入操作均会被认定为一次参与，因此该指数并未排除游玩时间过短的玩家。我们将在以后改进这一点。</p>
  </anywhere-popup>
</template>
<script setup lang="ts">
import {mdiCardsPlaying, mdiHelpCircleOutline, mdiLaunch, mdiPlus} from "@mdi/js";
import TermIcon from "~/components/term-icon.vue";
import {useState} from "#app";
import {BackendCodes} from "~/consts";
import formatSecondsDays from "../utils/formatSecondsDays";

const termModalNum = useState('term-modal-num', () => '7');
const model = useState('term-modal');

const termInformation = useState<Term[]>('term-information', () => [])
const currentTerm = computed(() => termInformation.value.filter(x => x.tag === `st${termModalNum.value}`)[0])
const currentTermPeriod = computed(() => (currentTerm.value.endAt ? new Date(currentTerm.value.endAt) : new Date()).getTime() - new Date(currentTerm.value.startAt).getTime())
let currentTermPlayers = ref<ServerPlayer[]>([])

const involvementIndexExplanationPopup = ref(false);

async function getCurrentTermServerPlayers() {
  const result = await get<ServerPlayer[]>(`/api/server/involved-players?term=${termModalNum.value}`);

  if (result.code === BackendCodes.OK) {
    currentTermPlayers.value = result.data;
  }
}

watch(termModalNum, () => {
  currentTermPlayers.value = [];
  getCurrentTermServerPlayers();
}, {
  immediate: true
})
</script>

<style lang="less" scoped>
@import "assets/var";

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