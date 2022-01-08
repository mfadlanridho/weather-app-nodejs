const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=d72d3d7f2dc4c9d74b21a726d6804ad4&query=${latitude},${longitude}&units=f`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      data = body.current
      callback(undefined, `${data.weather_descriptions[0]}, temperature is ${data.temperature} but it feels like ${data.feelslike}`)
    }
  })
}

module.exports = forecast