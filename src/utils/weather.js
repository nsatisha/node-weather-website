const request = require('request')

const weather = (_lat,_long,callback) => {
    const weatherurl = 'http://api.weatherstack.com/current?access_key=275590dfec55c617eb53fc8099e2cffc&query='+_lat+','+_long+'&units=m';
    request({url:weatherurl, json:true},(error,response) => {
        if (error) {
            callback('Network Error', undefined);
        }else if (response.body.success === false) {
            callback('Error:  '+response.body.error.info, undefined)
        }else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                feelsLike: response.body.current.feelslike,
                forecast: response.body.current.weather_descriptions
                
            })
        }
    });
}

module.exports = weather