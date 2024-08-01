<template>
  <div class="page-instance container">
    <bottom-navigation>
      <btn class="with-bg--primaryDark hover--dropShadow"
           :disabled="instanceInformation.retrieved.status === 'Running'"
           @click="actionToConfirm = isInstanceExist ? 'start' : 'create'; modalConfirm = true;">
        <icon :path="mdiCreationOutline"/>
        {{ isInstanceExist ? '开启' : '创建并开启' }}
      </btn>
      <btn :disabled="!isInstanceExist || instanceInformation.retrieved.status !== 'Running' || !userInformation.admin"
           class="with-bg--white hover--dim"
           @click="actionToConfirm = 'reboot'; modalConfirm = true;">
        <icon :path="mdiRestart"/>
        重启
      </btn>
      <btn :disabled="!isInstanceExist || instanceInformation.retrieved.status !== 'Running' || !userInformation.admin"
           class="with-bg--white hover--dim"
           @click="actionToConfirm = 'stop'; modalConfirm = true;">
        <icon :path="mdiClose"/>
        关机
      </btn>
      <btn :disabled="!isInstanceExist || instanceInformation.retrieved.status !== 'Running' || userInformation.admin"
           class="with-bg--white hover--dim"
           @click="actionToConfirm = 'stop_force'; modalConfirm = true;">
        <icon :path="mdiCloseOctagonOutline"/>
        强制停机
      </btn>
      <btn :disabled="!isInstanceExist || !userInformation.admin" class="with-bg--white hover--dim"
           @click="modalDeleteChoice = true">
        <icon :path="mdiTrashCanOutline"/>
        删除
      </btn>
    </bottom-navigation>
    <section class="section__inst_basic_information">
      <h1 class="value ip" v-if="!firstDescribeInstanceFetchedTimeOut && !firstDescribeInstanceFetched">
        Waiting...
      </h1>
      <h1 class="value ip" v-else>
        {{
          instanceInformation.retrieved.public_ip_address ? (instanceInformation.retrieved.public_ip_address[0] || '暂无 IP 地址') : '暂无 IP 地址'
        }}
        <btn class="with-border without-bg--primary copy-btn"
             v-if="instanceInformation.retrieved.public_ip_address !== null">单击复制
          <icon :path="mdiClipboardTextOutline"/>
        </btn>
      </h1>
      <metabar>
        <metabar-item class="instance-status"
                      v-if="!firstDescribeInstanceFetchedTimeOut && !firstDescribeInstanceFetched">
          <span class="center">
            <circle-spinner size="12"/>
            获取中...
          </span>
        </metabar-item>
        <metabar-item v-else class="instance-status" :class="`${instanceInformation.retrieved.status} ${serverStatus.online ? 'online' : 'offline'}`">
          <span class="center">
            <icon v-if="instanceStatusIcon !== 'wait'" :path="instanceStatusIcon"/>
            <circle-spinner size="12" v-else/>
          {{ instanceStatusName }}
          </span>
        </metabar-item>
        <metabar-item>
          <span class="left">
            <icon :path="mdiClockOutline"/>
          最近刷新
          </span>
          <span class="right">
            {{ instanceStatusLastUpdated || 'N/A' }}
          </span>
        </metabar-item>
      </metabar>
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
            <btn v-if="isInstanceExist" class="copy-btn with-border without-bg--primary">单击复制
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
                <icon :path="translateLetterIcon(instanceInformation.local.zone_id ? instanceInformation.local.zone_id.slice(-1) as Letter : 'z')"/>
              </span>
            </metabar-item>
          </metabar>
          <div v-if="firstDescribeInstanceFetched">
            <div class="instance-not-exist" v-if="!isInstanceExist">
              <p style="margin: 0">
                暂时没有活跃的实例，因此没有相关的信息可供显示。要创建并启动一个实例，请单击控制栏的「<strong>创建并开启</strong>」按钮。
              </p>
            </div>
            <screenfetch-content/>
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
              {{ instanceDeployStatusName }}...
            </div>
          </div>
        </card-right-top>
      </card>
    </section>
    <section class="section__online_players">
      <card class="narrow">
        <card-label>
          <icon :path="mdiAccountGroupOutline"/>
          在线玩家 ({{ onlinePlayers.length }})
          <small>ST13 历史最高 · {{ peakServerOnlineSnapshot.count }}</small>
        </card-label>
        <card-content>
          <div class="players" v-if="onlinePlayers.length > 0">
            <div class="player" v-for="x in onlinePlayers">
              <div class="avatar">
                <player-avatar :name="x"/>
              </div>
              {{ x }}
            </div>
          </div>
          <div class="no-players" v-else>
            <div class="wtf">{{ randomExclamation }}</div>
            <div class="text">{{ randomAbsence }}</div>
          </div>
        </card-content>
      </card>
    </section>
    <section class="section__instant_message">
      <card class="narrow">
        <card-right-top>
          <div class="badges">
            <div class="badge im-status" :class="instantMessageStatus">
              <icon :path="imStatusIcon"/>
              {{ imStatusName }}
            </div>
          </div>
        </card-right-top>
        <card-label>
          <icon :path="mdiMessageTextOutline"/>
          服内聊天
        </card-label>
        <card-content>
          <div class="instant-message">
            <div class="instant-message-bg" :class="{active: isSendingInstantMessage}">发送中</div>
            <div class="instant-message-content" v-html="instantMessageString"/>
            <div class="instant-message-sender-wrapper" :class="{active: isSendingInstantMessage}">
              <div class="instant-message-sender">
                <input
                    :disabled="instantMessageStatus !== 'connected' || !userInformation.hasBoundValidMCID"
                    ref="instantMessageInput"
                    @keydown.enter="sendInstantMessage"
                    :placeholder="
                    instantMessageStatus === 'connected'
                    ? (userInformation.hasBoundValidMCID ? `以 ${userInformation.mcid} 的身份发送信息` : '请绑定游戏名后使用送信功能')
                    : '暂未连接到服务器'"
                    v-model="instantMessageToSend"
                />
              </div>
            </div>
          </div>
        </card-content>
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
      <p>确定要<strong>{{ translateInstanceActionName(actionToConfirm) }}</strong>服务器吗？</p>
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
  <modal v-model="modalDeploy" class="with-bg--darken equalp deploy-modal">
    <modal-title>部署结果</modal-title>
    <modal-content>
      <div class="deploy-results"
           v-text="instanceLastInvokeResult.status === 'Pending' ? '等待部署信息返回中...' : instanceLastInvokeResult.content"/>
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
  mdiAlertOutline,
  mdiAlphaA,
  mdiAlphaB,
  mdiAlphaC,
  mdiAlphaD,
  mdiAlphaE,
  mdiAlphaF,
  mdiAlphaG,
  mdiAlphaH,
  mdiAlphaI,
  mdiAlphaJ,
  mdiAlphaK,
  mdiAlphaZ, mdiCheck,
  mdiCheckCircleOutline,
  mdiClipboardTextOutline,
  mdiClockOutline,
  mdiClockPlusOutline,
  mdiClose,
  mdiCloseOctagonOutline,
  mdiCog,
  mdiCogBox,
  mdiCreationOutline,
  mdiHelpCircleOutline,
  mdiMessageTextOutline,
  mdiNavigationVariantOutline,
  mdiRestart,
  mdiTrashCanOutline,
  mdiWebOff
} from "@mdi/js";
import {getUsername} from "#imports";
import {BackendCodes, ServerWebSocketPort} from "~/consts";
import DebianLogo from '~/assets/icons/debian.svg';
import DukeWaving from '~/assets/icons/duke-waving.svg'
import sleep from "~/utils/sleep";
import formatTimeString from "../utils/formatTimeStringFromString";
import del from "~/utils/del";
import formatTimeStringFromDate from "~/utils/formatTimeStringFromDate";
import BottomNavigation from "~/components/bottom-navigation.vue";
import randomInclusive from "~/utils/randInclusive";
import ScreenfetchContent from "~/components/screenfetch-content.vue";
import {useLocalStorage} from "@vueuse/core";
import {useState} from "#app";
import {
  translateInstanceActionName,
  translateInstanceDeploymentStatus,
  translateInstanceStatus,
  translateInstanceStatusIcon, translateInstantMessageStatus, translateInstantMessageStatusIcon, translateLetterIcon
} from "~/translation";

