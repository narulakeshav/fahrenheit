// GETTING HTML REFERENCES
var cityName = document.getElementById("city-name");
var temperature = document.getElementById("temperature");
var weatherDescription = document.getElementById("weather-info");
var weatherIcon = document.getElementById("weather-icon");
var tempInF = document.getElementById("convert-unit");
var tempUnit = document.getElementById("temp-type");

// CONVERTS THE OPENWEATHER TEMPERATURE FORM KELVIN TO FAHRENHEIT
function convertKelvinToF(temp) {
    var KELVIN_FORMULA = 459.67;
    return Math.ceil((temp * (9/5) - KELVIN_FORMULA));
}

// DETERMINES WHETHER IT'S A DAY, EVENING, OR NIGHT TIME
function dayEveningOrNight() {
    var time = new Date().getHours();

    // RETURNS -1 FOR DAYTIME, 0 FOR EVENING, & 1 FOR NIGHT TIME
    if(time <= 13) return -1;
    else if (time <= 17) return 0;
    else return 1;
}

// GETS THE CURRENT LOCATION OF THE USER
var url = function() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // OPENWEATHER API KEY
            var APIKey = '79bb2d50ad8139554edb48834a59e016';
            // GET LATITUDE AND LONGITUDE POSITION
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            // GENERATE THE URL BASED ON LONGITUDE AND LATITUDE
            var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;
            console.log(url);
            $.getJSON(url, function(data) {
                // GETS THE KEY VALUE PAIRS FROM THE JSON
                var city = data.name;
                var country = data.sys.country;
                var description = data.weather[0].description;
                var weatherID = data.weather[0].id;
                temperature.innerHTML = convertKelvinToF(data.main.temp);

                $("#page-title").html(city + ", " + country + " - Fahrenheit");

                // MANIPULATES THE ELEMENTS TO FIT THE SIZE AND CONCATENATE THEM
                if(city == "Taft Mosswood") cityName.innerHTML = "Stockton" + ", " + country;
                else {
                    if(city.length > 9) { shortenCityName(); }
                    else appendCountry(city, country); 
                }
                if(description.length < 6) {
                    weatherDescription.innerHTML = "It's kinda " + description + "y";
                }
                else {
                    weatherDescription.innerHTML = description.substring(0,1).toUpperCase() + description.substring(1);
                }
                changeBackground();

                // SHOWING ICONS ACCORDING TO ID
                if(weatherID >= 200 && weatherID <= 232) {
                    // CASE THUNDERSTORM
                    if(dayEveningOrNight() == -1) {
                        weatherIcon.innerHTML = "<i class='wi wi-day-thunderstorm'></i>";
                    }
                    else if(dayEveningOrNight() == 1){
                        weatherIcon.innerHTML = "<i class='wi wi-night-alt-thunderstorm'></i>";
                    }
                    else {
                        weatherIcon.innerHTML = "<i class='wi wi-thunderstorm'></i>";
                    }
                }
                else if(weatherID >= 300 && weatherID <= 321) {
                    // CASE DRIZZLE
                    if(dayEveningOrNight() == -1) {
                        weatherIcon.innerHTML = "<i class='wi wi-day-sprinkle'></i>";
                    }
                    else if(dayEveningOrNight() == 1){
                        weatherIcon.innerHTML = "<i class='wi wi-night-alt-sprinkle'></i>";
                    }
                    else {
                        weatherIcon.innerHTML = "<i class='wi wi-sprinkle'></i>";
                    }
                }
                else if(weatherID >= 500 && weatherID <= 504) {
                    // CASE SHOWERS
                    if(dayEveningOrNight() == -1) {
                        weatherIcon.innerHTML = "<i class='wi wi-day-showers'></i>";
                    }
                    else if(dayEveningOrNight() == 1){
                        weatherIcon.innerHTML = "<i class='wi wi-night-alt-showers'></i>";
                    }
                    else {
                        weatherIcon.innerHTML = "<i class='wi wi-showers'></i>";
                    }
                }
                else if(weatherID >= 511 && weatherID <= 531) {
                    // CASE RAIN
                    if(dayEveningOrNight() == -1) {
                        weatherIcon.innerHTML = "<i class='wi wi-day-rain'></i>";
                    }
                    else if(dayEveningOrNight() == 1){
                        weatherIcon.innerHTML = "<i class='wi wi-night-alt-rain'></i>";
                    }
                    else {
                        weatherIcon.innerHTML = "<i class='wi wi-rain'></i>";
                    }
                }
                else if(weatherID >= 600 && weatherID <= 622) {
                    // CASE SNOW
                    if(dayEveningOrNight() == -1) {
                        weatherIcon.innerHTML = "<i class='wi wi-day-snow'></i>";
                    }
                    else if(dayEveningOrNight() == 1){
                        weatherIcon.innerHTML = "<i class='wi wi-night-alt-snow'></i>";
                    }
                    else {
                        weatherIcon.innerHTML = "<i class='wi wi-snow'></i>";
                    }
                }
                else if(weatherID >= 701 && weatherID <= 771) {
                    // CASE FOG/MIST
                    if(dayEveningOrNight() == -1) {
                        weatherIcon.innerHTML = "<i class='wi wi-day-fog'></i>";
                    }
                    else if(dayEveningOrNight() == 1){
                        weatherIcon.innerHTML = "<i class='wi wi-night-fog'></i>";
                    }
                    else {
                        weatherIcon.innerHTML = "<i class='wi wi-fog'></i>";
                    }
                }
                else if(weatherID == 781 || weatherID >= 900 && weatherID <= 901) {
                    // CASE TORNADO
                    weatherIcon.innerHTML = "<i class='wi wi-tornado'></i>";
                }
                else if(weatherID >= 801 && weatherID <= 804) {
                    // CASE CLOUDY
                    if(dayEveningOrNight() == -1) {
                        weatherIcon.innerHTML = "<i class='wi wi-day-cloudy'></i>";
                    }
                    else if(dayEveningOrNight() == 1){
                        weatherIcon.innerHTML = "<i class='wi wi-night-alt-cloudy'></i>";
                    }
                    else {
                        weatherIcon.innerHTML = "<i class='wi wi-cloud'></i>";
                    }
                }
                else if(weatherID >= 951 && weatherID <= 959) {
                    // CASE WINDY
                    if(dayEveningOrNight() == -1) {
                        weatherIcon.innerHTML = "<i class='wi wi-day-cloudy-gusts'></i>";
                    }
                    else if(dayEveningOrNight() == 1){
                        weatherIcon.innerHTML = "<i class='wi wi-night-alt-cloudy-gusts'></i>";
                    }
                    else {
                        weatherIcon.innerHTML = "<i class='wi wi-strong-wind'></i>";
                    }
                }
                else if(weatherID == 962 || weatherID == 902) {
                    // CASE HURRICANE
                    weatherIcon.innerHTML = "<i class='wi wi-hurricane'></i>";
                }
                else {
                    // IT'S JUST SUNNY
                    weatherIcon.innerHTML = "<i class='wi wi-sunny'></i>";
                    if(dayEveningOrNight() == -1) {
                        weatherIcon.innerHTML = "<i class='wi wi-day-sunny'></i>";
                    }
                    else {
                        weatherIcon.innerHTML = "<i class='wi wi-night-alt-cloudy-gusts'></i>";
                    }
                }
            });
        });
    }
    // IF NOT SUPPORTED, ALERT IT'S NOT SUPPORTED
    else {
        alert("Geolocation not supported by your Browser. Try maybe .. Chrome?");
    }
}


