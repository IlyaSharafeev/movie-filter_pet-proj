<template>
  <div class="header-search">
    <div class="bar">
      <input class="searchbar" type="text" title="Search" @input="searchMovie" v-model="transcript">
      <a href="#">
        <img
            @click="ToggleMic"
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
import {ref, onMounted} from "vue";

const movieStore = useMoviesStore();
const test = ref('');
const searchMovie = useDebounceFn(() => {
  movieStore.searchMovies(test.value);
}, 500)

const transcript = ref('')
const isRecording = ref(false)

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
const sr = new Recognition()

onMounted(() => {
  sr.continuous = true
  sr.interimResults = true

  sr.onstart = () => {
    console.log('SR Started')
    isRecording.value = true
  }

  sr.onend = () => {
    console.log('SR Stopped')
    isRecording.value = false
  }

  sr.onresult = (evt) => {
    for (let i = 0; i < evt.results.length; i++) {
      const result = evt.results[i]

      if (result.isFinal) CheckForCommand(result)
    }

    const t = Array.from(evt.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')

    transcript.value = t
    console.log(transcript.value);
  }
})

const CheckForCommand = (result) => {
  const t = result[0].transcript;
  if (t.includes('stop recording')) {
    sr.stop()
  } else if (
      t.includes('what is the time') ||
      t.includes('what\'s the time')
  ) {
    sr.stop()
    alert(new Date().toLocaleTimeString())
    setTimeout(() => sr.start(), 100)
  }
}

const ToggleMic = () => {
  if (isRecording.value) {
    sr.stop()
  } else {
    sr.start()
  }
}
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