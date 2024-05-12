<template>
  <div class="textfield" :class="{hasValue}">
    <input v-model="model" :placeholder="placeholder" :type="type" :maxlength="maxlength" :minlength="minlength"
           :step="step" :max="max" :min="min"/>
    <div class="textfield-bg-text" v-if="bgText && !!placeholder">
      {{ placeholder }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const model = defineModel();
const props = defineProps({
  placeholder: {
    type: String
  },
  type: {
    type: String
  },
  maxlength: {
    type: String
  },
  minlength: {
    type: String
  },
  step: {
    type: String
  },
  max: {
    type: String
  },
  min: {
    type: String
  },
  bgText: {
    type: Boolean,
    default: false
  }
})

const hasValue = ref(false);

watch(model, v => {
  hasValue.value = v !== "" && v !== undefined;
});
</script>

<style lang="less">
@import "assets/var";

.textfield {
  position: relative;

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

  &.hasValue {
    .textfield-bg-text {
      opacity: .1;
      transform: translateY(50%) translateX(0) skew(-8deg);
    }
  }
}

.textfield-bg-text {
  position: absolute;
  right: 16px;
  bottom: 50%;
  transform: translateY(50%) translateX(-20px) skew(0);
  opacity: 0;
  font-size: 30px;
  font-weight: bold;
  transition: all .1s ease-in;
  pointer-events: none;
}
</style>