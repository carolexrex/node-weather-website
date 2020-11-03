const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=5ec2c972c16d02af59b84d5f0a3cf365&query=${latitude},${longitude}&units=m`

    request({url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('Could not connect to weatherstack api', undefined)
        }
        else if (body.error) {
            console.log('Unable to find location', undefined)
        }
        else {

            const weatherDescription = body.current.weather_descriptions[0]
            const temperature = body.current.temperature
            const feelsLike = body.current.feelslike
            callback(undefined, `It is ${weatherDescription}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees`)
        }
    })
}

module.exports = forecast

