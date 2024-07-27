<template>
  <div class="page-terms container">
    <div class="page-title">
      <h1>周目</h1>
      <p>自 ST7 的周目详细信息以及一些统计信息。</p>
    </div>
    <section class="term-analytics">
      <div class="term-a">
        <div class="name">总周目数</div>
        <div class="value">{{ termInformation.length }}</div>
      </div>
      <div class="term-a">
        <div class="name">总参与玩家<icon @click="totalInvolvingPlayersPopup = true" :path="mdiHelpCircleOutline"/></div>
        <div class="value">{{ totalInvolvedPlayers.length }}</div>
      </div>
      <div class="term-a">
        <div class="name">总跨度</div>
        <div class="value">{{ totalOpeningDays }}d</div>
      </div>
      <div class="term-a">
        <div class="name">资金消耗<icon @click="consumptionPopup = true" :path="mdiHelpCircleOutline"/></div>
        <div class="value">{{ totalConsumption }}<span class="rmb">RMB</span></div>
      </div>
    </section>
    <section class="term-list" v-if="termInformation.length > 0">
      <term-card v-for="x in termInformationReversed" :game-version="x.version" :term-number="tn(x.tag).toString()">
        <template #bind-mcid-btn>
          <btn class="with-bg--primary hover--dim" @click="modalUserAction_mcid = true"><icon :path="mdiLinkVariantPlus"/>立即绑定</btn>
        </template>
      </term-card>
    </section>
    <anywhere-popup :code="false" v-model="consumptionPopup">
      <p>资金消耗的数据来自阿里云，统计的是自 ST1（2022-02）以来的服务器本体计费费用，不包含流量费、对象存储费以及网站服务器费用。</p>
    </anywhere-popup>
    <anywhere-popup :code="false" v-model="totalInvolvingPlayersPopup">
      <p>该数字为 ST7 以来所有登入过服务器的玩家的数量，不计重复。</p>
    </anywhere-popup>
  </div>
</template>
<script setup lang="ts">
import {useState} from "#app";
import {BackendCodes, PeriodTag} from "~/consts";
import getTermPeriod from "~/utils/getTermPeriod";
import TermCard from "~/components/term-card.vue";
import {mdiHelpCircleOutline, mdiLinkVariantPlus} from "@mdi/js";

const consumptionPopup = ref(false);
const totalInvolvingPlayersPopup = ref(false);

const modalUserAction_mcid = useState('modal-user-action_mcid', () => false);

const termInformation = useState<Term[]>('term-information', () => [])
const termInformationReversed = computed(() => termInformation.value.toReversed());
let totalInvolvedPlayers = ref<ServerPlayer[]>([]);
const totalOpeningDays = computed(() => termInformation.value.map(x => getTermPeriod(x)).reduce((a, b) => a + b, 0))
const totalConsumption = ref(0);

async function getTotalInvolvedPlayers() {
  const uniqueResult = await get<ServerPlayer[]>(`/api/server/involved-players?unique=true`);

  if (uniqueResult.code === BackendCodes.OK) {
    totalInvolvedPlayers.value = uniqueResult.data;
  }
}

async function getTotalConsumptions() {
  const consumptionResult = await get<number>(`/api/bss/consumption`);

  if (consumptionResult.code === BackendCodes.OK) {
    totalConsumption.value = consumptionResult.data;
  }
}

function getData() {
  getTotalInvolvedPlayers();
  getTotalConsumptions();
}

onMounted(() => {
  getData();
})
</script>

<style lang="less" scoped>
@import "assets/var";

.page-terms {
  padding: 32px 0;
}

.term-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.term-analytics {
  display: flex;
  align-items: center;
  gap: 16px;

  .term-a {
    width: 25%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
    padding: 16px;
    border-radius: 20px;

    .name {
      padding-bottom: 8px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;

      svg {
        width: 16px;
        height: 16px;
        cursor: pointer;
      }
    }

    .value {
      font-weight: bold;
      color: @primaryd;
      font-size: 38px;

      .rmb {
        font-size: 24px;
        font-weight: normal;
        margin-left: 8px;
      }
    }
  }
}
</style>