let onlinePlayers = ref<string[]>([]);

const instanceInformation = reactive<DescribeInstanceRes>({
  local: {
    instance_id: '',
    instance_type: '',
    region_id: '',
    zone_id: ''
  },
  retrieved: {
    creation_time: '',
    exist: false,
    public_ip_address: null,
    status: ''
  }
});


const username = ref('');
const userInformation = useState<UserExtended>('user-data');

const confirmActionLoading = ref(false);

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

const instanceDeployTime = ref(0);
const instanceLastInvokeResult = reactive<GetLastInvokeRes>({
  status: 'Pending',
  content: '',
  errorInfo: '',
  startTime: '',
  finishedTime: ''
});
const isInstanceBeingDeployed = ref(false);

const actionToConfirm = ref<OrEmpty<InstanceAction>>('');
const errorInformationContent = ref('');

const enableRefreshInstanceInformation = ref(true);

const firstDescribeInstanceFetchedTimeOut = ref(false);

let instantMessages = reactive<{ content: string, time: string }[]>([])
const instantMessageString = computed(() => instantMessages.map(x => `<span style="color: #aaa">[${x.time}]</span> ${x.content}`).join("\n"));
const instantMessageToSend = ref('');

const instanceDeployStatusName = computed(() => {
  if (!isInstanceBeingDeployed.value) return '等待中';
  return translateInstanceDeploymentStatus(instanceLastInvokeResult.status);
});

