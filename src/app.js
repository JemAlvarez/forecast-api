const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Routes
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (geocodeErr, { lat, lon, location } = {}) => {
        if (geocodeErr) {
            return res.send({ error: geocodeErr })
        }

        forecast(lat, lon, (forecastErr, forecastData) => {
            if (forecastErr) {
                return res.send(forecastErr)
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})