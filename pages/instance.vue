<template>
  <div class="page-instance container">
    <section class="section__inst_basic_information">
      <h2 class="value ip" v-if="!firstDescribeInstanceFetchedTimeOut && !firstDescribeInstanceFetched">
        Waiting...
      </h2>
      <h2 class="value ip" v-else>
        {{
          instanceInformation.retrieved.public_ip_address !== null ? instanceInformation.retrieved.public_ip_address[0] : '暂无 IP 地址'
        }}
        <btn class="small with-border without-bg--primary" v-if="instanceInformation.retrieved.public_ip_address !== null">单击复制
          <icon :path="mdiClipboardTextOutline"/>
        </btn>
      </h2>
      <metabar>
        <metabar-item class="instance-status"
                      v-if="!firstDescribeInstanceFetchedTimeOut && !firstDescribeInstanceFetched">
          <span class="center">
            <circle-spinner size="12"/>
            获取中...
          </span>
        </metabar-item>
        <metabar-item v-else class="instance-status" :class="instanceInformation.retrieved.status">
          <span class="center">
            <icon v-if="instanceStatusIcon !== 'wait'" :path="instanceStatusIcon"/>
            <circle-spinner size="12" v-else/>
          {{ instanceStatusName }}
          </span>
        </metabar-item>
        <metabar-item>
          <span class="left">
            <icon :path="mdiClockOutline"/>
          最近更新
          </span>
          <span class="right">
            {{ instanceStatusLastUpdated || 'N/A' }}
          </span>
        </metabar-item>
      </metabar>
    </section>
    <section class="section__inst_control">
      <card class="narrow without-border">
        <card-content class="server-actions">
          <btn class="with-bg--primaryDark hover--dropShadow"
               :disabled="instanceInformation.retrieved.status === 'Running'"
               @click="actionToConfirm = isInstanceExist ? 'start' : 'create'; modalConfirm = true;">
            <icon :path="mdiCreationOutline"/>
            {{ isInstanceExist ? '开启' : '创建并开启' }}
          </btn>
          <btn :disabled="!isInstanceExist || instanceInformation.retrieved.status !== 'Running'" class="with-bg--white hover--dim"
               @click="actionToConfirm = 'reboot'; modalConfirm = true;">
            <icon :path="mdiRestart"/>
            重启
          </btn>
          <btn :disabled="!isInstanceExist || instanceInformation.retrieved.status !== 'Running'" class="with-bg--white hover--dim"
               @click="actionToConfirm = 'stop'; modalConfirm = true;">
            <icon :path="mdiClose"/>
            关机
          </btn>
          <btn :disabled="!isInstanceExist || instanceInformation.retrieved.status !== 'Running'" class="with-bg--white hover--dim"
               @click="actionToConfirm = 'stop_force'; modalConfirm = true;">
            <icon :path="mdiCloseOctagonOutline"/>
            强制停机
          </btn>
          <btn :disabled="!isInstanceExist" class="with-bg--white hover--dim"
               @click="modalDeleteChoice = true">
            <icon :path="mdiTrashCanOutline"/>
            删除
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
          <h2 class="value" v-if="!firstDescribeInstanceFetchedTimeOut && !firstDescribeInstanceFetched">
            <circle-spinner size="25"/>
            获取中...
          </h2>
          <h2 class="value" v-else>
            {{
              isInstanceExist ? instanceInformation.local.instance_id : '暂未创建'
            }}
            <btn v-if="isInstanceExist" class="small with-border without-bg--primary">单击复制
              <icon :path="mdiClipboardTextOutline"/>
            </btn>
          </h2>
          <metabar v-if="isInstanceExist">
            <metabar-item>
              <span class="left">
                <icon :path="mdiClockPlusOutline"/>创建时间
              </span>
              <span class="right">
                {{ formatTimeString(instanceInformation.retrieved.creation_time) }}
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
          <div v-if="firstDescribeInstanceFetched">
            <div class="screenfetch-result" v-if="isInstanceExist">
              <div class="screenfetch-result-content" v-text="screenfetchResult"/>
            </div>
            <div class="instance-not-exist" v-else>
              <p>
                暂时没有活跃的实例，因此没有相关的信息可供显示。要创建并启动一个实例，请单击控制栏的「<strong>创建并启动</strong>」按钮。
              </p>
            </div>
          </div>
        </card-content>
        <card-right-top>
          <div class="badges" v-if="isInstanceExist">
            <div class="badge" @click="modalDebianDesc = true">
              <DebianLogo/>
              Debian 12
            </div>
            <div class="badge" @click="modalJavaDesc = true">
              <DukeWaving/>
              OpenJDK 17 JRE
            </div>
            <div class="badge" @click="modalCpuDesc = true">
              <img draggable="false" src="~/assets/icons/intel-xeon.png"/>
              Platinum 6462C
            </div>
            <div class="badge" v-if="isInstanceBeingDeployed" @click="modalDeploy=true">
              <circle-spinner size="15"/>
              部署中...
            </div>
          </div>
        </card-right-top>
      </card>
    </section>
  </div>
  <modal v-model="modalDebianDesc" class="with-bg--darken describe">
    <modal-content>
      <DebianLogo/>
      <h1>Debian 12</h1>
      <p>服务器采用 Debian 12 操作系统</p>
    </modal-content>
    <modal-actions>
      <btn class="with-bg--primary hover--dim" @click="modalDebianDesc = false">确定</btn>
    </modal-actions>
  </modal>
  <modal v-model="modalJavaDesc" class="with-bg--darken describe">
    <modal-content>
      <DukeWaving/>
      <h1>OpenJDK 17 JRE</h1>
      <p>服务器通过 OpenJDK 17 JRE 来运行 Minecraft 服务端</p>
    </modal-content>
    <modal-actions>
      <btn class="with-bg--primary hover--dim" @click="modalJavaDesc = false">确定</btn>
    </modal-actions>
  </modal>
  <modal v-model="modalCpuDesc" class="with-bg--darken describe">
    <modal-content>
      <img src="~/assets/icons/intel-xeon.png"/>
      <h1>Intel Xeon&reg; Platinum</h1>
      <p>服务器采用英特尔至强处理器（型号为 Intel Xeon Platinum 6462C）作为 CPU 运载 Minecraft 服务端</p>
    </modal-content>
    <modal-actions>
      <btn class="with-bg--primary hover--dim" @click="modalCpuDesc = false">确定</btn>
    </modal-actions>
  </modal>
  <modal v-model="modalConfirm" class="with-bg--darken">
    <modal-title>确认操作</modal-title>
    <modal-content>
      <p>确定要<strong>{{ getActionName() }}</strong>服务器吗？</p>
      <p v-if="actionToConfirm === 'stop_force'">
        强制关闭服务器将忽略服务器目前的状态，直接执行断电操作，存在数据丢失的风险。单击确定之前，请确保已经做好数据备份工作。</p>
    </modal-content>
    <modal-actions class="right">
      <btn class="with-bg--primary hover--dim" @click="confirmAction()" :loading="confirmActionLoading"
           :disabled="confirmActionLoading">确定
      </btn>
      <btn class="without-bg--primary hover--dim" @click="modalConfirm = false">取消</btn>
    </modal-actions>
  </modal>
  <modal v-model="modalDeploy" class="with-bg--darken equalp">
    <modal-title>部署结果</modal-title>
    <modal-content>
      <div class="deploy-results"
           v-text="deployResult.code === BackendCodes.TargetNotExist ? '等待部署信息返回中...' : deployResult.data.content"/>
    </modal-content>
    <modal-actions class="right">
      <btn class="without-bg--primary hover--dim" @click="modalDeploy = false">关闭</btn>
    </modal-actions>
  </modal>
  <modal v-model="modalOK" class="with-bg--darken equalp">
    <modal-title>成功</modal-title>
    <modal-content>
      <p>你的操作已经成功执行。部分操作可能存在一定的时间延迟，具体以页面显示信息为准。</p>
    </modal-content>
    <modal-actions>
      <btn class="with-bg--primary hover--dim" @click="modalOK = false">关闭</btn>
    </modal-actions>
  </modal>
  <modal v-model="modalInstanceStarted" class="with-bg--darken">
    <modal-title>成功</modal-title>
    <modal-content>
      <p>{{ actionToConfirm === 'reboot' ? '重启' : '开启' }}实例的指令已经成功下达，但是服务器需要<strong> 2~5
        分钟</strong>才能完全启动，请耐心等待。</p>
    </modal-content>
    <modal-actions>
      <btn class="with-bg--primary hover--dim" @click="modalInstanceStarted = false">关闭</btn>
    </modal-actions>
  </modal>
  <modal v-model="modalCreationStarted" class="with-bg--darken">
    <modal-title>成功</modal-title>
    <modal-content>
      <p>实例已经创建。实例在正常工作之前，需要经过<strong> 2~5 分钟</strong>的部署，请耐心等待。</p>
    </modal-content>
    <modal-actions>
      <btn class="with-bg--primary hover--dim" @click="modalCreationStarted = false">关闭</btn>
      <btn class="without-bg--primary hover--dim" @click="modalCreationStarted = false; modalDeploy = true">
        查看部署进度
      </btn>
    </modal-actions>
  </modal>
  <modal v-model="modalDeleteChoice" class="with-bg--darken">
    <modal-title>确认删除</modal-title>
    <modal-content>
      <p>实例删除以后将不再计费，其系统盘内容将会永久丢失。</p>
      <p>单击「<strong>删除</strong>」以删除已经停机的实例。若需要删除未停机的实例，请单击「<strong>强制删除</strong>」。</p>
    </modal-content>
    <modal-actions class="right">
      <btn class="with-bg--danger hover--dim"
           @click="actionToConfirm = 'delete'; modalDeleteChoice = false; modalConfirm = true">删除
      </btn>
      <btn class="with-bg--danger hover--dim"
           @click="actionToConfirm = 'delete_force'; modalDeleteChoice = false; modalConfirm = true">强制删除
      </btn>
      <btn class="with-bg--primary hover--dim" @click="modalDeleteChoice = false">取消</btn>
    </modal-actions>
  </modal>
  <error-modal no-retry allow-close v-model="modalError" :error-information-content="errorInformationContent">
    <p>在执行部署任务过程中出现了一些问题，导致此过程无法继续运行。</p>
    <p>单击「<strong>错误信息</strong>」按钮查看内部错误信息，然后单击弹出的信息复制，将其传达给维护者以得到支持。</p>
  </error-modal>
