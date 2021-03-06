const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// setup handlebars engine
app.set('view engine', 'hbs')

// setup views location
app.set('views', path.join(__dirname, '../templates/views'))

// setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

// register partials path for header
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'M Fadlan Ridho',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'M Fadlan Ridho',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'M Fadlan Ridho',
    message: 'This is a very helpful message.'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error })

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send({ error })

      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address,
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search here!'
    })
  }
  console.log(req.query)
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 404,
    name: 'M Fadlan Ridho',
    errorMessage: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'M Fadlan Ridho',
    errorMessage: 'Page not found.'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})