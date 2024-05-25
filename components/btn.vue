<template>
  <button @click="handleClick" :class="{loading, disabled, small}" class="btn">
    <slot v-if="!loading"/>
    <circle-spinner :size="`${small ? 10 : 20}px`" v-else/>
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
  },
  small: {
    type: Boolean,
    default: false
  }
})

function handleClick() {
  if (props.disabled) return;
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
  justify-content: center;
  gap: .65rem;
  padding: 12px 25px;
  font-size: 15px;
  cursor: pointer;
  transition: all .2s ease;
  min-width: 80px;
  .font-family--default;

  &.small {
    padding: 6px 16px;
    font-size: 12px;
    gap: 2px;

    svg {
      height: 15px;
    }
  }

  &.loading {
    justify-content: center;
  }

  &.disabled {
    background-color: #f5f5f5 !important;
    cursor: not-allowed;
    color: #757575 !important;

    &.hover--dim:hover {
      background-color: #f5f5f5 !important;
      filter: none !important;
    }
  }

  &.with-bg--primary {
    background-color: @primaryll;
    color: @primaryt;
  }

  &.with-border {
    border: 1px solid rgba(0, 0, 0, .21);
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