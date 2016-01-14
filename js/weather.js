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
    if(time <= 12) { return -1; }
    else if (time <= 17) { return 0; }
    else { return 1; }
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
            $.getJSON(url, function(data) {
                // GETS THE KEY VALUE PAIRS FROM THE JSON
                var city = data.name;
                var country = data.sys.country;
                var description = data.weather[0].description;
                var weatherID = data.weather[0].id;
                temperature.innerHTML = convertKelvinToF(data.main.temp);

                $("#page-title").html(city + ", " + country + " - Fahrenheit");

                // MANIPULATES THE ELEMENTS TO FIT THE SIZE AND CONCATENATE THEM
                if(city == "Taft Mosswood") { cityName.innerHTML = "Stockton" + ", " + country; }
                else {
                    if(city.length > 9) { shortenCityName(); }
                    else { appendCountry(city, country); }
                }
                if(description.length < 6) {
                    weatherDescription.innerHTML = "It's kinda " + description + "y";
                }
                else {
                    weatherDescription.innerHTML = description.substring(0,1).toUpperCase() + description.substring(1);
                }

                // CHANGE CARD BACKGROUND
                changeBackground();
                weatherIcon.innerHTML = getRightIcon(weatherID);

                // SHOW CURRENT WEATHER IN FORECAST
                var today = new Date();
                var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                today = weekday[today.getDay()];
                $("#today").html(today);
                $("#today-forecast-icon").html(weatherIcon.innerHTML);
                $("#today-forecast-weather").html(temperature.innerHTML);
            });
        });
    }
    // IF NOT SUPPORTED, ALERT IT'S NOT SUPPORTED
    else {
        alert("Geolocation not supported by your Browser. Try maybe .. Chrome?");
    }
};

// GET THE CURRENT CITY'S FORECAST FOR 3 DAYS
var forecast = function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        // OPENWEATHER API KEY
        var APIKey = '79bb2d50ad8139554edb48834a59e016';
        // GET LATITUDE AND LONGITUDE POSITION
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        // GENERATE THE URL BASED ON LONGITUDE AND LATITUDE
        var url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;
        console.log(url);

        // USE GET JSON TO CONVERT THE DATA
        $.getJSON(url, function(data) {
            // FORECAST FOR TOMORROW
            var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

            var tomTemp = convertKelvinToF(data.list[6].main.temp);
            var tomID = data.list[6].weather[0].id;
            var tomDay = new Date(data.list[6].dt_txt);
            tomDay = weekday[tomDay.getDay()];
            $("#tom-forecast").html = tomTemp;
            $("#tom-day").html = tomDay ;
            $("#tom-icon").html = getRightIcon(tomID);

            // FORECAST FOR DAY AFTER TOMORROW
            var tom2xTemp = convertKelvinToF(data.list[14].main.temp);
            var tom2xID = data.list[14].weather[0].id;
            var tom2xDate = new Date(data.list[14].dt_txt);
            tom2xDay = weekday[tom2xDate.getDay()];
            $("#tom-2x-forecast").html = tom2xTemp;
            $("#tom-2x-day").html = tom2xDay;
            $("#tom-2x-icon").html = getRightIcon(tom2xID);

            // FORECAST FOR DAY AFTER TOMORROW
            var tom3xTemp = convertKelvinToF(data.list[22].main.temp);
            var tom3xID = data.list[22].weather[0].id;
            var tom3xDate = new Date(data.list[22].dt_txt);
            tom3xDay = weekday[tom3xDate.getDay()];
            $("#tom-3x-forecast").html = tom3xTemp;
            $("#tom-3x-day").html = tom3xDay;
            $("#tom-3x-icon").html = getRightIcon(tom3xID);
        });
    });
};

