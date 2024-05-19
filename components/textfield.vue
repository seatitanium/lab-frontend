<template>
  <div class="textfield" :class="{hasValue}">
    <input v-model="model" :placeholder="placeholder" :type="type" :maxlength="maxlength" :minlength="minlength"
           :step="step" :max="max" :min="min"/>
    <div class="textfield-bg-text" v-if="bgText && !!placeholder">
      {{ placeholder }}
    </div>
    <div v-if="actualProblem !== ''" class="hover-notice-wrap">
      <notice-head/>
      <div class="hover-notice" style="background: url('/images/textfield/notice-text-bg.svg')">
        {{ actualProblem }}
      </div>
      <notice-tail/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NoticeHead from 'public/images/textfield/notice-head.svg?component';
import NoticeTail from 'public/images/textfield/notice-tail.svg?component';

const model = defineModel('input', {
  required: true,
  type: String
});

const tempProblem = defineModel('tempProblem', {
  type: String
});

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
  },
  problem: {
    type: String,
    default: ""
  },
  required: {
    type: Boolean,
    default: false
  },
  regexProblem: {
    type: String,
    default: ""
  },
  regex: {
    type: String,
    default: ""
  }
})

const hasValue = ref(false);
const regexPassed = ref(false);
const actualProblem = ref(props.problem);

watch(() => tempProblem.value, v => {
  actualProblem.value = v || '';
})

watch(model, v => {
  if (actualProblem.value === tempProblem.value) tempProblem.value = '';
  hasValue.value = v !== "" && v !== undefined;
  if (props.regex !== "") {
    const regex = new RegExp(props.regex);
    regexPassed.value = regex.test(v || '');
  }
});

watch(hasValue, v => {
  if (!v && props.required) {
    actualProblem.value = '这里必填。'
  } else {
    actualProblem.value = '';
  }
})

watch(regexPassed, v => {
  if (!v) {
    actualProblem.value = props.regexProblem;
  } else {
    actualProblem.value = '';
  }
})

function isValid() {
  return (!props.required || (props.required && hasValue.value)) && (props.regex === '' || (props.regex !== '' && regexPassed.value));
}

defineExpose({
  isValid
})
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

@keyframes HoverNotice {
  0% {
    transform: rotate(0deg) translateX(2px) rotate(0deg);
  }

  100% {
    transform: rotate(360deg) translateX(2px) rotate(-360deg);
  }
}

@keyframes HoverNoticeAppear {
  0% {
    transform: scale(1) translateX(2px);
  }

  50% {
    transform: scale(1.1) translateX(2px);
  }

  100% {
    transform: scale(1) translateX(2px);
  }
}

.hover-notice-wrap {
  position: absolute;
  top: 8px;
  right: -16px;
  display: flex;
  align-items: stretch;
  filter: drop-shadow(0 4px 3px rgba(0, 0, 0, .3));
  animation: HoverNotice 2.2s linear .4s infinite, HoverNoticeAppear .3s ease;
  transform-origin: center;
  transform: translateX(2px);

  svg {
    height: 40px;
  }

  .hover-notice {
    margin-right: -1px;
    margin-left: -1px;
    display: flex;
    align-items: center;
  }
}
</style>