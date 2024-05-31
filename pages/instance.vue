<template>
  <div class="page-instance container">
    <section class="section__inst_basic_information">
      <h1 class="ip">192.168.88.12
        <btn class="small with-border without-bg--primary">单击复制
          <icon :path="mdiClipboardTextOutline"/>
        </btn>
      </h1>
      <metabar>
        <metabar-item class="instance-status">
          <span class="center">
            <icon :path="mdiCheckAll"/>
          在线
          </span>
        </metabar-item>
        <metabar-item>
          <span class="left">
            <icon :path="mdiClockOutline"/>
          最近更新
          </span>
          <span class="right">
            2024-05-31 20:54:02
          </span>
        </metabar-item>
      </metabar>
    </section>
    <section class="section__inst_control">
      <card class="narrow without-border">
        <card-content class="server-actions">
          <btn class="with-bg--primaryDark hover--dropShadow">
            <icon :path="mdiCreationOutline"/>
            开启服务器
          </btn>
          <btn class="without-bg--primary with-border hover--dim">
            <icon :path="mdiRestart"/>
            重启
          </btn>
          <btn class="without-bg--primary with-border hover--dim">
            <icon :path="mdiClose"/>
            关机
          </btn>
          <btn class="without-bg--primary with-border hover--dim">
            <icon :path="mdiCloseOctagonOutline"/>
            强制停机
          </btn>
        </card-content>
      </card>
    </section>
    <section class="section__online_players">
      <card class="narrow">
        <card-title class="display">
          <icon :path="mdiAccountGroupOutline"/>
          在线玩家 (10)
          <small>ST13 历史最高 · 25</small>
        </card-title>
        <card-content>
          <div class="players">
            <div class="player" v-for="x in onlinePlayers">
              <div class="avatar">
                <player-avatar :name="x"/>
              </div>
              {{ x }}
            </div>
          </div>
        </card-content>
      </card>
    </section>
    <section class="section__instant_message">
      <card class="narrow">
        <card-title class="display">
          <icon :path="mdiMessageTextOutline"/>
          服内聊天
        </card-title>
        <card-content>
          <div class="instant-message">
            <div class="instant-message-content" v-text="instantMessageString"/>
            <div class="instant-message-sender-wrapper">
              <div class="instant-message-sender">
                <input :placeholder="`以 ${username} 的身份发送信息...`" v-model="instantMessageToSend"/>
                <btn class="with-bg--primary medium">
                  <icon :path="mdiSend"/>
                  发送
                </btn>
              </div>
            </div>
          </div>
        </card-content>
      </card>
    </section>
  </div>
</template>
<script setup lang="ts">
import {
  mdiAccountGroupOutline, mdiChat, mdiChatOutline,
  mdiCheckAll,
  mdiClipboardTextOutline,
  mdiClockOutline,
  mdiClose,
  mdiCloseOctagonOutline,
  mdiCreationOutline, mdiMessageOutline, mdiMessageText, mdiMessageTextOutline,
  mdiRestart, mdiSend
} from "@mdi/js";
import {getUsername} from "#imports";

const onlinePlayers = reactive([
  'Subilan',
  'Sapherise',
  'constant137',
  'litter_white',
  'JesseM1024',
  'constant137', 'constant137', 'constant137', 'constant137', 'constant137', 'constant137', 'constant137', 'constant137', 'constant137', 'constant137', 'constant137', 'constant137', 'constant137', 'constant137', 'constant137', 'constant137', 'constant137', 'constant137',
])

interface Message {
  sender: string,
  content: string,
  time: string
}

let instantMessages = ref<Message[]>([])
const instantMessageString = ref('');
const instantMessageToSend = ref('');
const username = ref('')

onMounted(() => {
  username.value = getUsername().value;
  instantMessages.value = [{
    sender: 'Subilan',
    content: 'wtf',
    time: '2024-05-30 22:50:39'
  }]
  instantMessageString.value = instantMessages.value.map(x => `[${x.time}] ${x.sender}: ${x.content}`).join('\n');
})
</script>

<style lang="less" scoped>
@import "@/assets/var.less";

.page-instance {
  padding: 32px 0;
}

.ip {
  font-variation-settings: 'MONO' 1;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 40px;
  margin: 8px 0;
}

.instance-status {
  background: #e8f5e9;
  color: #4caf50;
  border-radius: 100px;
  padding: 6px 20px;
}

.server-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.section__inst_control {
  position: fixed;
  bottom: 50px;
  width: 40vw;
  left: 50%;
  transform: translateX(-50%);
  padding: 0;
  z-index: 300;
  background: white;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, .05);
}

.section__online_players .display small {
  color: #bbb;
  font-size: 14px;
  font-weight: normal;
}

.section__instant_message {
  .instant-message {
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 10px;
    padding: 16px;

    .instant-message-content {
      display: block;
      width: 100%;
      white-space: pre-line;
      font-variation-settings: 'MONO' 0.5;
    }

    .instant-message-sender-wrapper {
      display: flex;
      justify-content: center;

      .instant-message-sender {
        display: flex;
        align-items: center;
        gap: 16px;
        width: 45%;

        input {
          width: 80%;
          border: none;
          border-bottom: 2px solid rgba(0, 0, 0, .1);
          height: 30px;
          outline: none;
          font-size: 16px;
          .font-family--default-V;

          &:hover {
            border-color: @primaryl;
          }

          &:focus {
            border-color: @primary;
          }

          transition: all .2s ease;
        }

        .btn {
          width: 20%;
        }
      }
    }
  }
}

.players {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  .player {
    display: flex;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, .2);
    align-items: center;
    gap: 8px;
    height: 30px;
    padding: 2px 10px;
    line-height: 1;

    .avatar {
      display: flex;
      align-items: center;

      img {
        height: 20px;
      }
    }
  }
}
</style>