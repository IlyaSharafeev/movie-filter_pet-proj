<template>
  <div class="views-movies">
    <MovieCard v-if="movieStore.getMoviesSelected" v-for="(movie, key) in movieStore.getMoviesSelected" :key="key"
               :movie="movie" :star="true"/>
    <Loader v-if="movieStore.getStateLoader"/>
  </div>
</template>

<script setup>
import {useMoviesStore} from "../store/movies";

definePageMeta({
  layout: 'home',
})

const movieStore = useMoviesStore();
</script>

<style scoped>
@import "@/assets/styles/views-movies.scss";
</style>