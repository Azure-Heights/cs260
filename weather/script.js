/* utility function declarations */

var titleCase;
var createImage;
var createText;
var createElement;
var letElementById;


/* main on-click handler */

document.getElementById('weatherSubmit').addEventListener('click', function(event) {
    event.preventDefault();

    const value = document.getElementById('weatherInput').value;
    if (value === '')
        return;
    console.log(value);

    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + value + ',US&units=imperial' + '&APPID=68843fdf104b6c2d5af392f2ed112e31';
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(forecast) {
            console.log(forecast);

            letElementById('weatherResults', [
                createElement('div', 'banner', [
                    createText('Weather in ' + forecast.name)
                ]),

                createElement('div', 'weather-results', [
                    createElement('div', 'date', [
                        createText('Right Now')
                    ]),

                    createElement('div', 'weather-icons', forecast.weather.map(
                        weather => createImage('http://openweathermap.org/img/w/' + weather.icon + '.png')
                    )),

                    createElement('div', 'temperature-reading', [
                        createText(forecast.main.temp + ' °F')
                    ]),

                    createElement('div', 'weather-description', [
                        createText(forecast.weather.map(
                            weather => titleCase(weather.description)
                        ).join(', '))
                    ]),

                    createElement('div', 'wind', [
                        createText('Wind Speed: ' + forecast.wind.speed + ' mph')
                    ]),

                    createElement('div', 'feels-like', [
                        createText('Feels Like: ' + forecast.main.feels_like + ' °F')
                    ]),

                    createElement('div', 'humidity', [
                        createText('Humidity: ' + forecast.main.humidity + '%')
                    ])
                ])
            ]);

        });

    const url2 = 'http://api.openweathermap.org/data/2.5/forecast?q=' + value + ', US&units=imperial' + '&APPID=68843fdf104b6c2d5af392f2ed112e31';
    fetch(url2)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json);

            // sort forecasts into days
            let dayList = [[]];
            let currentDate = json.list[0].dt_txt.match(/(.*) /)[1];
            for (let day of json.list) {
                const date = day.dt_txt.match(/(.*) /)[1];

                if (date !== currentDate) {
                    dayList.push([]);
                    currentDate = date;
                }

                dayList[dayList.length - 1].push(day);
            }

            letElementById('forecastResults', [
                createElement('div', 'banner', [
                    createText('5-Day Forecast')
                ]),

                dayList.map(day => createElement('div', ['day'], [
                    createElement('div', 'date', [
                        createText(moment(day[0].dt_txt).format('MMMM Do YYYY'))
                    ]),

                    day.map(forecast => createElement('div', 'forecast', [
                        createElement('div', 'time', [
                            createText(moment(forecast.dt_txt).format('h:mm:ss a'))
                        ]),

                        createImage('http://openweathermap.org/img/w/' + forecast.weather[0].icon + '.png'),

                        createElement('div', 'temp-low', [
                            createText('Low: ' + forecast.main.temp_min)
                        ]),

                        createElement('div', 'temp-high', [
                            createText('High: ' + forecast.main.temp_max)
                        ]),

                        createElement('div', 'humidity', [
                            createText('Humidity: ' + forecast.main.humidity + '%')
                        ])
                    ]))
                ])
            )]);
        });
});


/* utility function definitions */

function titleCase(toMatch) {
    var result = toMatch.replace(/(\w)(\w*)/g, function (_, i, r) {
        return i.toUpperCase() + (r != null ? r : '');
    })

    return result;
}

function addRecChildList(element, childList) {
    for (let child of childList)
        if (Array.isArray(child))
            addRecChildList(element, child);
        else
            element.appendChild(child);
}

function createImage(src) {
    let img = document.createElement('img');
    img.src = src;

    return img;
}

function createText(text) {
    return document.createTextNode(text);
}

function createElement(type, classList, childList) {
    let element = document.createElement(type);

    if (Array.isArray(classList))
        for (let cls of classList)
            element.classList.add(cls);
    else
        element.classList.add(classList);

    addRecChildList(element, childList);

    return element;
}

function letElementById(id, childList) {
    const element = document.getElementById(id);
    element.innerHTML = '';
    addRecChildList(element, childList);

    return element;
}

