<template>
  <div class="page-terms container">
    <div class="page-title">
      <h1>周目</h1>
      <p>自 ST7 的周目详细信息以及一些统计信息。</p>
    </div>
    <section class="term-analytics">
      <div class="term-a">
        <div class="name">总周目数</div>
        <div class="value"><counter v-if="termInformation.length" :value="termInformation.length"/><span v-else>--</span></div>
      </div>
      <div class="term-a">
        <div class="name">总参与玩家<icon @click="totalInvolvingPlayersPopup = true" :path="mdiHelpCircleOutline"/></div>
        <div class="value"><counter v-if="totalInvolvedPlayers.length" :value="totalInvolvedPlayers.length"/><span v-else>--</span></div>
      </div>
      <div class="term-a">
        <div class="name">总跨度</div>
        <div class="value"><counter v-if="totalOpeningDays" :value="totalOpeningDays"/><span v-else>--</span>d</div>
      </div>
      <div class="term-a">
        <div class="name">资金消耗<icon @click="consumptionPopup = true" :path="mdiHelpCircleOutline"/></div>
        <div class="value"><counter v-if="totalConsumption.sum" :value="totalConsumption.sum"/><span v-else>--</span><span class="rmb">RMB</span></div>
      </div>
    </section>
    <section class="term-list" v-if="termInformation.length > 0">
      <term-card v-for="x in termInformationReversed" :game-version="x.version" :term-number="tn(x.tag).toString()">
        <template #bind-mcid-btn>
          <btn class="with-bg--primary hover--dim" @click="modalUserAction_mcid = true"><icon :path="mdiLinkVariantPlus"/>立即绑定</btn>
        </template>
      </term-card>
    </section>
    <anywhere-popup class="consumption-popup" :code="false" v-model="consumptionPopup">
      <p>资金消耗的数据来自阿里云，统计的是自 ST1（2022-02）以来的服务器本体计费费用，不包含流量费和网站服务器费用。</p>
      <p>数据更新会随阿里云系统出现延迟，账期截至本月（{{ `${new Date().getFullYear()}-${withLeadingZero(new Date().getMonth()+1)}`}}）。</p>
      <p><strong><icon :path="mdiPercentCircleOutline"/>平均数据</strong></p>
      <ul>
        <li>平均日花费 AVGD=¥{{ (totalConsumption.sum / totalOpeningDays).toFixed(2) }}</li>
        <li>平均周目花费 AVGT=¥{{ (totalConsumption.sum /  termInformation.length).toFixed(2)}}</li>
        <li>平均玩家花费 AVGP=¥{{ (totalConsumption.sum / totalInvolvedPlayers.length).toFixed(2) }}</li>
        <li>平均玩家每日花费 AVGPD=¥{{ (totalConsumption.sum / (totalInvolvedPlayers.length * totalOpeningDays)).toFixed(2) }}</li>
      </ul>
      <p><strong><icon :path="mdiShapeOutline"/>支出分类</strong></p>
      <ul>
        <li>服务器费用 ECS=¥{{ totalConsumption.ecs.toFixed(2) }}</li>
        <li>对象存储费用 OSS=¥{{totalConsumption.oss.toFixed(2)}}</li>
        <li>云盘费用 DISK=¥{{ totalConsumption.yundisk.toFixed(2) }}</li>
      </ul>
      <p><strong><icon :path="mdiHeartOutline"/>捐助相关</strong></p>
      <ul>
        <li>收到的捐助额 DNT=¥{{ totalDonations }} <nuxt-link target="_blank" to="/about">查看所有捐助者<icon :path="mdiLaunch"/></nuxt-link></li>
        <li>扣除捐助额后的总支出 NCT=¥{{ (totalConsumption.sum - totalDonations).toFixed(2) }}</li>
      </ul>
      <p>以上数据准确性截至 {{ refreshTime }}</p>
    </anywhere-popup>
    <anywhere-popup :code="false" v-model="totalInvolvingPlayersPopup">
      <p>该数字为 ST7 以来所有登入过服务器的玩家的数量，不计重复。</p>
    </anywhere-popup>
  </div>
</template>
<script setup lang="ts">
import {useState} from "#app";
import {BackendCodes} from "~/consts";
import getTermPeriod from "~/utils/getTermPeriod";
import TermCard from "~/components/term-card.vue";
import {
  mdiHeartOutline,
  mdiHelpCircleOutline,
  mdiLaunch,
  mdiLinkVariantPlus, mdiPercentCircleOutline, mdiShapeOutline
} from "@mdi/js";
import Counter from "~/components/counter.vue";
import {formatTimeStringFromDate} from "../.nuxt/imports";

const refreshTime = formatTimeStringFromDate(new Date());

const consumptionPopup = ref(false);
const totalInvolvingPlayersPopup = ref(false);

const modalUserAction_mcid = useState('modal-user-action_mcid', () => false);

const termInformation = useState<Term[]>('term-information', () => [])
const termInformationReversed = computed(() => termInformation.value.toReversed());
const totalInvolvedPlayers = ref<ServerPlayer[]>([]);
const totalOpeningDays = computed(() => termInformation.value.map(x => getTermPeriod(x)).reduce((a, b) => a + b, 0))
const totalConsumption = reactive<Consumption>({
  ecs: 0,
  oss: 0,
  yundisk: 0,
  sum: 0
});
const donations = ref<Donation[]>([]);
const totalDonations = computed(() => donations.value.map(x => x.amount).reduce((a, b) => a + b, 0));

async function getTotalInvolvedPlayers() {
  const uniqueResult = await get<ServerPlayer[]>(`/server/involved-players?unique=true`);

  if (uniqueResult.code === BackendCodes.OK) {
    totalInvolvedPlayers.value = uniqueResult.data;
  }
}

async function getTotalConsumptions() {
  const consumptionResult = await get<Consumption>(`/bss/consumption`);

  if (consumptionResult.code === BackendCodes.OK) {
    Object.assign(totalConsumption, consumptionResult.data);
  }
}

async function getDonations() {
  const donationResult  = await get(`/donations`);

  donations.value = donationResult as unknown as Donation[];
}

function getData() {
  getTotalInvolvedPlayers();
  getTotalConsumptions();
  getDonations();
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

.consumption-popup {
  ul {
    padding: 0 0 0 20px;
  }

  strong {
    display: flex;
    align-items: center;
    gap: 4px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
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

      @media (max-width: 1200px) {
        font-size: 32px;
      }

      .rmb {
        font-size: 24px;
        font-weight: normal;
        margin-left: 8px;

        @media (max-width: 1200px) {
          font-size: 16px;
        }
      }
    }
  }
}
</style>