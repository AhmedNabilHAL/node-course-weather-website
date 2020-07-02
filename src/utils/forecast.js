const request = require("request");

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=7ee8875c70a82513e5b1403d5285bb39&query=" + encodeURIComponent(lat) + "," + encodeURIComponent(long) + "&unit=m";
    request({ url, json: true }, (error, {body}) => {
        if (error){
            callback("Unable to connect to weather service");
        }
        else if (body.error){
            callback("Unable to find location");
        }
        else{
            callback(undefined, {
                describtion: body.current.weather_descriptions,
                temperature: body.current.temperature,
                feelslike: body.current.feelslike 
            });
        }
    });
}

module.exports = forecast;
