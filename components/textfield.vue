<template>
  <div class="textfield">
    <input v-model="model" :placeholder="placeholder"/>
  </div>
</template>

<script lang="ts" setup>
const model = defineModel();
const props = defineProps({
  placeholder: {
    type: String
  }
})
</script>

<style lang="less">
@import "assets/var";

.textfield {
  input {
    width: 100%;
    padding: 15px;
    font-size: 18px;
    background: transparent;
    box-sizing: border-box;
    outline: none;
    .font-family--default;
    border: 2px solid rgba(0, 0, 0, .1);
    border-radius: 15px;
    transition: all .2s ease;

    &:hover {
      border-color: rgba(@primary, .4);
    }

    &:focus {
      border-color: @primary;
    }
  }


}
</style>