</template>
<script setup lang="ts">
import {
  mdiAccountGroupOutline,
  mdiCheckAll,
  mdiClipboardTextOutline,
  mdiClockOutline, mdiClockPlusOutline,
  mdiClose,
  mdiCloseOctagonOutline, mdiCloudClockOutline, mdiCloudQuestionOutline,
  mdiCog,
  mdiCogBox,
  mdiCreationOutline, mdiHelpCircleOutline,
  mdiMessageTextOutline,
  mdiNavigationVariantOutline,
  mdiRestart,
  mdiSend, mdiTrashCan, mdiTrashCanOutline
} from "@mdi/js";
import {getUsername} from "#imports";
import {BackendCodes} from "~/consts";
import DebianLogo from '~/assets/icons/debian.svg';
import DukeWaving from '~/assets/icons/duke-waving.svg'
import IntelXeonLogo from '~/assets/icons/intel-xeon.svg'
import sleep from "~/utils/sleep";
import formatTimeString from "../utils/formatTimeStringFromString";
import del from "~/utils/del";
import type {UnwrapRef} from "vue";
import formatTimeStringFromDate from "~/utils/formatTimeStringFromDate";

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

type InstanceAction = 'start' | 'reboot' | 'stop' | 'stop_force' | 'create' | 'delete' | 'delete_force';

