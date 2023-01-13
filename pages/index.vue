<template>
<div class="views-movies">
  <MovieCard v-if="movieStore.getMovies" v-for="(movie, key) in movieStore.getMovies" :key="key" :movie="movie"/>
  <Loader v-else/>
</div>
  <vue-awesome-paginate
      class="views-movies__pagination"
      :total-items="5"
      :items-per-page="1"
      :max-pages-shown="5"
      v-model="currentPage"
      :on-click="onClickHandler"
      :hide-prev-next="true"
  />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home'
})

import {onMounted, ref} from 'vue';
import {useMoviesStore} from "../store/movies";

const currentPage = ref(1);
const movieStore = useMoviesStore();
const onClickHandler = (page: number) => {
  movieStore.setMovies(page);
};
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

.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}

</style>