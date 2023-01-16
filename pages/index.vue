<template>
<div class="views-movies">
  <MovieCard v-if="movieStore.getMovies" v-for="(movie, key) in movieStore.getMovies" :key="key" :movie="movie"/>
  <Loader v-if="movieStore.getStateLoader"/>
</div>
<Paginator class="views-movies__pagination" v-model="currentPage" @clickHandler="clickHandler"/>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home'
})

import {onMounted, ref} from 'vue';
import {useMoviesStore} from "../store/movies";

const movieStore = useMoviesStore();
const currentPage = ref(1);

const clickHandler = (page: number) => {
  currentPage.value = page;
}

onMounted(async () => {
  await movieStore.setMovies();
})
</script>

<style>
.views-movies{
  padding-top: 100px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  height: 100%;
  min-height: 100vh;
}

.views-movies__pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 40px 20px;
}
</style>