const request = require('request')
const darkskyApi = process.env.darkskyApi

const forecast = (long, lat, callback) => {
    
    const url = 'https://api.darksky.net/forecast/'+ darkskyApi +'/'+ long + ',' + lat + '?units=si'

    request( { url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to find location.', undefined)
        } else if (body.currently.length === 0){
            callback('Currently no forecast available', undefined)
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                summary: body.currently.summary
            })
        }
    })

}

module.exports = forecast