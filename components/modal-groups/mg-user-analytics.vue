<template>
  <modal v-model="modalPlaytime" class="with-bg--darken describe">
    <modal-content>
      <icon color="#009688" :path="mdiClockStarFourPointsOutline"/>
      <h2>{{ userInformation.mcid }} 的游玩时长数据</h2>
      <div class="playtime">
        <div class="time">{{ formatSecondsDense(userInformation.playtimeTotalMillis) }}</div>
        <div class="text">总在线时长</div>
      </div>
      <div class="playtime">
        <div class="time">{{ formatSecondsDense(userInformation.playtimeAfkMillis) }}</div>
        <div class="text">挂机时长</div>
      </div>
      <div class="playtime">
        <div class="time">{{ formatSecondsDense(userInformation.playtimeTotalMillis - userInformation.playtimeAfkMillis) }}</div>
        <div class="text">有效时长</div>
      </div>
      <p>以上数据有效性截至页面刷新时间</p>
    </modal-content>
    <modal-actions>
      <btn class="with-bg--primary hover--dim" @click="modalPlaytime = false">确定</btn>
      <btn class="with-bg--white hover--dim" @click="anypopPlaytimeDescription = true">了解更多</btn>
    </modal-actions>
  </modal>
  <anywhere-popup v-model="anypopPlaytimeDescription" :code="false">
    <p>Seati
      会自动计算你的游玩时长数据，并存储在专用的数据库中。其中包含了<strong>总在线时长</strong>和<strong>挂机时长</strong>，<strong>有效时长</strong>为两者之差。
    </p>
    <p>Seati 的各种权益仅以<strong>有效时长</strong>为依据。</p>
  </anywhere-popup>
</template>
<script setup lang="ts">
import {mdiClockStarFourPointsOutline} from "@mdi/js";
import formatSecondsDense from "~/utils/formatSecondsDense";
import {useState} from "#app";

const modalPlaytime = useState('modal-playtime', () => false);
const userInformation = useState<UserExtended>('user-data');
const anypopPlaytimeDescription = ref(false);

</script>

<style lang="less" scoped>
@import "assets/var";

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
</style>