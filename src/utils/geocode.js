const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?types=address&access_token=pk.eyJ1IjoiaXZhbnBsZXNrb25qaWMiLCJhIjoiY2tqbGk0MW81MjM1djJ6bG9zd3I2NWIwNiJ9.7fW3ciYckVHu7qROiMb53g&limit=1`

  request({ url, json: true}, (error, { body: response }) => {
   const { features } = response
    if (error) {
      callback('Unable to connect to location services', undefined) // ne mora se undefined predavati kao argument jer se podrazumijeva
     return
    }

    if (!features.length) {
      callback('Unable to find location. Try another search', undefined)
     return
    }

    callback(undefined, {
      latitude: features[0].center[1],
      longitude: features[0].center[0],
      location: features[0].place_name
    })
  })
}

module.exports = geocode