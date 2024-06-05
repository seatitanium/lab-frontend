<template>
  <modal v-model="model" :allow-esc="allowClose" class="with-bg--darken" :class="{'with-bg--blurred': !allowClose}">
    <modal-title>
      出现了一些问题
    </modal-title>
    <modal-content>
      <slot/>
    </modal-content>
    <modal-actions class="right">
      <btn v-if="errorInformationContent !== ''" class="without-bg--primary hover--dim"
           @click="errorInformationPopup = true">错误信息
      </btn>
      <btn v-if="!noRetry" class="with-bg--primary hover--dim" @click="retryFunc">重试</btn>
      <btn class="with-bg--primary hover--dim" v-if="allowClose" @click="model =false">关闭</btn>
    </modal-actions>
  </modal>
  <anywhere-popup v-if="errorInformationContent !== ''" v-model="errorInformationPopup"
                  :content="errorInformationContent"/>
</template>

<script lang="ts" setup>
const errorInformationPopup = ref(false);
const model = defineModel();
const props = defineProps({
  errorInformationContent: {
    type: String,
    default: ''
  },
  retryFunc: {
    type: Function,
    default: () => {
    }
  },
  allowClose: {
    type: Boolean,
    default: false
  },
  noRetry: {
    type: Boolean,
    default: false
  }
})
</script>