let instantMessages = ref<Message[]>([])
const instantMessageString = ref('');
const instantMessageToSend = ref('');
const username = ref('')
const screenfetchResult = ref('')
const confirmActionLoading = ref(false);
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
const instanceStatusIcon = computed(() =>
    isInstanceExist.value ? getInstanceStatusNameAndIcon(instanceInformation.retrieved.status).icon : mdiCloudQuestionOutline);
const instanceStatusName = computed(() =>
    isInstanceExist.value ? getInstanceStatusNameAndIcon(instanceInformation.retrieved.status).name : '未创建');
const isInstanceExist = computed(() => instanceInformation.retrieved.exist);
const instanceStatusLastUpdated = ref('');
const modalDebianDesc = ref(false);
const modalJavaDesc = ref(false);
const modalCpuDesc = ref(false);
const modalConfirm = ref(false);
const modalDeploy = ref(false);
const modalOK = ref(false);
const modalError = ref(false);
const modalCreationStarted = ref(false);
const modalDeleteChoice = ref(false);
const modalInstanceStarted = ref(false);
const deployTime = ref(0);
const deployResult = reactive<Resp<GetLastInvokeRes>>({
  code: 0,
  msg: '',
  data: {} as GetLastInvokeRes
});
const isInstanceBeingDeployed = ref(false);
const actionToConfirm = ref<OrEmpty<InstanceAction>>('');
const errorInformationContent = ref('');
const enableRefreshInstanceInformation = ref(true);
const firstDescribeInstanceFetchedTimeOut = ref(false);

