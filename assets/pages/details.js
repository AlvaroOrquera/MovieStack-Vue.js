const url1 = `https://moviestack.onrender.com/api/movies/`;
const key1 = `0ff70d54-dc0b-4262-9c3d-776cb0f34dbd`;

const option1 = {
    headers: {
        'X-API-KEY': key1
    }
}



const { createApp } = Vue
const optionsVue = {
    data() {
        return {
            movie: [],
            id: null,
        }
    },
    beforeCreate() {
        const search = location.search;
        const params = new URLSearchParams(search);
        this.id = params.get("id");
        fetch(url1 + this.id, option1)
            .then(response => response.json())
            .then(data => {
                this.movie = data
                console.log(this.movie)
            }
            )
            .catch(error => console.log(error))



    },

}


const app = createApp(optionsVue)
app.mount('#app')