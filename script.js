const apiKey = '8325bc3df65ff319a9c10806d2d276e3'
document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
        return;
    console.log(value);
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial&APPID=" + apiKey;
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json)
            let results = "";
            results += '<h2>Weather in ' + json.name + "</h2>";
            for (let i=0; i < json.weather.length; i++) {
                results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png" alt=""/>';
            }
            results += '<h2>' + json.main.temp + " &deg;F</h2>"
            results += "<p>"
            for (let i=0; i < json.weather.length; i++) {
                results += json.weather[i].description
                if (i !== json.weather.length - 1)
                    results += ", "
            }
            results += "</p>";
            document.getElementById("weatherResults").innerHTML = results;
        });
    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial&APPID=" + apiKey;
    let rows = 12
    if (document.documentElement.clientWidth < 401) rows = 2
    if (document.documentElement.clientWidth < 901) rows = 5
    console.log(document.documentElement.clientWidth)
    fetch(url2)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            let forecast = '<h2>Five Day Forecast</h2><table><tr>';
            for (let i=0; i < json.list.length; i++) {
                console.log(json.list[i])
                forecast += '<td><p class="date"><strong>' + moment(json.list[i].dt_txt).format('MMM Do, h:mm a') + "</strong></p>";
                forecast += "<p>Temp:<br>" + Math.round(parseInt(json.list[i].main.temp)) + " &deg;F</p>"
                forecast += "<p>Feels Like:<br>" + Math.round(parseInt(json.list[i].main.feels_like)) + " &deg;F</p>"
                forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png" alt="' + json.list[i].weather[0].icon + '"/>'
                forecast += '<p class="data">Wind:<br>' + json.list[i].wind.speed + ' mph ' + toCard(json.list[i].wind.deg) + '</p>'
                forecast += '<p class="data">Humidity:<br>' + json.list[i].main.humidity + '%</p>'
                forecast += '<p class="data">Clouds:<br>' + json.list[i].clouds.all + '%</p>'
                forecast += '</td>'
                if (i%(rows) === rows - 1) forecast += '</tr><tr>'
            }
            forecast += '</tr></table>'
            document.getElementById("forecastResults").innerHTML = forecast;
        });
})

function toCard(deg) {
    deg = parseInt(deg)
    if (deg > 315 || deg < 45) return 'N'
    if (deg > 225) return 'W'
    if (deg > 135) return 'S'
    return 'E'
}