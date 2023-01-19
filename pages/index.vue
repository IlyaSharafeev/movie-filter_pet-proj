<template>
  <div class="views-movies">
    <MovieCard v-if="movieStore.getMovies" v-for="(movie, key) in movieStore.getMovies" :key="key" :movie="movie"/>
    <Loader v-if="movieStore.getStateLoader"/>
  </div>
  <Paginator class="views-movies__pagination" v-model="currentPage" @clickHandler="clickHandler"/>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useMoviesStore} from "../store/movies";

definePageMeta({
  layout: 'home',
})

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
@import "@/assets/styles/views-movies.scss";
</style>