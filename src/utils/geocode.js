const request = require('request')

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWxleHZhbGgyMCIsImEiOiJja2dqOTNyYjIxem1jMnlzMWI4ZGl4ajltIn0.fzxw39flYMjaejsj9LQPkA&limit=1`

    request ( { url, json:true }, (error, {body} = {}) => {
        if(error) {
            callback('Unable to connect to location services', undefined)
        }
        else if(body.features.length === 0) {
            callback('Could not resolve location, try refining your search', undefined)
        }
        else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode