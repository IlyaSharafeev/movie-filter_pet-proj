import {defineStore} from 'pinia'
import axios from "axios";

const options = {
    headers: {
        'X-API-KEY': "b242907a-9835-41b1-be38-1f69e9ad0449",
        'Content-Type': 'application/json',
    },
}

export const useMoviesStore = defineStore({
    id: 'movies-store',
    state: () => {
        return {
            movies: [],
            totalPages: null,
            loader: false,
            selectedMovies: [],
            selectedMode: false,
            unreadSelectedMovies: false,
        }
    },
    actions: {
        async setMovies(page: number = 1) {
            this.onLoader();
            await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=${page}`, options)
                .then((response) => {
                    this.totalPages = response.data.totalPages;
                    this.movies = response.data.items;
                })
                .catch((error) => {
                    throw createError({ statusCode: 404, statusMessage: error.message })
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
                .catch((error) => {
                    throw createError({ statusCode: 404, statusMessage: error.message })
                })
            this.offLoader();
        },
        addMovieToFavorites(newMovieId: number) {
            const selectedMovie = this.movies.filter((element) => {
                return element.kinopoiskId === newMovieId;
            })
            selectedMovie[0].star = false;
            this.selectedMovies.push(selectedMovie[0]);
            const index = this.movies.findIndex(n => n.kinopoiskId === newMovieId);
            if (index !== -1) {
                this.movies.splice(index, 1);
            }
        },
        removeToFavorites(movieId: number) {
            const movieToAdd = this.selectedMovies.find(n => n.kinopoiskId === movieId);
            this.movies.unshift(movieToAdd);
            const index = this.selectedMovies.findIndex(n => n.kinopoiskId === movieId);
            if (index !== -1) {
                this.selectedMovies.splice(index, 1);
            }
        },
        onLoader() {
            this.loader = true;
        },
        offLoader() {
            this.loader = false;
        },
        toggleUnreadMovies(flag: boolean) {
            this.unreadSelectedMovies = flag;
        },
    },
    getters: {
        getMovies: state => state.movies,
        getMoviesSelected: state => state.selectedMovies,
        getTotalPages: state => state.totalPages,
        getStateLoader: state => state.loader,
        getUnreadSelectedMovies: state => state.unreadSelectedMovies,
    },
})