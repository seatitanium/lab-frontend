<template>
  <div>
    <Transition name="fade">
      <NuxtLayout v-if="widthQualified">
        <NuxtPage/>
      </NuxtLayout>
      <div class="not-enough-width-warn" v-else>
        <div class="txt">
          <h2>显示不兼容</h2>
          <p>你的屏幕宽度不足以显示 Lab 的界面。请在宽度<strong>大于或等于 1100px</strong> 的设备或窗口上访问本页面，1500px 以上宽度访问效果最佳。</p>
          <p>通常情况下，1080p 及以上的显示器都可以满足该要求。</p>
          <p>若屏幕分辨率已满足，请将窗口横向拉伸，直至页面可以正常显示。</p>
          <p><a target="_blank" href="https://www.baidu.com/s?wd=1920x1080">点此 - 在百度上了解更多关于分辨率的信息</a></p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import "@/assets/global.less"

const widthQualified = ref(true);

onMounted(() => {
  widthQualified.value = window.innerWidth > 1100;
  window.addEventListener('resize', e => {
    widthQualified.value = window.innerWidth > 1100;
  })
})
</script>

<style lang="less" scoped>
@import "@/assets/var.less";
.not-enough-width-warn {
  width: 100vw;
  height: 100vh;

  .txt {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  h2 {
    color: #f44336;

    font-size: 42px;

    @media (min-width: 900px) {
      font-size: 48px;
    }
  }

  strong {
    color: #f44336;
  }

  p {
    font-size: 20px;
    text-align: center;
    line-height: 1.8;

    @media (max-width: 900px) {
      font-size: 20px;
    }
  }
}
</style>