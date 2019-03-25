const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = `https://api.darksky.net/forecast/09d17497ed257acb9fef3cea3e516570/${lat},${lon}`

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather services.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degress out, with a high of  ${body.daily.data[0].temperatureHigh} and a low of ${body.daily.data[0].temperatureLow}. There is a ${body.currently.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast