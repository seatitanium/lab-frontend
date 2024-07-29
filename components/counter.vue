<template>
  <ClientOnly>
    <NumberAnimation v-if="value > 0" :from="0" :to="value" :format="n =>  n.toFixed(isDecimal ? 2 : 0)" :duration="0.5"
                     class="counter"/>
    <span v-else>{{ props.default ? props.default : ''}}</span>
  </ClientOnly>
</template>

<script lang="ts" setup>
// @ts-ignore
import NumberAnimation from 'vue-number-animation';

const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  default: {
    type: String
  }
});

const isDecimal = computed(() => props.value - Math.floor(props.value) !== 0)
</script>