// SHORTEN THE CITY NAME IF LONGER THAN 9 CHARACTERS
function shortenCityName() {
    $("#city-name").css("font-size", "25px");
    $("#city-name").css("padding-top", "15px");
}

// APPENDS THE COUNTRY ABBREVIATION AFTER THE CITY NAME
function appendCountry(city, countryName) {
    cityName.innerHTML = city + ", " + countryName;
}

// GETS THE CURRENT TIME TO DISPLAY DAY OR NIGHT THEME
function changeBackground() {
    var time = dayEveningOrNight();
    if(time == -1) {
        // DAY TIME (5:00 AM)
        $(".card-view").css("background", "radial-gradient(circle, #FCD057, #FD8934)");
    }
    else if(time == 0) {
        // EVENING TIME (5:00 PM)
        $(".card-view").css("background", "radial-gradient(circle, #55B1FA, #2196F3)");
    }
    else {
        // NIGHT TIME (6:00 PM & BEYOND) (CHANGE THE ACTUAL COLORS)
        $(".card-view").css("background", "radial-gradient(circle, #34495E, #2C3E50)");
    }
}

// CALLING THE URL VARIABLE TO GET GEOLOCATION
url();

var reload = setInterval(url, 10000);

$(document).ready(function() {

    // CONVERTS THE TEMPERATURE FROM CELCIUS TO FAHRENHEIT
    tempInF.onclick = function() {
        if(tempInF.innerHTML == "F") {
            // CONVERT TEMPERATURE TO CELCIUS
            temperature.innerHTML =  Math.ceil((temperature.innerHTML - 32) * (5/9));
            tempInF.innerHTML = "C";
            tempUnit.innerHTML = "C";
        }
        else {
            // CONVERT TEMPERATURE TO FAHRENHEIT
            temperature.innerHTML = Math.ceil(temperature.innerHTML * (9/5) + 32);
            tempInF.innerHTML = "F";
            tempUnit.innerHTML = "F";
        }
    }

});