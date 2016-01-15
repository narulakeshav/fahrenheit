$(document).ready(function() {
    // CALLING THE URL VARIABLE TO GET GEOLOCATION
    url();

    // UPDATED WEATHER EVERY MINUTE
    var updateTemp = setInterval(url, 10000);

    // INITIATING WOWJS FILE
    new WOW().init();

    // HIDING THE INTRO DIV IN 4.6 SECONDS
    var hideDiv = setTimeout(hideIntro, 4600);
    function hideIntro() {
        $(".intro").addClass("hideDiv");
    }

    // GETTING HTML REFERENCES
    var cityName = document.getElementById("city-name");
    var temperature = document.getElementById("temperature");
    var weatherDescription = document.getElementById("weather-info");
    var weatherIcon = document.getElementById("weather-icon");
    var tempInF = document.getElementById("convert-unit");
    var tempUnit = document.getElementById("temp-type");

    // FOR THE TEMPERATURE FORECAST
    var tempForecast0 = document.getElementById("tom-forecast");
    var tempForecast1 = document.getElementById("tom-1x-forecast");
    var tempForecast2 = document.getElementById("tom-2x-forecast");
    var tempForecast3 = document.getElementById("tom-3x-forecast");

    // DAY FORECAST
    var dayForecast0 = document.getElementById("tom-day");
    var dayForecast1 = document.getElementById("tom-1x-day");
    var dayForecast2 = document.getElementById("tom-2x-day");
    var dayForecast3 = document.getElementById("tom-3x-day");

    // ICON FORECAST
    var iconForecast0 = document.getElementById("tom-icon");
    var iconForecast1 = document.getElementById("tom-1x-icon");
    var iconForecast2 = document.getElementById("tom-2x-icon");
    var iconForecast3 = document.getElementById("tom-3x-icon");

    // CONVERTS THE OPENWEATHER TEMPERATURE FORM KELVIN TO FAHRENHEIT
    function convertKelvinToF(temp) {
        const KELVIN_FORMULA = 459.67;
        return Math.round((temp * (9 / 5) - KELVIN_FORMULA));
    }

    // DETERMINES WHETHER IT'S A DAY, EVENING, OR NIGHT TIME
    function dayEveningOrNight() {
        var time = new Date().getHours();

        // RETURNS -1 FOR DAYTIME, 0 FOR EVENING, & 1 FOR NIGHT TIME
        if (time >= 0 && time <= 6) { return 1; }
        else if (time >= 12 && time <= 17) { return 0; }
        else { return -1; }
    }

    // CHANGES THE DESCRIPTION IF NECESSARY
    function changeDescription(description) {
        if (description == "haze") { weatherDescription.innerHTML = "It's kinda hazy"; }
        else if (description.length < 6) { weatherDescription.innerHTML = "It's kinda " + description + "y"; }
        else { weatherDescription.innerHTML = description.substring(0, 1).toUpperCase() + description.substring(1); }
    }

    // GETS THE ICON BASED ON WEATHER ID
    function getRightIcon(id) {
        if (id >= 200 && id <= 232) {
            // CASE THUNDERSTORM
            if (dayEveningOrNight() == -1) { return "<i class='wi wi-day-thunderstorm'></i>"; }
            else if (dayEveningOrNight() == 1) { return "<i class='wi wi-night-alt-thunderstorm'></i>"; }
            else { return "<i class='wi wi-thunderstorm'></i>"; }
        }
        else if (id >= 300 && id <= 321) {
            // CASE DRIZZLE
            if (dayEveningOrNight() == -1) { return "<i class='wi wi-day-sprinkle'></i>"; }
            else if (dayEveningOrNight() == 1) { return "<i class='wi wi-night-alt-sprinkle'></i>"; }
            else { return "<i class='wi wi-sprinkle'></i>"; }
        }
        else if (id >= 500 && id <= 504) {
            // CASE SHOWERS
            if (dayEveningOrNight() == -1) { return "<i class='wi wi-day-showers'></i>"; }
            else if (dayEveningOrNight() == 1) { return "<i class='wi wi-night-alt-showers'></i>"; }
            else { return "<i class='wi wi-showers'></i>"; }
        }
        else if (id >= 511 && id <= 531) {
            // CASE RAIN
            if (dayEveningOrNight() == -1) { return "<i class='wi wi-day-rain'></i>"; }
            else if (dayEveningOrNight() == 1) { return "<i class='wi wi-night-alt-rain'></i>"; }
            else { return "<i class='wi wi-rain'></i>"; }
        }
        else if (id >= 600 && id <= 622) {
            // CASE SNOW
            if (dayEveningOrNight() == -1) { return "<i class='wi wi-day-snow'></i>"; }
            else if (dayEveningOrNight() == 1) { return "<i class='wi wi-night-alt-snow'></i>"; }
            else { return "<i class='wi wi-snow'></i>"; }
        }
        else if (id >= 701 && id <= 771) {
            // CASE FOG/MIST
            if (dayEveningOrNight() == -1) { return "<i class='wi wi-day-fog'></i>"; }
            else if (dayEveningOrNight() == 1) { return "<i class='wi wi-night-fog'></i>"; }
            else { return "<i class='wi wi-fog'></i>"; }
        }
        else if (id == 781 || id >= 900 && id <= 901) {
            // CASE TORNADO
            return "<i class='wi wi-tornado'></i>";
        }
        else if (id >= 801 && id <= 804) {
            // CASE CLOUDY
            if (dayEveningOrNight() == -1) { return "<i class='wi wi-day-cloudy'></i>"; }
            else if (dayEveningOrNight() == 1) { return "<i class='wi wi-night-alt-cloudy'></i>"; }
            else { return "<i class='wi wi-cloud'></i>"; }
        }
        else if (id >= 951 && id <= 959) {
            // CASE WINDY
            if (dayEveningOrNight() == -1) { return "<i class='wi wi-day-cloudy-gusts'></i>"; }
            else if (dayEveningOrNight() == 1) { return "<i class='wi wi-night-alt-cloudy-gusts'></i>"; }
            else { return "<i class='wi wi-strong-wind'></i>"; }
        }
        else if (id == 962 || id == 902) {
            // CASE HURRICANE
            return "<i class='wi wi-hurricane'></i>";
        }
        else {
            // IT'S JUST SUNNY
            if (dayEveningOrNight() == -1) { return "<i class='wi wi-day-sunny'></i>"; }
            else { return "<i class='wi wi-night-alt-cloudy-gusts'></i>"; }
        }
    }

    // APPENDS THE COUNTRY ABBREVIATION AFTER THE CITY NAME
    function appendCountry(city, countryName) {
        cityName.innerHTML = city + ", " + countryName;
    }

    // GETS THE CURRENT TIME TO DISPLAY DAY OR NIGHT THEME
    function changeBackground() {
        var time = dayEveningOrNight();
        if (time == -1) {
            // DAY TIME (5:00 AM)
            $(".card-view").css("background", "radial-gradient(circle, #FCD057, #FD8934)");
            $("#convert-unit").hover(dayTimeHover, buttonOnNoHover);
            changeForecastIconColor("#FCD057");
        }
        else if (time == 0) {
            // EVENING TIME (5:00 PM)
            $(".card-view").css("background", "radial-gradient(circle, #55B1FA, #2196F3)");
            $("#convert-unit").hover(eveningTimeHover, buttonOnNoHover);
            changeForecastIconColor("#55B1FA");
        }
        else {
            // NIGHT TIME (6:00 PM & BEYOND) (CHANGE THE ACTUAL COLORS)
            $(".card-view").css("background", "radial-gradient(circle, #34495E, #2C3E50)");
            $("#convert-unit").hover(nightTimeHover, buttonOnNoHover);
            changeForecastIconColor("#34495E");
        }
    }

    function changeForecastIconColor(color) {
        $("#tom-icon").css("color", color);
        $("#tom-1x-icon").css("color", color);
        $("#tom-2x-icon").css("color", color);
        $("#tom-3x-icon").css("color", color);
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
    function differentLocation() {
        $("#convert-unit").css("color", "#8FA193");
    }

    // NO HOVER ON BUTTONS
    function buttonOnNoHover() {
        $("#convert-unit").css("color", "#FFF");
    }

    // CONVERTS THE TEMPERATURE FROM CELCIUS TO FAHRENHEIT
    tempInF.onclick = function() {
        if (tempInF.innerHTML == "F") {
            // CONVERT TEMPERATURE TO CELCIUS
            temperature.innerHTML = Math.floor((temperature.innerHTML - 32) * (5 / 9));
            tempForecast0.innerHTML = Math.floor((tempForecast0.innerHTML - 32) * (5 / 9));
            tempForecast1.innerHTML = Math.floor((tempForecast1.innerHTML - 32) * (5 / 9));
            tempForecast2.innerHTML = Math.floor((tempForecast2.innerHTML - 32) * (5 / 9));
            tempForecast3.innerHTML = Math.floor((tempForecast3.innerHTML - 32) * (5 / 9));
            tempInF.innerHTML = "C";
            tempUnit.innerHTML = "C";
        } else {
            // CONVERT TEMPERATURE TO FAHRENHEIT
            temperature.innerHTML = Math.ceil(temperature.innerHTML * (9 / 5) + 32);
            tempForecast0.innerHTML = Math.ceil(tempForecast0.innerHTML * (9 / 5) + 32);
            tempForecast1.innerHTML = Math.ceil(tempForecast1.innerHTML * (9 / 5) + 32);
            tempForecast2.innerHTML = Math.ceil(tempForecast2.innerHTML * (9 / 5) + 32);
            tempForecast3.innerHTML = Math.ceil(tempForecast3.innerHTML * (9 / 5) + 32);
            tempInF.innerHTML = "F";
            tempUnit.innerHTML = "F";
        }
    };

    $("#input").keypress(function(event) {
        if (event.keyCode == 13) {
            search(document.getElementById("input").value);
            $("#input").val("");
        }
    });

    // GETS THE CURRENT LOCATION OF THE USER
    function url() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                // OPENWEATHER API KEY
                var APIKey = '79bb2d50ad8139554edb48834a59e016';
                // GET LATITUDE AND LONGITUDE POSITION
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                // GENERATE THE URL BASED ON LONGITUDE AND LATITUDE
                var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;
                forecast(lon, lat, APIKey);
                $.getJSON(url, function(data) {
                    // GETS THE KEY VALUE PAIRS FROM THE JSON
                    var city = data.name;
                    var country = data.sys.country;
                    var description = data.weather[0].description;
                    var weatherID = data.weather[0].id;
                    temperature.innerHTML = convertKelvinToF(data.main.temp);
                    description = changeDescription(description);

                    // MANIPULATES THE ELEMENTS TO FIT THE SIZE AND CONCATENATE THEM
                    if (city == "Taft Mosswood") {
                        cityName.innerHTML = "Stockton" + ", " + country;
                    } else {
                        appendCountry(city, country);
                    }
                    // CHANGE CARD BACKGROUND
                    changeBackground();
                    weatherIcon.innerHTML = getRightIcon(weatherID);
                    $("#page-title").html(weatherDescription.innerHTML + " - Fahrenheit");
                });
            });
        }
        // IF NOT SUPPORTED, ALERT IT'S NOT SUPPORTED
        else {
            alert("Geolocation not supported by your Browser. Try maybe .. Chrome?");
        }
    }

    // GET THE CURRENT CITY'S FORECAST FOR 3 DAYS
    function forecast(lon, lat, APIKey) {
        var url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;
        $.getJSON(url, function(data) {

            var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            var tom_one_ID = data.list[5].weather[0].id;
            var tom_one_Day = new Date(data.list[5].dt_txt);
            tom_one_Day = weekday[tom_one_Day.getDay()];
            tempForecast0.innerHTML = convertKelvinToF(data.list[5].main.temp);
            dayForecast0.innerHTML = tom_one_Day;
            iconForecast0.innerHTML = getRightIcon(tom_one_ID);

            var tomID = data.list[13].weather[0].id;
            var tomDay = new Date(data.list[13].dt_txt);
            tomDay = weekday[tomDay.getDay()];
            tempForecast1.innerHTML = convertKelvinToF(data.list[13].main.temp);
            dayForecast1.innerHTML = tomDay;
            iconForecast1.innerHTML = getRightIcon(tomID);

            // FORECAST FOR DAY AFTER TOMORROW
            var tom_two_ID = data.list[21].weather[0].id;
            var tom_two_Day = new Date(data.list[21].dt_txt);
            tom_two_Day = weekday[tom_two_Day.getDay()];
            tempForecast2.innerHTML = convertKelvinToF(data.list[21].main.temp);
            dayForecast2.innerHTML = tom_two_Day;
            iconForecast2.innerHTML = getRightIcon(tom_two_ID);

            // FORECAST FOR DAY AFTER TOMORROW'S TOMORROW
            var tom_three_ID = data.list[29].weather[0].id;
            var tom_three_Day = new Date(data.list[29].dt_txt);
            tom_three_Day = weekday[tom_three_Day.getDay()];
            tempForecast3.innerHTML = convertKelvinToF(data.list[29].main.temp);
            dayForecast3.innerHTML = tom_three_Day;
            iconForecast3.innerHTML = getRightIcon(tom_three_ID);
        });
    }

    function search(inputCity) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // API KEY
            var APIKey = '79bb2d50ad8139554edb48834a59e016';
            // GENERATE THE URL BASED ON LONGITUDE AND LATITUDE
            var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + inputCity + '&appid=' + APIKey;

            $.getJSON(url, function(data) {
                // GET LONG/LAT TO GET FORECAST
                var lon = data.coord.lon;
                var lat = data.coord.lat;
                forecast(lon, lat, APIKey);

                // GETS THE KEY VALUE PAIRS FROM THE JSON
                var city = data.name;
                var country = data.sys.country;
                var description = data.weather[0].description;
                var weatherID = data.weather[0].id;
                temperature.innerHTML = convertKelvinToF(data.main.temp);
                description = changeDescription(description);

                // MANIPULATES THE ELEMENTS TO FIT THE SIZE AND CONCATENATE THEM
                if (city == "Taft Mosswood") { cityName.innerHTML = "Stockton" + ", " + country; } 
                else { appendCountry(city, country); }

                // CHANGING THE ICONS
                weatherIcon.innerHTML = getRightIcon(weatherID);
                
                // CHANGE CARD BACKGROUND
                $(".card-view").css("background", "radial-gradient(circle, #A2B3A6, #8FA193)");
                changeForecastIconColor("#8FA193");
                $("#convert-unit").hover(eveningTimeHover, buttonOnNoHover);
                $("#page-title").html(weatherDescription.innerHTML + " - Fahrenheit");
            });
        });
    }
});