<template>
  <div class="page-board container">
    <div class="page-title">
      <h1>排行榜</h1>
      <p>在这里查看当前周目（{{ PeriodTag.toUpperCase() }}）所有玩家的排行数据汇总</p>
      <block class="with-bg--primary no-margin-bottom">
        <icon :path="mdiCheckDecagramOutline"/>
        此页面的数据准确性截至 {{ formatTimeStringFromDate(new Date()) }}
      </block>
    </div>
    <section>
      <div class="empty" v-if="loginRecordBoard.length === 0 && playtimeBoard.length === 0">
        <circle-spinner size="20"/>
      </div>
    </section>
    <section>
      <transition name="flow">
        <card class="narrow" v-if="playtimeBoard.length > 0">
          <card-label>
            <icon :path="mdiClockOutline"/>
            有效时长
          </card-label>
          <card-content>
            <table>
              <thead>
              <tr>
                <th>名次</th>
                <th v-for="x in Object.values(playtimeBoardTableHeads)">{{ x }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(x, i) in playtimeBoard">
                <td>
                  <div class="cell">
                    {{ i + 1 }}
                  </div>
                </td>
                <td v-for="y in Object.keys(playtimeBoardTableHeads)">
                  <div class="cell">
                    <player-avatar v-if="y === 'player'" :name="x[y]"/>
                    {{ y.startsWith('time') ? formatSecondsDense(x[y] * 1000) : x[y] }}
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </card-content>
        </card>
      </transition>
    </section>
    <section>
      <transition name="flow">
        <card class="narrow" style="transition-delay: .2s" v-if="loginRecordBoard.length > 0">
          <card-label>
            <icon :path="mdiLogin"/>
            登入次数
          </card-label>
          <card-content>
            <table>
              <thead>
              <tr>
                <th>名次</th>
                <th v-for="x in Object.values(loginBoardTableHeads)">{{ x }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(x, i) in loginRecordBoard">
                <td>
                  <div class="cell">
                    {{ i + 1 }}
                  </div>
                </td>
                <td v-for="y in Object.keys(loginBoardTableHeads)">
                  <div class="cell">
                    <player-avatar v-if="y === 'player'" :name="x[y]"/>
                    {{ y === 'lastCreatedAt' ? formatTimeStringFromString(x[y]) : x[y] }}
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </card-content>
        </card>
      </transition>
    </section>
  </div>
</template>

<script lang="ts" setup>
import {mdiCheckDecagramOutline, mdiClock, mdiClockOutline, mdiLogin, mdiTagOutline, mdiUpdate} from "@mdi/js";
import {BackendCodes, PeriodTag} from "~/consts";
import {definePageMeta} from "#imports";

const loginBoardTableHeads = {
  'player': '玩家',
  'count': '登入次数',
  'lastCreatedAt': '最后登入时间'
}

const playtimeBoardTableHeads = {
  'player': '玩家',
  'timeValid': '有效时长',
  'timeAfk': '挂机时长',
  'timeTotal': '总游玩时长',
}

const loginRecordBoard = reactive<LoginRecordBoard[]>([]);
const playtimeBoard = reactive<PlaytimeBoard[]>([]);

async function getLoginBoard() {
  const result = await get<LoginRecordBoard[]>(`/server/board/login?tag=${PeriodTag}`);

  if (result.code === BackendCodes.OK) {
    result.data.sort((a, b) => b.count - a.count);
    Object.assign(loginRecordBoard, result.data);
  }
}

async function getPlaytimeBoard() {
  const result = await get<PlaytimeBoard[]>(`/server/board/playtime?tag=${PeriodTag}`);

  if (result.code === BackendCodes.OK) {
    result.data.forEach(x => x.timeValid = x.timeTotal - x.timeAfk);
    Object.assign(playtimeBoard, result.data);
  }
}

onMounted(() => {
  getLoginBoard();
  getPlaytimeBoard();
})

definePageMeta({
  title: '排行榜'
})
</script>

<style lang="less" scoped>
@import "assets/var";

.page-board {
  padding: 32px 0;
}

.cell {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 32px;
}
</style>

<style lang="less">
.page-board {
  .player-avatar img {
    height: 20px;
  }
}
</style>