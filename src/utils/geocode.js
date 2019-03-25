const request = require('request')

const geocode = (location, callback) => {
    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiYmx1ZXN0YXJ4ZCIsImEiOiJjanAxeWFjODYwMWd5M2tucnRsandsNDJrIn0.iI3gfmCSJt9JATJK9G8zrg&limit=1`

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to location services.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try a different search term.', undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode