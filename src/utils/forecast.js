const request = require('request')

// Goal: Add new data to forecast

// 1. Update the forecast string to include new data(humidity, uv-index , blabla)
// 2. Commit your changes
// 3. Push your changes to github and deploy to Heroku
// 4. Test your work in the live application

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
            const uvIndex = body.current.uv_index

            const forecastData = {
                forecastString: `It is ${weatherDescription}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees. UV Index: ${uvIndex}`,
                forecastImage: body.current.weather_icons[0]
            }
            callback(undefined, forecastData)
        }
    })
}

module.exports = forecast

