<template>
  <svg class="spinner" viewBox="0 0 50 50">
    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
  </svg>
</template>

<script>

</script>

<style scoped lang="scss">
html, body {
  height: 100%;
  background-image: linear-gradient(-105deg, #009acc, #363795);
}

.spinner {
  animation: rotate 2s linear infinite;
  z-index: 2;
  width: 50px;
  height: 50px;
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  margin:auto;

  & .path {
    stroke: hsl(210, 70, 75);
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>