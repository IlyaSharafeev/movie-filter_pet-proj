<template>
<div class="views-movies">
  <MovieCards/>
</div>
</template>

<script>
definePageMeta({
  layout: 'home'
})
</script>

<style scoped>
.views-movies{
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}
</style>