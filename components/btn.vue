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

  &:hover {
    box-shadow: 0 2px 1px rgba(0, 0, 0, .2);
  }

  &.with-bg--primary {
    background: @primaryl;
    color: @primaryt;
  }

  &.without-bg--primary {
    background: transparent;
    color: @primaryt;
  }
}
</style>