function getActionName() {
  return {
    'create': '创建并启动',
    'start': '启动',
    'reboot': '重启',
    'stop': '关闭',
    'stop_force': '强制关闭',
    'delete': '删除',
    'delete_force': '强制删除',
    '': '??'
  }[actionToConfirm.value];
}

function getInstanceStatusNameAndIcon(instanceStatus: UnwrapRef<OrEmpty<InstanceStatus>>): {
  icon: string;
  name: string
} {
  return {
    'Pending': {
      icon: mdiCloudClockOutline,
      name: '准备中'
    },
    'Starting': {
      icon: 'wait',
      name: '启动中'
    },
    'Stopping': {
      icon: 'wait',
      name: '停止中'
    },
    'Stopped': {
      icon: mdiClose,
      name: '离线'
    },
    'Running': {
      icon: mdiCheckAll,
      name: '在线'
    },
    '': {
      icon: mdiHelpCircleOutline,
      name: '未知'
    }
  }[instanceStatus]
}

async function confirmAction() {
  confirmActionLoading.value = true;

  switch (actionToConfirm.value) {
    case 'create': {
      let result = await get('/api/ecs/create');

      confirmActionLoading.value = false;

      if (result.code === BackendCodes.OK) {
        modalConfirm.value = false;
        modalCreationStarted.value = true;
        // Supressing IDE warning for not using await here by adding a `finally` call
        startRefreshDeploymentResult().finally();
      } else {
        modalError.value = true;
        errorInformationContent.value = JSON.stringify(result);
        console.warn(result);
      }
      break;
    }

    case 'stop':
    case 'stop_force': {
      let result = await get(`/api/ecs/stop?force=${actionToConfirm.value === 'stop' ? 'false' : 'true'}`);
      modalConfirm.value = false;
      confirmActionLoading.value = false;

      if (result.code === BackendCodes.OK) {
        modalOK.value = true;
      } else {
        modalError.value = true;
        errorInformationContent.value = JSON.stringify(result);
      }

      break;
    }

    case 'reboot': {
      let result = await get('/api/ecs/reboot');
      modalConfirm.value = false;
      confirmActionLoading.value = false;

      if (result.code === BackendCodes.OK) {
        modalInstanceStarted.value = true;
      } else {
        modalError.value = true;
        errorInformationContent.value = JSON.stringify(result);
      }

      break;
    }

    case 'start': {
      let result = await get('/api/ecs/start');
      modalConfirm.value = false;
      confirmActionLoading.value = false;

      if (result.code === BackendCodes.OK) {
        modalInstanceStarted.value = true;
      } else {
        modalError.value = true;
        errorInformationContent.value = JSON.stringify(result);
      }

      break;
    }

    case 'delete':
    case 'delete_force': {
      let result = await del(`/api/ecs/delete?force=${actionToConfirm.value === 'delete' ? 'false' : 'true'}`);
      modalConfirm.value = false;
      confirmActionLoading.value = false;

      if (result.code === BackendCodes.OK) {
        modalOK.value = true;
      } else {
        modalError.value = true;
        errorInformationContent.value = JSON.stringify(result);
      }

      break;
    }
  }
}

async function startRefreshDeploymentResult() {
  while (true) {
    const result = await get<GetLastInvokeRes>(`/api/ecs/last-invoke`);
    if (result.code !== BackendCodes.OK && result.code !== BackendCodes.TargetNotExist) {
      // Close "possible" active modal
      modalOK.value = false;
      modalDeploy.value = false;
      // Open error modal
      modalError.value = true;
      errorInformationContent.value = JSON.stringify(result);
      console.warn(result);
      break;
    }

    Object.assign(deployResult, result)

    if (result.code !== BackendCodes.TargetNotExist) {
      if (result.data.status === 'Success') {
        break;
      }
    }

    deployTime.value++;
    await sleep(1000);
  }
}

