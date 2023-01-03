
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

/* <div class="weather-card">
            <h3>date</h3>
            <p> Image icon</p>
            <p>Temp</p>
            <p>Wind</p>
            <p>Humidity</p>
          </div> */

/*variables */

var apiKey = "ef6086fa9902b6da26c7584ee86ddde5";
var city = "london";
var baseURL = "https://api.openweathermap.org/data/2.5/";
var weatherURL = baseURL + `weather?appid=${apiKey}&units=metric`;
var cityInput = document.querySelector("#city-input");
var cityOutput = document.querySelector("#city-output");
var cardWrapper = document.querySelector('main');


function noMatch() {
    cardWrapper.innerHTML = '<p class="no-search">No results found.</p>';
}

function displayMatches(matches) {
    cardWrapper.innerHTML = '';

    if (!matches.length) {
        noMatch();
    }

    for (var matchObj of matches) {
      cardWrapper.insertAdjacentHTML('beforeend', `
        <div class="weather-card">
            <h3>${matchObj.title}</h3>
            <p>${matchObj.image}</p>
            <p>${matchObj.temp}</p>
            <p>${matchObj.wind}</p>
            <p>${matchObj.humidity}</p>
        </div>
        `);  
    }
}

function getCity(event) {
    var keyCode = event.keyCode;
    var cityText = cityInput.value.toLowerCase().trim();
    
    if (keyCode === 13 && cityText) {
        
        var responsePromise = fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityText}&limit=1&appid=ef6086fa9902b6da26c7584ee86ddde5`)

        function handleResponse(responseObj) {
            return responseObj.json();
        }
        
        
        responsePromise
        .then(handleResponse)
        .then(function (data) {
            displayMatches(data.name);
        });
       
    
        
        // cityInput.value = '';
        
        // displayMatches(matches);
        
    }
}


function init() {
    cityInput.addEventListener('keydown', getCity);
}

init();





// $.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
// .then(function(data) {
// console.log (`
// Temp: ${data.main.temp} °C
// Wind: ${data.wind.speed} M/S
// Humidity: ${data.main.humidity}%
// `)
// });
