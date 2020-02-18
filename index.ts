const submitButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById('submit');
const locationInput: HTMLInputElement = <HTMLInputElement>document.getElementById('loc');
const outputElement: HTMLDivElement = <HTMLDivElement>document.getElementsByClassName('outputs')[0];
const currentLocationButton: HTMLButtonElement=  <HTMLButtonElement>document.getElementById('currentweather');

const API_KEY: string = '&appid=';
const API_URL: string = 'http://api.openweathermap.org/data/2.5/weather?&units=metric&';

submitButton.addEventListener('click', function(event: Event){
    const query = 'q=' + locationInput.value;
    getWeather(query);
})
currentLocationButton.addEventListener('click', function(event: Event){
    getLocation().then(position => {
        const query = 'lat=' + position['coords']['latitude'] + '&lon=' + position['coords']['longitude'];
        getWeather(query);
    });
})

function getLocation() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}
function getWeather(queryString: string){
    // const queryString: string = 'q=' + location + '&appid=' + API_KEY + ';
    fetch(API_URL + queryString + API_KEY).then(res => res.json()).then(data => displayWeather(data))
}
function displayWeather(dataObj: JSON){
    const heading = '<h2>' + dataObj['name'] + ' (' + dataObj['sys']['country'] + ')</h2>';
    // const temperature = '<span><strong>Temperature:</strong> ' + dataObj['main']['temp'] + 'K</span>';
    let content = '';
    for(let prop in dataObj['main']){
        content += '<span><strong>' + prop + ':</strong> ' + dataObj['main'][prop] + '</span>';
    }
    outputElement.innerHTML = heading + content;
}