const firstDescribeInstanceFetched = ref(false);

async function startRefreshDescribeInstanceResult() {
  let firstDescribeInstanceTimeout = 0;
  const maximumInstanceInformationFetchingTimeout = 10;

  const timer = setInterval(() => {
    firstDescribeInstanceTimeout++;
    if (firstDescribeInstanceTimeout > maximumInstanceInformationFetchingTimeout) {
      clearInterval(timer);
      if (!firstDescribeInstanceFetched.value) {
        firstDescribeInstanceFetchedTimeOut.value = true;
      }
    }
  }, 1000);

  // noinspection InfiniteLoopJS
  while (true) {
    if (!enableRefreshInstanceInformation.value) continue;
    const result = await get<DescribeInstanceRes>('/api/ecs/describe');
    firstDescribeInstanceFetched.value = true;
    if (result.code === BackendCodes.OK) {
      instanceStatusLastUpdated.value = formatTimeStringFromDate(new Date());
      Object.assign(instanceInformation, result.data);
    } else {
      if (result.code !== BackendCodes.NotFound) {
        console.warn('Unexpected error received.', result);
      }
    }
    await sleep(1000);
  }
}


onMounted(async () => {
  username.value = getUsername().value;

  startRefreshDescribeInstanceResult().finally();

  const deployStatus = await get<DeploymentStatus>('/api/ecs/deploy-status');
  if (deployStatus.code !== BackendCodes.OK) {
    console.warn('Cannot prepare deployment status.');
    console.warn(deployStatus)
  } else {
    switch (deployStatus.data) {
      case 'Pending':
      case 'Running': {
        isInstanceBeingDeployed.value = true;
        startRefreshDeploymentResult().finally();
        break;
      }

      default:
        isInstanceBeingDeployed.value = false;
    }
  }
// Test codes
//   instantMessages.value = [{
//     sender: 'Subilan',
//     content: 'wtf',
//     time: '2024-05-30 22:50:39'
//   }]
//   instantMessageString.value = instantMessages.value.map(x => `[${x.time}] ${x.sender}: ${x.content}`).join('\n');
//
//   screenfetchResult.value = `         _,met$$$$$gg.           root@iZwz9c7s2w1jnyokzyz9b7Z
//       ,g$$$$$$$$$$$$$$$P.        OS: Debian 12 bookworm
//     ,g$$P""       """Y$$.".      Kernel: x86_64 Linux 6.1.0-20-amd64
//    ,$$P'              \`$$$.      Packages: 691
//   ',$$P       ,ggs.     \`$$b:    Shell: bash 5.2.15
//   \`d$$'     ,$P"'   .    $$$     CPU: Intel Xeon Platinum 8163 @ 12x 2.5GHz
//    $$P      d$'     ,    $$P     RAM: 18651MiB / 23646MiB
//    $$:      $$.   -    ,d$$'
//    $$\\;      Y$b._   _,d$P'
//    Y$$.    \`.\`"Y$$$$P"'
//    \`$$b      "-.__
//     \`Y$$
//      \`Y$$.z
//        \`$$b.
//          \`Y$$b.
//             \`"Y$b._
//                 \`""""`;
})
</script>

<style lang="less" scoped>
.deploy-results {
  white-space: break-spaces;
  font-variation-settings: 'MONO' 1;
  background: #212121;
  color: white;
  padding: 16px;
  margin-top: 32px;
  border-radius: 10px;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
}
</style>

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
  border-radius: 100px;
  padding: 6px 20px;
  background: rgb(244, 244, 244);
  color: black;

  &.Pending {
    background: #fff8e1;
    color: #ffc107;
  }

  &.Running {
    background: #e8f5e9;
    color: #4caf50;
  }

  &.Stopping {
    background: #f3e5f5;
    color: #9c27b0;
  }

  &.Starting {
    background: #e0f2f1;
    color: #009688;
  }

  &.Stopped {
    background: #ffebee;
    color: #f44336;
  }
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
  width: 50vw;
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