<template>
  <div class="header-search">
    <div class="bar">
      <input class="searchbar" type="text" title="Search" @input="searchMovie" v-model="test">
      <a href="#" @click="speech">
        <img
            class="voice"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Google_mic.svg/716px-Google_mic.svg.png"
            title="Search by Voice"
            alt="search voice icon"
        />
      </a>
    </div>
  </div>
</template>

<script setup>
import {useMoviesStore} from "../store/movies";
import {useDebounceFn} from "@vueuse/core";
import {ref} from "vue";

const movieStore = useMoviesStore();
const test = ref('');
const searchMovie = useDebounceFn(() => {
  movieStore.searchMovies(test.value);
}, 500)
</script>

<style scoped lang="scss">
.header-search {
  width: 100%;
  height: 8vh;
  background: #007c83;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 2;

  .bar {
    margin: 0 auto;
    width: 575px;
    position: relative;
    border-radius: 30px;
    border: 1px solid #dcdcdc;
    background: white;

    .searchbar {
      height: 45px;
      border: none;
      width: calc(100% - 50px);
      padding-left: 20px;
      background: transparent;
      font-size: 16px;
      outline: none;
    }
  }

  .bar:hover {
    box-shadow: 1px 1px 8px 1px #dcdcdc;
  }

  .bar:focus-within {
    box-shadow: 1px 1px 8px 1px #dcdcdc;
    outline: none;
  }

  .voice {
    height: 20px;
    position: absolute;
    right: 15px;
    top: 10px;
  }
}
</style>