const isInstanceExist = computed(() => instanceInformation.retrieved.exist);
const instanceStatusLastUpdated = ref('');
const instanceStatusName = computed(() => {
  if (!isInstanceExist.value) return '未创建';
  return translateInstanceStatus(instanceInformation.retrieved.status, serverStatus.online);
})

const instanceStatusIcon = computed(() => {
  if (!isInstanceExist.value) return mdiHelpCircleOutline;
  return translateInstanceStatusIcon(instanceInformation.retrieved.status, serverStatus.online);
})

async function confirmAction() {
  confirmActionLoading.value = true;

  switch (actionToConfirm.value) {
    case 'create': {
      let result = await get('/ecs/create');
      modalConfirm.value = false;

      confirmActionLoading.value = false;

      if (result.code === BackendCodes.OK) {
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
      let result = await get(`/ecs/stop?force=${actionToConfirm.value === 'stop' ? 'false' : 'true'}`);
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
      let result = await get('/ecs/reboot');
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
      let result = await get('/ecs/start');
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
      let result = await del(`/ecs/delete?force=${actionToConfirm.value === 'delete' ? 'false' : 'true'}`);
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
    const result = await get<GetLastInvokeRes>(`/ecs/last-invoke`);

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

    Object.assign(instanceLastInvokeResult, result.data);

    if (result.code === BackendCodes.OK) {
      if (result.data.status === 'Success') {
        Object.assign(instanceLastInvokeResult, result.data);
        break;
      }
    }

    instanceDeployTime.value++;
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
    const result = await get<DescribeInstanceRes>('/ecs/describe');
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

const enableRefreshServerStatus = ref(true);
const serverStatus = reactive<{
  online: boolean,
  data: ServerStatus
}>({
  online: false,
  data: {
    version: {
      name_raw: '',
      name_clean: '',
      name_html: '',
      protocol: 0
    },
    players: {
      max: 0,
      online: 0,
      sample: []
    },
    motd: {
      raw: '',
      clean: '',
      html: ''
    },
    favicon: '',
    srv_result: [],
    mod_info: {
      type: '',
      mods: []
    }
  }
})

async function startRefreshServerStatus() {
  // noinspection InfiniteLoopJS
  while (true) {
    if (enableRefreshServerStatus.value && instanceInformation.retrieved.public_ip_address) {
      const result = await get<ServerStatus>(`/server/status?ip=${instanceInformation.retrieved.public_ip_address}`);
      if (result.code === BackendCodes.OK) {
        serverStatus.online = true;
        Object.assign(serverStatus.data, result.data);
        const r = result.data.players.sample.map(x => x.name_clean).filter(x => x !== 'Anonymous Player');
        if (!r.every(x => onlinePlayers.value.includes(x)) || r.length === 0) onlinePlayers.value = r;
      } else if (result.code === BackendCodes.Offline) {
        serverStatus.online = false;
      } else {
        console.warn("Cannot retrieve server status", result);
      }
    }
    await sleep(2000);
  }
}

const peakServerOnlineSnapshot = reactive<SnapshotOnlinePlayers>({
  id: -1,
  count: 0,
  names: '',
  created_at: ''
});

get<SnapshotOnlinePlayers>(`/server/peak-online-history`).then(r => {
  if (r.code === BackendCodes.OK) Object.assign(peakServerOnlineSnapshot, r.data);
  else console.warn(r)
});

let ws: WebSocket;

function initializeWebSocketConnection(url: string) {
  addInstantMessage("Connecting to server...");

  ws = new WebSocket(url);

  ws.onopen = () => {
    instantMessageStatus.value = 'connected';
  }

  ws.onclose = () => {
    instantMessageStatus.value = 'disconnected';
  }

  ws.onmessage = m => {
    instantMessages.push({
      content: parseColorCodes(m.data),
      time: formatTimeStringFromDate(new Date())
    })
  };

  ws.onerror = m => {
    instantMessageStatus.value = 'error';
    console.warn(m);
    instantMessages.push({
      content: "Caught error. Please check the console.",
      time: formatTimeStringFromDate(new Date())
    });
  }
}

function sendWebSocketMessage(message: string) {
  ws.send(message);
}

function addInstantMessage(content: string) {
  instantMessages.push({
    content,
    time: formatTimeStringFromDate(new Date())
  });
}

function sendInstantMessage() {
  sendWebSocketMessage(instantMessageToSend.value);
  instantMessageToSend.value = ''
}

const isSendingInstantMessage = ref(false);
const instantMessageInput = ref<HTMLInputElement | null>(null);
const instantMessageStatus = ref<InstantMessageStatus>('pending');
const imStatusName = computed(() => translateInstantMessageStatus(instantMessageStatus.value));
const imStatusIcon = computed(() => translateInstantMessageStatusIcon(instantMessageStatus.value));

let randomExclamation = ref('');
let randomAbsence = ref('');

onMounted(async () => {
  username.value = getUsername().value;
  randomExclamation.value = getRandomExclamation();
  randomAbsence.value = getRandomAbsence();

  startRefreshDescribeInstanceResult().finally();
  startRefreshServerStatus().finally();

  const deploymentStatusResp = await get<DeploymentStatus>('/ecs/deploy-status');

  if (deploymentStatusResp.code === BackendCodes.OK) {
    switch (deploymentStatusResp.data) {
      case 'Pending':
      case 'Running': {
        isInstanceBeingDeployed.value = true;
        startRefreshDeploymentResult().finally();
        break;
      }

      default:
        isInstanceBeingDeployed.value = false;
    }
  } else if (deploymentStatusResp.code !== BackendCodes.TargetNotExist) {
    console.warn("unexpected response getting deploy status");
    console.warn(deploymentStatusResp)
  }

  if (instantMessageInput.value !== null) {
    instantMessageInput.value.addEventListener('focus', () => {
      isSendingInstantMessage.value = true;
    })
    instantMessageInput.value.addEventListener('focusout', () => {
      isSendingInstantMessage.value = false;
    })
  }
});

onBeforeRouteLeave(() => {
  if (ws) {
    ws.close();
  }
})

function getRandomExclamation() {
  const dict = ["WTF?!", "OMG...", "Ummmm", "天啦噜!", "Holy Sh!t", "But Why", "sldkghfhg"];
  return dict[randomInclusive(0, dict.length - 1)];
}

function getRandomAbsence() {
  const dict = ["暂时没有玩家在线", "大家都去打英雄联盟了", "大家都去玩原神了", "大家都去玩单人了"];
  if (new Date().getHours() >= 0 && new Date().getHours() <= 6) dict.push("大家都去睡觉了");
  return dict[randomInclusive(0, dict.length - 1)];
}

definePageMeta({
  requireLogin: true
})

watch(() => !userInformation.value.loading && serverStatus.online, v => {
  if (v) {
    const token = useLocalStorage('tisea-auth-token', '');
    const url = `${instanceInformation.retrieved.public_ip_address}:${ServerWebSocketPort}`;
    initializeWebSocketConnection(userInformation.value.hasBoundValidMCID ? `${url}?token=${token.value}&displayname=${userInformation.value.mcid}` : url);
  } else if (serverStatus.online === false)  {
    instantMessageStatus.value = 'disconnected';
    addInstantMessage("Server is not running now.")
  }
}, {
  immediate: true
})
</script>

<style lang="less">
.deploy-modal {
  min-width: 800px;
}

.instance-status {
  border-radius: 100px;
  padding: 6px 14px;
  background: rgb(244, 244, 244);
  color: black;

  &.Pending {
    background: #fff8e1;
    color: #ffc107;
  }

  &.Running {
    &.offline {
      background: #fff3e0;
      color: #ff9800;
    }

    &.online {
      background: #e8f5e9;
      color: #4caf50;
    }
  }

  &.Stopping {
    background: #f3e5f5;
    color: #9c27b0;

    svg {
      .path {
        stroke: #9c27b0 !important;
      }
    }
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
</style>

<style lang="less" scoped>
@import "assets/var";

.copy-btn {
  padding: 4px 12px;
  font-size: 12px;
  gap: 4px;
  transition: all .2s ease;

  svg {
    width: 15px;
    height: 15px;
  }

  &:hover {
    background: @primary;
    color: white;
    border-color: transparent;
  }
}

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

h1.ip {
  font-size: 40px;
  margin: 16px 0;
}

.section__online_players .card-label small {
  color: #bbb;
  font-size: 14px;
  font-weight: normal;
}

.section__instant_message {
  .instant-message {
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 20px;
    padding: 16px;
    background: #212121;
    color: white;

    .instant-message-content {
      display: block;
      width: 100%;
      white-space: break-spaces;
      font-variation-settings: 'MONO' 0.5;
      min-height: 500px;
      max-height: 500px;
      overflow-y: auto;
    }

    .instant-message-bg {
      transform: translateY(50%) translateX(-100px) skew(0);
      opacity: 0;
      color: white;
      font-size: 200px;
      position: absolute;
      right: 20px;
      bottom: 140px;
      transition: all .2s ease;
      font-weight: bold;
      pointer-events: none;

      &.active {
        transform: translateY(50%) translateX(0) skew(-8deg);
        opacity: .1;
      }
    }

    .instant-message-sender-wrapper {
      display: flex;

      .instant-message-sender {
        display: flex;
        align-items: center;
        gap: 16px;
        width: 100%;
        border-radius: 20px;
        justify-content: center;
        transition: all .2s ease;

        &.active {
          justify-content: flex-start;
        }

        input {
          width: 20%;
          border: 1px solid rgba(255, 255, 255, .4);
          border-radius: 30px;
          padding: 8px 14px;
          height: 30px;
          outline: none;
          .font-family--default-V;
          transition: all .2s ease;
          font-size: 16px;
          background: transparent;

          text-align: center;

          [disabled] {
            cursor: not-allowed;
          }

          &:not([disabled]) {
            cursor: pointer;

            &::placeholder {
              color: white;
              transition: all .2s ease;
            }

            &:hover {
              border-color: rgba(255, 255, 255, .7);
            }

            &:focus {
              text-align: left;
              font-size: 20px;
              color: white;
              border-left-color: transparent;
              border-top-color: transparent;
              border-right-color: transparent;
              padding: 0 0 8px;
              border-radius: 0;
              cursor: text;
              width: 100%;
              border-bottom-color: rgba(255, 255, 255, .7);

              &::placeholder {
                color: rgba(255, 255, 255, .6);
              }
            }
          }
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

<style lang="less" scoped>
.no-players {
  text-align: center;
  padding: 50px;
  border: 2px dashed #ddd;
  border-radius: 20px;

  .wtf {
    font-size: 60px;
    font-variation-settings: 'slnt' -10, 'CASL' 1, 'wght' 800;
  }

  .text {
    font-size: 20px;
  }

  color: #ddd;
}

.badge.im-status {
  border: none;

  &.pending {
    background: #fff8e1;
    color: #ffc107;
  }

  &.connected {
    background: #e3f2fd;
    color: #2196F3;
  }

  &.disconnected {
    background: #fafafa;
    color: #9e9e9e;
  }

  &.error {
    background: #ffebee;
    color: #f44336;
  }
}
</style>