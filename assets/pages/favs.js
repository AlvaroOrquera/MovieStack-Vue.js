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
            favoritos: [],
            favoritosFiltrados: [],
        }
    },
    beforeCreate() {
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.movies = data.movies
                this.favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
                console.log(this.favoritos)
                this.favoritosFiltrados = this.movies.filter(movie => this.favoritos.some(n => n === movie.id))
                console.log(this.favoritosFiltrados)
            }
            )
            .catch(error => console.log(error))
    },

    methods: {
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
    }
}



const app = createApp(optionsVue)
app.mount('#app')
