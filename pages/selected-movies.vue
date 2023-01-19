<template>
  <div class="views-movies">
    <MovieCard
        v-if="movieStore.getMoviesSelected"
        v-for="(movie, key) in movieStore.getMoviesSelected" :key="key"
        :movie="movie"
        :star="true"
    />
    <div class="views-movies__not-found-container" v-if="movieStore.getMoviesSelected.length === 0">
      <div class="views-movies__not-found">favorite movies not selected</div>
      <NuxtLink to="/" class="btn btn-light views-movies__not-found-btn">back</NuxtLink>
    </div>
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

<style scoped lang="scss">
@import "@/assets/styles/views-movies.scss";
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap');

.views-movies__not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;

  .views-movies__not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    letter-spacing: 10px;
    font-size: 32px;
    font-family: 'Montserrat', sans-serif;
  }

  .views-movies__not-found-btn {
    padding: 10px 70px;
    letter-spacing: 5px;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
    color: grey;

    &:hover {
      color: white;
    }
  }
}
</style>