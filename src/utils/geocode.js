const request = require('postman-request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiN2NtaGciLCJhIjoiY2t5Mm54bGtuMG5mZTJ1bXJ3d29meHNwMCJ9.kDjQLtoFvxkulcISaOZzKw&limit=1`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services.', undefined)
    } else {
      data = body.features.length > 0 ? body.features[0] : undefined
      if (!data) {
        callback('Unable to find location. Try another search.', undefined)
      } else {
        callback(undefined, {
          latitude: data.geometry.coordinates[1],
          longitude: data.geometry.coordinates[0],
          location: data.place_name,
        })
      }
    }
  })
}

module.exports = geocode