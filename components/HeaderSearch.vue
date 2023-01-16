<template>
  <div class="header-search">
    <div class="bar">
      <input class="searchbar" type="text" title="Search" @input="searchMovie" v-model="transcript">
        <img
            v-if="!movieStore.getStateLoader"
            @click="ToggleMic"
            class="voice status-indicator status-indicator-negative"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Google_mic.svg/716px-Google_mic.svg.png"
            title="Search by Voice"
            alt="search voice icon"
        />
        <div v-if="isRecording && !transcript" id="dot-loader">
          <span id="d1"></span>
          <span id="d2"></span>
          <span id="d3"></span>
          <span id="d4"></span>
          <span id="d5"></span>
        </div>
    </div>
  </div>
</template>

<script setup>
import {useMoviesStore} from "../store/movies";
import {useDebounceFn} from "@vueuse/core";
import {ref, onMounted, watch} from "vue";

const movieStore = useMoviesStore();
const searchMovie = useDebounceFn(() => {
  movieStore.searchMovies(transcript.value);
}, 500)

const transcript = ref('')
const isRecording = ref(false)

watch(transcript, (val) => {
  searchMovie();
})

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
const sr = new Recognition()

onMounted(() => {
  sr.continuous = true
  sr.interimResults = true

  sr.onstart = () => {
    console.log('SR Started')
    isRecording.value = true
    transcript.value = ''
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
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');

.header-search {
  width: 100%;
  height: auto;
  padding: 20px;
  background: #007c83;
  display: flex;
  align-items: center;
  flex-direction: column;
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
    cursor: pointer;
    padding: 0 10px
  }
}

@keyframes dots {
  0% {
    left: 100px;
    top: 0
  }
  80% {
    left: 0;
    top: 0
  }
  85% {
    left: 0;
    top: -20px;
    width: 7px;
    height: 7px
  }
  90% {
    width: 7px;
    height: 7px
  }
  95% {
    left: 100px;
    top: -20px;
    width: 7px;
    height: 7px
  }
  100% {
    left: 100px;
    top: 0
  }
}

#dot-loader {
  width: 100px;
  position: absolute;
  top: 24px;
  left: 235px;
  animation: hider 1s 16s;

  p {
    color: rgba(147, 145, 145, 0.78);
    margin-left: -70px;
    text-transform: uppercase;
    font-family: 'Comfortaa', cursive;
    font-weight: bold;
    font-size: 14px;
  }

  span {
    width: 7px;
    height: 7px;
    background: rgba(147, 145, 145, 0.78);;
    border-radius: 50%;
    position: absolute;
  }
}

#d1 {
  animation: dots 2s linear infinite
}

#d2 {
  animation: dots 2s linear infinite -.4s
}

#d3 {
  animation: dots 2s linear infinite -.8s
}

#d4 {
  animation: dots 2s linear infinite -1.2s
}

#d5 {
  animation: dots 2s linear infinite -1.6s
}
</style>