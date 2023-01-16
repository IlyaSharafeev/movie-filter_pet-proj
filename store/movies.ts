import {defineStore} from 'pinia'
import axios from "axios";
const config = useRuntimeConfig();

const options = {
    headers: {
        'X-API-KEY': config.public.VUE_APP_X_API_KEY_MOVIES,
        'Content-Type': 'application/json',
    },
}

export const useMoviesStore = defineStore({
    id: 'movies-store',
    state: () => {
        return {
            movies: false,
            totalPages: null,
            loader: false,
        }
    },
    actions: {
        async setMovies(page: number = 1) {
            this.onLoader();
            await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=${page}`, options)
                .then((response) => {
                    this.movies = response.data.items;
                    this.totalPages = response.data.totalPages;
                })
            this.offLoader();
        },
        async searchMovies(string: string) {
            this.onLoader();
            await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${string}&page=1`, options)
                .then((response) => {
                    this.movies = response.data.films;
                    this.totalPages = response.data.pagesCount;
                })
            this.offLoader();
        },
        onLoader() {
            this.loader = true;
        },
        offLoader() {
            this.loader = false;
        }
    },
    getters: {
        getMovies: state => state.movies,
        getTotalPages: state => state.totalPages,
        getStateLoader: state => state.loader,
    },
})