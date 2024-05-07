<template>
    <div class="container">
        <div class="hello-card">
            <div class="textaligncenter">
                <h1>
                    👋 欢迎来到 <em>TiLab</em>！
                </h1>
                <p>TiLab 是 Seati 为玩家搭建的一站式服务器信息获取与控制平台 ✨</p>
            </div>
            
            <div class="apply">
                <btn>立即体验 <icon :path="mdiCreationOutline"/></btn>
                <btn href="https://seati.cc">打开官网 <icon :path="mdiLaunch"/></btn>
            </div>

            <section class="section__here_you_can">
                <h2>免费、灵活、开放</h2>
            </section>
        </div>
    </div>
</template>

<style lang="less" scoped>
.hello-card {

    padding: 40px 0;

    h1 {
        font-size: 60px;
        margin: 16px 0;
    }

    p {
        font-size: 24px;
    }
}
</style>

<script setup lang="ts">
import {mdiCreationOutline, mdiLaunch} from "@mdi/js";
</script>