console.log("Working on fetching javasript Yola!!!!!!!")



const form = document.querySelector('form')
const search = document.querySelector('input')

const movieSearch = form.addEventListener('submit', (e) => {
    e.preventDefault()

    const movie = search.value
    url = "/movie?title=" + movie
    fetch(url).then((response) => {
        response.json().then((data) => {
            movie_detail = data.body
            if (movie_detail.Response === "False") {
                document.getElementById("movie_details").textContent = "Search not found"
            } else {
                console.log(movie_detail)
                document.getElementById("movie_details").textContent = JSON.stringify(movie_detail)
            }


        })
    })
})