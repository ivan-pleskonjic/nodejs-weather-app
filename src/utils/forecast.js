const request = require('request')

const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=7bf6fb30e96227b4a25dc613b7ebef80&query=${lat},${lng}`
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) { // this error is used for low-level OS errors
      callback('Unable to find location', undefined)
      return
    }
    if (body.error) {
      callback('Unable to find location', undefined)
      return
    }
    const {weather_descriptions, temperature, feelslike } = body.current
    callback(undefined, weather_descriptions[0] + '. It is about ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out.')
  })
}

module.exports = forecast