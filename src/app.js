const path = require('path')
const request = require('request')
const express = require('express')
const hbs = require('hbs')
const { static } = require('express')

const app = express()
const port = process.env.PORT || 3000

const publicDirectory = path.join(__dirname, '../public')
const ViewDirectory = path.join(__dirname, '../templates/views')
const partialDirectory = path.join(__dirname, "../templates/partials")

app.set('view engine', 'hbs')
app.set('views', ViewDirectory)
hbs.registerPartials(partialDirectory)



app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        'title': 'SOme Title'
    })
})

app.get('/help', (req, res) => {
    res.render('help')
})

app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/movie', (req, res) => {
    if (!req.query.title) {
        return res.send({
            'error': 'Provide with correct title of the movie to continue'
        })
    }
    else {
        url = "http://www.omdbapi.com/?t=" + req.query.title + "&apikey=c6e76828"
        request({ url: url, json: true }, (error, { body }) => {
            if (error) {
                return res.send({ error })
            }
            return res.send({ body })
        })
    }

})

// This is always supposed to come last
app.get("*", (req, res) => {
    res.render('404', {
        'title': 'Some error 404',
        'errorMsg': 'OO some error occured'
    })
})

app.listen(port, () => {
    console.log("Server up and running on port 3000")
})