# Fahrenheit
Fahrenheit is a weather application that allows you to view the weather of your current city in both `metric` and `imperial` system, along with 4-day forecast. Along with that, you can view the weather in a different location and its 4-day forecast. This project was inspired by [FreeCodeCamp](http://freecodecamp.com).
<br><br>
You can view the application on my website here: [http://narulakeshav.com/app/fahrenheit](http://narulakeshav.com/app/fahrenheit)
<br><br>
![Screenshot](http://i.imgur.com/4P6ZZYr.jpg)

# How it Works
I used [OpenWeatherAPI](http://openweathermap.org/api) in order to fetch the weather of user's current location. The data was in `JSON` format, which I parsed using the `$.getJSON()` method by jQuery. Here's an example:
```
{
    "weather":[{
        "id":701,
        "main":"Mist",
        "description":"mist",
        "icon":"50n"
    }],
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
    const KELVIN_FORMULA = 459.67;
    return Math.round(temperature * (9/5) - KELVIN_FORMULA);
}
```
And from the weather `ID`, I was able to decide which icon to show. For example, `511 <= id <= 531` would show a rain icon, whereas `701 <= id <= 771` would show a foggy/mist icon.
# What I Used
* HTML5/CSS3
* Bootstrap3
* JavaScript/jQuery
* JSON 
* Openweather API

# Design
I used `Twitter Bootstrap`, `Animate.css`, `Hover.css`, `Wow.js`, `Font Awesome`, and `Weather Icons` for design, icons, and animations. Designing this was just as fun as challenging. I wanted something pleasing to the eyes, but with good colors. It took me around 2 days to figure out the color scheme for the entire project. I love designing, but I wish it was easier.

# Can you contribute?
Of course. All the pull request are welcomed (that will help me a ton) and will be reviewed. If I like it, it's going on the website with your name and Twitter/LinkedIn handle. 

# What I learned
This was one of the [intermediate Zipline challenge by FreeCodeCamp](http://goo.gl/VcIccD). This project taught me more than I ever expected. I was able to work with `JSON` and `API` for the first time. Although I had trouble in the beginning, I used all the resources, such as `StackOverflow` and `FreeCodeCamp`.
<br><br>
I didn't have to do all the things that I did, but I did it in order to learn more and understanding how everything works. This was so hard, but I'm more than happy with the final result.