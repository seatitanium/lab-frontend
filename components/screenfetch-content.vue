<template>
  <div class="screenfetch-result">
    <div class="screenfetch-result-content">
      <pre><code class="badge" @click="screenfetchModal = true">SCREENFETCH</code><code>
              _,met$$$$$gg.           root@seati-game
           ,g$$$$$$$$$$$$$$$P.        OS: Debian 12 bookworm
         ,g$$P""       """Y$$.".      Kernel: x86_64 Linux 6.1.0-20-amd64
        ,$$P'              `$$$.      Shell: bash 5.2.15
       ',$$P       ,ggs.     `$$b:    CPU: {{screenfetchData.cpu}}
       `d$$'     ,$P"'   .    $$$     RAM: {{ screenfetchData.ram }}
        $$P      d$'     ,    $$P
        $$:      $$.   -    ,d$$'     Unimportant information is omitted.
        $$\;      Y$b._   _,d$P'
        Y$$.    `.`"Y$$$$P"'
        `$$b      "-.__
         `Y$$
          `Y$$.z
            `$$b.
              `Y$$b.
                 `"Y$b._
                     `""""`
      </code></pre>
    </div>
  </div>
  <modal v-model="screenfetchModal" class="describe with-bg--darken">
    <modal-content>
      <icon :path="mdiConsole"/>
      <h2>Screenfetch 信息</h2>
      <p>Screenfetch 信息反映了当前服务器实例所采用系统的重要配置信息。透过这些配置信息，你可以预估当前服务器的性能与模组承受能力。</p>
      <p>借助搜索引擎对这些信息分别检索，可以了解更深层的信息。</p>
    </modal-content>
    <modal-actions>
      <btn class="with-bg--primary hover--dim" @click="screenfetchModal = false">
        确定
      </btn>
    </modal-actions>
  </modal>
</template>

<script lang="ts" setup>
import {mdiConsole} from "@mdi/js";

const screenfetchModal = ref(false);

const screenfetchData = reactive({
  cpu: 'Intel Xeon Platinum 8369HC @ 4x 4.2GHz',
  ram: '~ MiB / 15339MiB'
})
</script>

<style lang="less" scoped>
pre {
  position: relative;
}

.badge {
  position: absolute;
  right: 16px;
  top: 16px;
  color: rgba(255, 255, 255, .4);
  cursor: pointer;
}

.screenfetch-result {
  margin-top: 16px;

  .screenfetch-result-content {
    color: white;
    background: #212121;
    padding: 16px;
    border-radius: 10px;
    white-space: break-spaces;

    pre {
      margin: 0;
    }
  }
}
</style>