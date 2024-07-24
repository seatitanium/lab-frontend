<template>
  <modal v-model="modalPlaytime" class="with-bg--darken describe">
    <modal-content>
      <icon color="#009688" :path="mdiClockStarFourPointsOutline"/>
      <h2>{{ userInformation.mcid }} 在 {{ PeriodTag.toUpperCase() }} 的游玩时长数据</h2>
      <div class="playtime">
        <div class="time">{{ formatSecondsDense(userInformation.playtimeTotalMillis) }}</div>
        <div class="text">总在线时长</div>
      </div>
      <div class="playtime">
        <div class="time">{{ formatSecondsDense(userInformation.playtimeAfkMillis) }}</div>
        <div class="text">挂机时长</div>
      </div>
      <div class="playtime">
        <div class="time">{{
            formatSecondsDense(userInformation.playtimeTotalMillis - userInformation.playtimeAfkMillis)
          }}
        </div>
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
  <modal v-model="modalLoginRecord" class="with-bg--darken">
    <modal-title>游戏登入/登出记录</modal-title>
    <modal-content>
      <p>这里显示了最近 {{ userInformation.analytics.loginRecords.length }} 次 {{ userInformation.mcid }} 玩家的登入或者登出记录，如果你发现有任何异常，请及时联系管理员。</p>
      <block class="with-bg--primary">
        <icon :path="mdiInformationOutline"/>
        <p><strong>提示</strong>：有时会出现登入和登出不相邻的状况，这是服务器异常关闭所致，此情形可忽略。</p>
      </block>
      <table>
        <thead>
        <tr>
          <th>操作</th>
          <th>时间</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="x in userInformation.analytics.loginRecords">
          <td>{{ x.actionType ? "登入" : "登出" }}</td>
          <td>{{ formatTimeStringFromString(x.createdAt) }}</td>
        </tr>
        </tbody>
      </table>
    </modal-content>
    <modal-actions class="right">
      <btn class="with-bg--primary hover--dim" @click="modalLoginRecord = false">关闭</btn>
    </modal-actions>
  </modal>
  <modal v-model="modalTermsInvolved" class="with-bg--darken describe">
    <modal-content>
      <icon color="#009688" :path="mdiGamepadVariantOutline"/>
      <h2>{{ userInformation.mcid }} 参与过的周目</h2>
      <div class="term-group">
        <term-icon v-for="x in userInformation.analytics.termsInvolved" :num="x.tag.slice(2)"/>
      </div>
      <p>共参与了 {{ userInformation.analytics.termsInvolved.length }}/{{ getTermCount() }} 个周目</p>
    </modal-content>
    <modal-actions class="right">
      <btn class="with-bg--primary hover--dim" @click="modalTermsInvolved = false">关闭</btn>
    </modal-actions>
  </modal>
  <modal v-model="modalFirstLogin" class="with-bg--darken describe">
    <modal-content>
      <Seati/>
      <h2>{{ userInformation.mcid }} 的首次登入时间</h2>
      <block class="with-bg--primary">
        <icon :path="mdiInformationOutline"/>
        <p>统计数据自 <term-icon class="text" num="7"/> 开始，不包含先前数据。<strong>2023-06</strong> 为最早首次登入时间。</p>
      </block>
      <p>{{ userInformation.mcid }} 于 {{ formatTimeStringFromStringPartialYM(userInformation.analytics.firstLoginRecord.createdAt) }} 首次登入 Seati 服务器</p>
    </modal-content>
    <modal-actions class="right">
      <btn class="with-bg--primary hover--dim" @click="modalFirstLogin = false">关闭</btn>
    </modal-actions>
  </modal>
</template>
<script setup lang="ts">
import {mdiClockStarFourPointsOutline, mdiGamepadVariantOutline, mdiInformationOutline, mdiLogin} from "@mdi/js";
import formatSecondsDense from "~/utils/formatSecondsDense";
import {useState} from "#app";
import Seati from 'assets/icons/seati/seati.svg'
import formatTimeStringFromStringPartialYM from "~/utils/formatTimeStringFromStringPartialYM";
import {PeriodTag} from "~/consts";
import getTermCount from "../../utils/getTermCount";

const userInformation = useState<UserExtended>('user-data');

const modalPlaytime = useState('modal-playtime', () => false);
const anypopPlaytimeDescription = ref(false);

const modalLoginRecord = useState('modal-login-record', () => false);

const modalTermsInvolved = useState('modal-terms-involved', () => false);

const modalFirstLogin = useState('modal-first-login', () => false);
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

.term-group {
  font-size: 36px;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}
</style>