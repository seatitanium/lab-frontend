<template>
  <div class="page-instance container">
    <section class="section__inst_basic_information">
      <h2 class="value ip">192.168.88.12
        <btn class="small with-border without-bg--primary">单击复制
          <icon :path="mdiClipboardTextOutline"/>
        </btn>
      </h2>
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
          <btn class="with-bg--white hover--dim">
            <icon :path="mdiRestart"/>
            重启
          </btn>
          <btn class="with-bg--white hover--dim">
            <icon :path="mdiClose"/>
            关机
          </btn>
          <btn class="with-bg--white hover--dim">
            <icon :path="mdiCloseOctagonOutline"/>
            强制停机
          </btn>
        </card-content>
      </card>
    </section>
    <section class="section__online_players">
      <card class="narrow">
        <card-label>
          <icon :path="mdiAccountGroupOutline"/>
          在线玩家 (10)
          <small>ST13 历史最高 · 25</small>
        </card-label>
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
        <card-label>
          <icon :path="mdiMessageTextOutline"/>
          服内聊天
        </card-label>
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
    <section class="section__instance_info">
      <card class="narrow">
        <card-label>
          <icon :path="mdiCog"/>
          实例信息
        </card-label>
        <card-content>
          <h2 class="value">{{ instanceInformation.local.instance_id }}
            <btn class="small with-border without-bg--primary">单击复制
              <icon :path="mdiClipboardTextOutline"/>
            </btn>
          </h2>
          <metabar>
            <metabar-item>
              <span class="left">
                <icon :path="mdiClockPlusOutline"/>创建时间
              </span>
              <span class="right">
                {{ instanceInformation.retrieved.creation_time }}
              </span>
            </metabar-item>
            <metabar-item>
              <span class="left">
                <icon :path="mdiCogBox"/>规格
              </span>
              <span class="right">
                {{ instanceInformation.local.instance_type }}
              </span>
            </metabar-item>
            <metabar-item>
              <span class="left">
                <icon :path="mdiNavigationVariantOutline"/>地域
              </span>
              <span class="right">
                {{ instanceInformation.local.region_id }}
              </span>
            </metabar-item>
          </metabar>
          <div class="screenfetch-result">
            <div class="screenfetch-result-content" v-text="screenfetchResult"/>
          </div>
        </card-content>
        <card-right-top>
          <div class="badges">
            <div class="badge">
              <DebianLogo/>
              Debian 12
            </div>
            <div class="badge">
              <DukeWaving/>
              OpenJDK 17 JRE
            </div>
            <div class="badge">
              <img draggable="false" src="~/assets/icons/intel-xeon.png"/>
              Platinum 6462C
            </div>
          </div>
        </card-right-top>
      </card>
    </section>
  </div>
</template>
<script setup lang="ts">
import {
  mdiAccountGroupOutline,
  mdiCheckAll,
  mdiClipboardTextOutline,
  mdiClockOutline, mdiClockPlusOutline,
  mdiClose,
  mdiCloseOctagonOutline,
  mdiCog,
  mdiCogBox,
  mdiCreationOutline,
  mdiMessageTextOutline,
  mdiNavigationVariantOutline,
  mdiRestart,
  mdiSend
} from "@mdi/js";
import {getUsername} from "#imports";
import {BackendCodes} from "~/consts";
import DebianLogo from '~/assets/icons/debian.svg';
import DukeWaving from '~/assets/icons/duke-waving.svg'
import IntelXeonLogo from '~/assets/icons/intel-xeon.svg'

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
const screenfetchResult = ref('')
const instanceInformation = reactive<DescribeInstanceRes>({
  local: {
    instance_id: '',
    instance_type: '',
    region_id: ''
  },
  retrieved: {
    creation_time: '',
    exist: false,
    public_ip_address: null,
    status: ''
  }
});
const isInstanceExist = computed(() => instanceInformation.retrieved.exist)

onMounted(async () => {
  username.value = getUsername().value;

  const describeInstanceResult = await get<DescribeInstanceRes>('/api/ecs/describe');

  if (describeInstanceResult.code === BackendCodes.OK) {
    Object.assign(instanceInformation, describeInstanceResult.data);
  }

  instantMessages.value = [{
    sender: 'Subilan',
    content: 'wtf',
    time: '2024-05-30 22:50:39'
  }]
  instantMessageString.value = instantMessages.value.map(x => `[${x.time}] ${x.sender}: ${x.content}`).join('\n');

  screenfetchResult.value = `         _,met$$$$$gg.           root@iZwz9c7s2w1jnyokzyz9b7Z
      ,g$$$$$$$$$$$$$$$P.        OS: Debian 12 bookworm
    ,g$$P""       """Y$$.".      Kernel: x86_64 Linux 6.1.0-20-amd64
   ,$$P'              \`$$$.      Packages: 691
  ',$$P       ,ggs.     \`$$b:    Shell: bash 5.2.15
  \`d$$'     ,$P"'   .    $$$     CPU: Intel Xeon Platinum 8163 @ 12x 2.5GHz
   $$P      d$'     ,    $$P     RAM: 18651MiB / 23646MiB
   $$:      $$.   -    ,d$$'
   $$\\;      Y$b._   _,d$P'
   Y$$.    \`.\`"Y$$$$P"'
   \`$$b      "-.__
    \`Y$$
     \`Y$$.
       \`$$b.
         \`Y$$b.
            \`"Y$b._
                \`""""`;
})
</script>

<style lang="less" scoped>
@import "@/assets/var.less";

.page-instance {
  padding: 32px 0;
}

h2.value {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 30px;
  margin: 8px 0;
}

h2.value.ip {
  font-size: 40px;
}

.screenfetch-result {
  margin-top: 16px;
  .screenfetch-result-content {
    color: white;
    background: #212121;
    padding: 16px;
    border-radius: 10px;
    white-space: break-spaces;
    font-variation-settings: 'MONO' 1;
  }
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

@keyframes section__inst_control {
  0% {
    transform: translate(-50%, 100%);
  }

  100% {
    transform: translateY(-50%, 0);
  }
}

.section__inst_control {
  position: fixed;
  bottom: 5px;
  width: 40vw;
  left: 50%;
  transform: translateX(-50%);
  padding: 0;
  z-index: 300;
  background: rgba(255, 255, 255, .8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(33, 33, 33, .05);
  box-shadow: 0 0 5px rgba(0, 0, 0, .02);
  animation: section__inst_control .4s ease;
}

.section__online_players .card-label small {
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
      white-space: break-spaces;
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