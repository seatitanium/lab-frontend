<template>
    <button @click="handleClick" class="btn">
        <slot />
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
  .font-family--default;


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