// GETS THE ICON BASED ON WEATHER ID
function getRightIcon(id) {
    if(id >= 200 && id <= 232) {
        // CASE THUNDERSTORM
        if(dayEveningOrNight() == -1) {
            return "<i class='wi wi-day-thunderstorm'></i>";
        }
        else if(dayEveningOrNight() == 1){
            return "<i class='wi wi-night-alt-thunderstorm'></i>";
        }
        else {
            return "<i class='wi wi-thunderstorm'></i>";
        }
    }
    else if(id >= 300 && id <= 321) {
        // CASE DRIZZLE
        if(dayEveningOrNight() == -1) {
            return "<i class='wi wi-day-sprinkle'></i>";
        }
        else if(dayEveningOrNight() == 1){
            return "<i class='wi wi-night-alt-sprinkle'></i>";
        }
        else {
            return "<i class='wi wi-sprinkle'></i>";
        }
    }
    else if(id >= 500 && id <= 504) {
        // CASE SHOWERS
        if(dayEveningOrNight() == -1) {
            return "<i class='wi wi-day-showers'></i>";
        }
        else if(dayEveningOrNight() == 1){
            return "<i class='wi wi-night-alt-showers'></i>";
        }
        else {
            return "<i class='wi wi-showers'></i>";
        }
    }
    else if(id >= 511 && id <= 531) {
        // CASE RAIN
        if(dayEveningOrNight() == -1) {
            return "<i class='wi wi-day-rain'></i>";
        }
        else if(dayEveningOrNight() == 1){
            return "<i class='wi wi-night-alt-rain'></i>";
        }
        else {
            return "<i class='wi wi-rain'></i>";
        }
    }
    else if(id >= 600 && id <= 622) {
        // CASE SNOW
        if(dayEveningOrNight() == -1) {
            return "<i class='wi wi-day-snow'></i>";
        }
        else if(dayEveningOrNight() == 1){
            return "<i class='wi wi-night-alt-snow'></i>";
        }
        else {
            return "<i class='wi wi-snow'></i>";
        }
    }
    else if(id >= 701 && id <= 771) {
        // CASE FOG/MIST
        if(dayEveningOrNight() == -1) {
            return "<i class='wi wi-day-fog'></i>";
        }
        else if(dayEveningOrNight() == 1){
            return "<i class='wi wi-night-fog'></i>";
        }
        else {
            return "<i class='wi wi-fog'></i>";
        }
    }
    else if(id == 781 || id >= 900 && id <= 901) {
        // CASE TORNADO
        return "<i class='wi wi-tornado'></i>";
    }
    else if(id >= 801 && id <= 804) {
        // CASE CLOUDY
        if(dayEveningOrNight() == -1) {
            return "<i class='wi wi-day-cloudy'></i>";
        }
        else if(dayEveningOrNight() == 1){
            return "<i class='wi wi-night-alt-cloudy'></i>";
        }
        else {
            return "<i class='wi wi-cloud'></i>";
        }
    }
    else if(id >= 951 && id <= 959) {
        // CASE WINDY
        if(dayEveningOrNight() == -1) {
            return "<i class='wi wi-day-cloudy-gusts'></i>";
        }
        else if(dayEveningOrNight() == 1){
            return "<i class='wi wi-night-alt-cloudy-gusts'></i>";
        }
        else {
            return "<i class='wi wi-strong-wind'></i>";
        }
    }
    else if(id == 962 || id == 902) {
        // CASE HURRICANE
        return "<i class='wi wi-hurricane'></i>";
    }
    else {
        // IT'S JUST SUNNY
        if(dayEveningOrNight() == -1) {
            return "<i class='wi wi-day-sunny'></i>";
        }
        else {
            return "<i class='wi wi-night-alt-cloudy-gusts'></i>";
        }
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
        $("#convert-unit").hover(dayTimeHover, buttonOnNoHover);
    }
    else if(time == 0) {
        // EVENING TIME (5:00 PM)
        $(".card-view").css("background", "radial-gradient(circle, #55B1FA, #2196F3)");
        $("#convert-unit").hover(eveningTimeHover, buttonOnNoHover);
    }
    else {
        // NIGHT TIME (6:00 PM & BEYOND) (CHANGE THE ACTUAL COLORS)
        $(".card-view").css("background", "radial-gradient(circle, #34495E, #2C3E50)");
        $("#convert-unit").hover(nightTimeHover, buttonOnNoHover);
    }
}

// FOR DAY TIME
function dayTimeHover() {
    $("#convert-unit").css("color", "#FD8934");
}

// FOR EVENING TIME
function eveningTimeHover() {
    $("#convert-unit").css("color", "#2196F3");
}

// FOR NIGHT TIME
function nightTimeHover() {
    $("#convert-unit").css("color", "#2C3E50");
}

// NO HOVER ON BUTTONS
function buttonOnNoHover() {
    $("#convert-unit").css("color", "#FFF");
}

// CALLING THE URL VARIABLE TO GET GEOLOCATION
url();
forecast();

// LOADS THE WEATHER EVERY TEN SECONDS
var reloadCurrent = setInterval(url, 10000);
var reloadForecast = setInterval(forecast, 10000);

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
    };
});