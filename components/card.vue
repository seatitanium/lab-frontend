<template>
  <div class="card">
    <slot/>
  </div>
</template>

<style lang="less">
@import "@/assets/var";

.card {
  padding: 30px 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
  border-radius: 20px;
  position: relative;
  overflow: hidden;

  &.equalp {
    padding: 32px;
  }

  &.narrow {
    padding: 16px;
  }

  &.without-border {
    border: none;
  }

  &[class*="with-bg"] {
    border: none;
  }

  &.with-bg--primary {
    background: @primaryl;

    svg, path {
      fill: @primary;
    }

    .card-bg-text {
      color: @primary;
    }
  }

  &.with-bg--amber {
    background: #fff8e1;

    svg, path {
      fill: #ffc107;
    }

    .card-bg-text {
      color: #ffc107;
    }
  }

  &.with-bg--blue {
    background: #e1f5fe;

    svg, path {
      fill: #03a9f4;
    }

    .card-bg-text {
      color: #03a9f4;
    }
  }

  &.with-bg--green {
    background: #e8f5e9;
    svg, path {
      fill: #4caf50;
    }

    .card-bg-text {
      color: #4caf50;
    }
  }
}
</style>