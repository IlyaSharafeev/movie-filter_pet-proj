import {defineStore} from 'pinia'
import axios from "axios";

const options = {
    headers: {
        'X-API-KEY': 'b242907a-9835-41b1-be38-1f69e9ad0449',
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
        setMovies(page: number = 1) {
            axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=${page}`, options)
                .then((response) => {
                    this.movies = response.data.items;
                    this.totalPages = response.data.totalPages;
                })
        },
        searchMovies(string: string) {
            axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${string}&page=1`, options)
                .then((response) => {
                    console.log(response);
                    this.movies = response.data.films;
                    this.totalPages = response.data.pagesCount;
                })
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