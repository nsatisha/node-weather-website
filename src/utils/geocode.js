const request = require('request');

const geocode = (location,callback) => {
    const geocodingURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(location)+'.json?access_token=pk.eyJ1Ijoic2F0aXNobmluZ2FwcGEiLCJhIjoiY2tleHRjYzVpMGhuNTMwbDg5NzRtbWp1aCJ9.AIhnxAUPsMp-wq1ItHH3HA';

    request({url:geocodingURL,json:true},(error,response)=>{
        if(error) {
            callback('Network Error : Unable to connect to server',undefined);
        }else if(response.body.features.length === 0) {
            callback('Location does not match',undefined)
        }else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                place: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode