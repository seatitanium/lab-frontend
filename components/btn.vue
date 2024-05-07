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

<style lang="less"></style>