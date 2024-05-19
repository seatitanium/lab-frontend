<template>
  <div class="page-index container">
    <div class="index-title">
      <h1>欢迎，{{ user.nickname || user.username }}</h1>
      <p>选择下列功能之一，单击以跳转到相关页面以进行操作。这些功能在不断的更新中。</p>
    </div>
    <div class="index-functions">
      <card v-for="x in indexFunctions" @click="handleSiteFunctionClick(x)">
        <card-title>{{ x.title }}</card-title>
        <card-content>
          <p>{{ x.description }}</p>
        </card-content>
        <card-bg-icon>
          <icon :path="x.icon"/>
        </card-bg-icon>
      </card>
    </div>
  </div>
  <modal v-model="someProblemModal" :allow-esc="false" class="with-bg--blurred with-bg--darken">
    <modal-title>
      出现了一些问题
    </modal-title>
    <modal-content>
      <p>
        在获取关键信息的时候出现了一些问题，导致页面无法正常运作。
      </p>
      <p>
        单击「重试」立即刷新页面。如果问题仍然存在，单击「错误信息」查看内部错误信息，将其传达给网站的维护者。
      </p>
    </modal-content>
    <modal-actions>
      <btn>错误信息</btn>
      <btn>查看</btn>
    </modal-actions>
  </modal>
</template>

<script lang="ts" setup>
import getUsername from "~/utils/getUsername";
import {BackendCodes} from "~/consts";
import type {Ref} from "vue";
import {mdiAbacus, mdiBook, mdiServer} from "@mdi/js";

interface SiteFunction {
  title: string,
  description: string,
  icon: string,
  model?: Ref<boolean>,
  href?: string
}

let user = reactive<User>({
  id: 0,
  username: '',
  nickname: '',
  email: '',
  mcid: '',
  createdAt: 0,
  updatedAt: 0
});

const indexFunctions: SiteFunction[] = [
  {
    title: '服务器',
    description: '查看服务器状态与玩家在线情况，管理服务器的启停。此外还可探索在线聊天等更多功能。',
    icon: mdiServer,
    href: '/instance'
  },
  {
    title: '财务',
    description: '查看 Seati 公开的财务信息以及服务器、OSS 等阿里云服务的消费状况',
    icon: mdiAbacus,
    href: '/bill'
  },
  {
    title: '文档',
    description: '更进一步了解 Lab 平台用法以及周围 API 注解，推荐有一定理解力与技术力的用户参考',
    icon: mdiBook,
    href: '/doc'
  }
]

function handleSiteFunctionClick(func: SiteFunction) {
  if (func.href) location.href = func.href;
  else if (func.model) func.model.value = !func.model.value
}

const username = getUsername();
const someProblemModal = ref(false);

async function initUser() {
  const userResult = await get<UserResp>(`/api/user/profile/${username.value}`);
  if (userResult.code !== BackendCodes.OK) {
    someProblemModal.value = true;
  } else {
    Object.assign(user, userResult.data)
  }
}

onMounted(() => {
  initUser();
})
</script>

<style lang="less" scoped>
.index-title {
  padding: 32px 0;

  h1 {
    font-size: 40px;
  }

  p {
    font-size: 20px;
    margin: 8px 0;
  }
}

.index-functions {
  display: flex;
  align-items: stretch;
  gap: 16px;

  > * {
    cursor: pointer;
    width: 33.33%;
  }
}
</style>