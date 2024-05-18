<template>
    <div class="page-index container">
    </div>
</template>

<script lang="ts" setup>
import getUsername from "~/utils/getUsername";
import {BackendCodes} from "~/consts";

let user = reactive<User>({
  id: 0,
  username: '',
  nickname: '',
  email: '',
  mcid: '',
  createdAt: 0,
  updatedAt: 0
})
const username = getUsername();

async function initUser() {
  const userResult = await get<UserResp>(`/api/user/profile/${username.value}`);
  if (userResult.code !== BackendCodes.OK) {

  } else {
    user = userResult.data;
  }
}

onMounted(() => {
  initUser();
})
</script>