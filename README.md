# Fahrenheit
Fahrenheit is a weather application that allows you to view the weather of your current city in both `metric` and `imperial` system, along with 4-day forecast. Along with that, you can view the weather in a different location and its 4-day forecast. This project was inspired by [FreeCodeCamp](http://freecodecamp.com).
<br><br>
You can view the application on my website here: [http://narulakeshav.com/app/fahrenheit](http://narulakeshav.com/app/fahrenheit)
<br><br>
![Screenshot](http://goo.gl/0A7jI2)

# How it Works
I used [OpenWeatherAPI](http://openweathermap.org/api) in order to fetch the weather of user's current location. The data was in `JSON` format, which I parsed using the `$.getJSON(url, function(data))` by jQuery. Here's an example:
```
{
    "coord":{
        "lon":-121.28,
        "lat":37.91
    },
    "weather":[{
        "id":701,
        "main":"Mist",
        "description":"mist",
        "icon":"50n"
    }],
    "base":"cmc stations",
    "main":{
        "temp":281.77,
        "pressure":1027,
        "humidity":100,
        "temp_min":279.15,
        "temp_max":284.15
    }
}    
```
From that, I got the temperature (`data.main.temp`) which was given in `Kelvin`, which I converted to `Fahrenheit`:
```
function convertKelvinToF(temperature) {
    var KELVIN_FORMULA = 459.67;
    return Math.round((temp * (9 / 5) - KELVIN_FORMULA));
}
```
