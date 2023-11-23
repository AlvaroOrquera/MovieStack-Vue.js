const url = `https://moviestack.onrender.com/api/movies/`
const key = `0ff70d54-dc0b-4262-9c3d-776cb0f34dbd`
const options = {
    headers: {
        'X-API-KEY': key
    }
}

const { createApp } = Vue
const optionsVue = {
    data() {
        return {
            movies: [],
            moviesFilter: [],
            genres: [],
            search: "",
            selected: "all",
            filtradoId: [],
            favoritos: [],

        }
    },
    beforeCreate() {
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.movies = data.movies
                this.moviesFilter = this.movies
                console.log(this.movies)
                this.genres = [...new Set(this.movies.map(movie => movie.genres).flat())];
                this.favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
            }
            )
            .catch(error => console.log(error))
    },
    methods: {
        // esto es para la busqueda y el select
        searchs(event) {
            this.search = event.target.value
            this.filtro()
        },
        selecteds(event) {
            this.selected = event.target.value
            this.filtro()
        },
        filtro() {
            this.moviesFilter = this.movies.filter(movie => movie.title.toLowerCase().includes(this.search.toLowerCase())
                && (this.selected === "all" || movie.genres.includes(this.selected)))
        },
        //fin del filtro 
        //empieza añadir favorito
        addFavs(id) {
            const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
            if (!favoritos.includes(id)) {
                this.favoritos.push(id)
                localStorage.setItem('favoritos', JSON.stringify(this.favoritos))
            }
            else {
                this.favoritos = this.favoritos.filter(movie => movie !== id)
                localStorage.setItem('favoritos', JSON.stringify(this.favoritos))
            }
            localStorage.setItem('favoritos', JSON.stringify(this.favoritos))
        },
        //fin de anadir favorito
        

    },
}


const app = createApp(optionsVue)
app.mount('#app')



