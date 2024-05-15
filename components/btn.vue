<template>
  <button @click="handleClick" :class="{loading, disabled}" class="btn">
    <slot v-if="!loading"/>
    <circle-spinner size="20px" v-else/>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  href: {
    type: String,
    default: ""
  },
  newWindow: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

function handleClick() {
  if (props.href === "") return;

  if (props.newWindow) window.open(props.href);
  else location.href = props.href;
}
</script>

<style lang="less">
@import "@/assets/var.less";

.btn {
  border-radius: 50px;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: .65rem;
  padding: 12px 25px;
  font-size: 15px;
  cursor: pointer;
  transition: all .2s ease;
  min-width: 80px;
  .font-family--default;

  &.loading {
    justify-content: center;
  }

  &.with-bg--primary {
    background-color: @primaryll;
    color: @primaryt;
  }

  &.without-bg--primary {
    background-color: transparent;
    color: @primaryt;

    &.hover--dim:hover {
      background-color: rgba(0, 0, 0, .1);
    }
  }
}
</style>