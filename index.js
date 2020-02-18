var submitButton = document.getElementById('submit');
var locationInput = document.getElementById('loc');
var outputElement = document.getElementsByClassName('outputs')[0];
var currentLocationButton = document.getElementById('currentweather');
var API_KEY = '&appid=';
var API_URL = 'http://api.openweathermap.org/data/2.5/weather?&units=metric&';
submitButton.addEventListener('click', function (event) {
    var query = 'q=' + locationInput.value;
    getWeather(query);
});
currentLocationButton.addEventListener('click', function (event) {
    getLocation().then(function (position) {
        var query = 'lat=' + position['coords']['latitude'] + '&lon=' + position['coords']['longitude'];
        getWeather(query);
    });
});
function getLocation() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}
function getWeather(queryString) {
    // const queryString: string = 'q=' + location + '&appid=' + API_KEY + ';
    fetch(API_URL + queryString + API_KEY).then(function (res) { return res.json(); }).then(function (data) { return displayWeather(data); });
}
function displayWeather(dataObj) {
    var heading = '<h2>' + dataObj['name'] + ' (' + dataObj['sys']['country'] + ')</h2>';
    // const temperature = '<span><strong>Temperature:</strong> ' + dataObj['main']['temp'] + 'K</span>';
    var content = '';
    for (var prop in dataObj['main']) {
        content += '<span><strong>' + prop + ':</strong> ' + dataObj['main'][prop] + '</span>';
    }
    outputElement.innerHTML = heading + content;
}
