<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
  <client-only>
    <modal v-model="screenNotQualifiedModal" :class="narrowScreenQualificationModal ? 'narrow' : ''"
           class="qualification-modal describe with-bg--blurred with-bg--darken" :allow-esc="false">
      <modal-content>
        <icon color="#ff9800" :path="mdiMonitorOff"/>
        <h2>不支持的屏幕尺寸</h2>
        <p>当前你的浏览器显示尺寸为 <span :class="!widthQualified ? 'accent' : ''">{{ windowSize.width }}</span>*<span :class="!heightQualified ? 'accent' : ''">{{ windowSize.height }}</span> px<sup>2</sup>。Lab 需要至少
          {{ widthThreshold }}*{{ heightThreshold }} px<sup>2</sup> 的空间来正常显示。</p>
      </modal-content>
      <modal-actions class="right">
        <btn class="with-bg--white hover--dim" @click="screenMoreInformationPopup = true">了解更多</btn>
      </modal-actions>
    </modal>
    <anywhere-popup v-model="screenMoreInformationPopup" :code="false">
      <p>浏览器的显示尺寸与屏幕本身的<strong>硬件</strong>参数和系统相关的<strong>软件</strong>参数均有联系，此处提示屏幕尺寸不受支持，则是指客观上屏幕当前的缩放无法正常容纳页面布局。
      </p>
      <p><strong>Lab 目前不支持在手机上使用。</strong>我们将在未来推出面向手机的更加轻便的版本。</p>
    </anywhere-popup>
  </client-only>
</template>

<script setup>
import "@/assets/global.less"
import {useWindowSize} from "@vueuse/core";
import {mdiMonitorOff} from "@mdi/js";

const widthThreshold = 1100;
const heightThreshold = 850;
const mobileThreshold = 600;
const windowSize = useWindowSize();
const screenNotQualifiedModal = ref(false);
const screenMoreInformationPopup = ref(false);
const narrowScreenQualificationModal = ref(false);
const widthQualified = computed(() => windowSize.width.value > widthThreshold);
const heightQualified = computed(() => windowSize.height.value > heightThreshold);
const isMobile = computed(() => windowSize.width.value <= mobileThreshold);

const windowDataReactive = reactive({
  widthQualified,
  heightQualified,
  isMobile
});

watch(windowDataReactive, () => {
  screenNotQualifiedModal.value = !widthQualified.value || !heightQualified.value;
  narrowScreenQualificationModal.value = isMobile.value;
}, {
  immediate: true
});

watch(screenNotQualifiedModal, v => {
  if (document) {
    if (v) {
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.height = '';
      document.body.style.overflow = '';
    }
  }
}, {
  immediate: true
})
</script>

<style lang="less">
@import "@/assets/var.less";

.qualification-modal {
  .modal .modal-content {
    overflow-y: auto;
  }
}

.narrow {
  .modal {
    min-width: unset;
    max-width: unset;
    max-height: unset;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    top: 0;
    left: 0;
    transform: none;
    border-radius: 0;

    .modal-content {
      padding: 0 32px;
      text-align: center;
    }
  }
}

.accent {
  color: #f44336;
  font-weight: bold;
}
</style>