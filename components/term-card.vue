<template>
  <card class="equalp" :class="{'with-bg--primary': `st${termNumber}` === PeriodTag}">
    <card-right-top>
      <div class="badges">
        <div class="badge">
          {{ gameVersion }}
        </div>
      </div>
    </card-right-top>
    <card-content>
      <term-info :term-number="termNumber" narrow-avatars>
        <slot name="bind-mcid-btn"/>
      </term-info>
    </card-content>
  </card>
</template>
<script setup lang="ts">
import {PeriodTag} from "~/consts";

const props = defineProps({
  termNumber: {
    type: String,
    required: true
  },
  gameVersion: {
    type: String,
  }
})
</script>