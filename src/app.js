const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


// Route handeler
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kermin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Kermin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page",
        name: "Kermin"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    const address = req.query.address

    geocode(address, (error, {latitude, longitude, location}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return error
            }

            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.send('My 404 page')
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})