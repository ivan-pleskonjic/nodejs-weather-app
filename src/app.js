const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs') // setup handlebars engine

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') // default views dir name is views
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', viewsPath) // pointing express to custom dir with views/templates
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => { // render index.hbs file with passed data
  res.render('index', {
    title: 'Weather App',
    name: 'Ivan Pleskonjic'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Ivan Pleskonjic'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'This is some message',
    name: 'Ivan Pleskonjic'
  })
})

app.get('/weather', (req, res) => {
  const locationName = req.query.address
  if (!locationName) {
    return res.send({
      error: 'You must provide an address!'
    })
  }

  geocode(locationName, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({location, forecast: forecastData, address: locationName})
    })
  })
})
// dummy route
app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search term!'
    })
    
  }
  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('not-found',{
    title: '404',
    name: 'Ivan Pleskonjic',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => { // needs to come last, matches all routes
  res.render('not-found',{
    title: '404',
    name: 'Ivan Pleskonjic',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => { // pokrece server na port 3000
  console.log(`Server is up on port ${port}`)
}) 