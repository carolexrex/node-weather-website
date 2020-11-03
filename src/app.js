const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Create a partial for the footer

// 1. Setup the template for the footer partial "Created by Some Name"
// 2. Render the partial at the bottom of all three pages
// 3. Test your work by visiting all three pages

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Sets up handlebars in express as the templating engine and the views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

//GET Routes
app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name: 'Alexandré Olé'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Alexandré Olé'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page',
        title: 'Help',
        name: 'Alexandré Olé'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'No location was provided'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send ({
                    error
                })
            }
            res.send ({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
       })
})

// goal: wire upp /weather

// 1. Require geocode/forecast into app.js
// 2. Use the address to geocode
// 3. Use the coordinates to get forecast
// 4. Send back the real forecast and location

app.get('/products', (req, res) => {
    //console.log(req.query)
    if(!req.query.search) {
        return res.send ({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        message: 'Help article not found',
        title: '404',
        name: 'Alexandré Olé'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        title: '404',
        name: 'Alexandré Olé'
    })
})

// goal: Create a 404 page with handlebars

// 1. Setup the template to render the header and footer
// 2. Setup the template to render an error message in a paragraph
// 3. Render the template for both 404 routes
// -page not found
// -help article not found
// 4. Test your work. Visit /what and /help/units

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})