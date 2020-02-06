import UserData from './UserData.js';
import {DEFAULT_DATA} from './defaultData.js';

let lastSession = localStorage.getItem('lastSession');
let user;

user = new UserData(DEFAULT_DATA);

//omg the async stuff aint working yet again T_T
//USE ASYNC / AWAIT
// (!lastSession) ?
//   user = new UserData(DEFAULT_DATA) :
//   user = new UserData(JSON.parse(lastSession));
//
//   user.refresh();
//   user.storeData();
//



function massAddListener(strSelector, event, fnc) {
  let elements = document.querySelectorAll(`${strSelector}`);
  for (let el in elements) el.addEventListener(event, );
}

let [weather, date, finance, news] = [
  user.getProperty('weather'),
  user.getProperty('date'),
  user.getProperty('finance'),
  user.getProperty('news')
];



let [weatherType, weatherDescription, temp, lowTemp, highTemp, condition] = [weather.type, weather.description, weather.temp + ' &#176', weather.low + ' &#176', weather.high + ' &#176', weather.icon];

console.log(condition);
let weatherIcon = new Skycons({"color": "white"});
let weatherCondition = findIcon(condition);
console.log(weatherCondition);


let [_date, day, month, history] = [date.date, date.day.slice(0,3), date.month.slice(0,3), date.history];

let [crypto, indexes] = [finance.crypto, finance.indexes];

let [national, world, business] = [news.national, news.world, news.business];

let [weatherWidget, dateWidget, financeWidget, newsWidget] = [
  document.querySelector('.widgets .weather'),
  document.querySelector('.widgets .date'),
  document.querySelector('.widgets .finance'),
  document.querySelector('.widgets .news')
];


let [weatherPopup, datePopup, financePopup, newsPopup] = [
  document.querySelector('.popup .weather'),
  document.querySelector('.popup .date'),
  document.querySelector('.popup .finance'),
  document.querySelector('.popup .news')
]

let weatherWidgetNode = document.querySelectorAll('.widgets .weather div ');
let weatherSummary = [temp, weatherType];
let smallCanvas = document.querySelector("#weather-icon-small");
weatherIcon.add(smallCanvas, Skycons[weatherCondition]);
weatherIcon.play();
for (let i = 0; i < 2; i++) weatherWidgetNode[i].innerHTML = weatherSummary[i];

let dateWidgetNode = document.querySelectorAll('.widgets .date div');
let dateSummary = [_date, day, month, history];

for (let i = 0; i < 3; i++) {
  dateWidgetNode[i].innerHTML = dateSummary[i];
}


let financeWidgetNode = document.querySelectorAll('.widgets .finance div');
let dowJones = indexes[0];
let [indexName, indexPrice, indexChange] = [dowJones.indexName, dowJones.price.toFixed(2), dowJones.changes.toFixed(2)];
let financeSummary = [indexName, indexPrice, indexChange];

for (let i = 0; i < 3; i++) {
  financeWidgetNode[i].innerHTML = financeSummary[i];
}

let newsWidgetNode = document.querySelector('.widgets .news div');
newsWidgetNode.innerHTML = world[0];


// let [date]
// window.onload = function() {console.log('help')};
// console.log(window);

//
// document.addEventListener('DOMContentLoaded', () => {
//   let lastSession = localStorage.getItem('lastSession');
//   user = new UserData(DEFAULT_DATA);
//   lastSession = JSON.parse(lastSession);
//   user.storeData();
//   let newUser = new UserData(lastSession);
//   await newUser.refresh();
// });

// let user = new UserData(DEFAULT_DATA);
// let user = new UserData(JSON.parse(localStorage.getItem('lastSession')));
// user.refresh();
// user.storeData();
// console.log(user);

// let [weatherWidget, dateWidget, financeWidget, newsWidget] = [
//   document.querySelector('.widgets .weather'),
//   document.querySelector('.widgets .date'),
//   document.querySelector('.widgets .finance'),
//   document.querySelector('.widgets .news')
// ];
//
//
// let [weatherPopup, datePopup, financePopup, newsPopup] = [
//   document.querySelector('.popup .weather'),
//   document.querySelector('.popup .date'),
//   document.querySelector('.popup .finance'),
//   document.querySelector('.popup .news')
// ]
//
// let [weather, date, finance, news] = [
//   user.getProperty('weather'),
//   user.getProperty('date'),
//   user.getProperty('finance'),
//   user.getProperty('news')
// ];
//
// let [type, description, icon, temp, high, low] = Object.values(weather);
//
// let weatherSummary = `<canvas id="weather-icon"></canvas><div>${Math.round(temp)}</div><div>${type}</div>`;
// let iconW = 'CLEAR_DAY';
// // let weatherDetails;
// weatherWidget.innerHTML = weatherSummary;
// let weatherCanvas = document.querySelector('#weather-icon');
// let weatherIcon = new Skycons({'color': 'white'});
// weatherIcon.add(weatherCanvas, Skycons[iconW]);
// weatherIcon.play();
//
//
// let [_date, day, month, history] = Object.values(date);
// let dateSummary = `<div>${day.slice(0,3).toUpperCase()}</div><div>${_date}</div><div>${month.slice(0,3).toUpperCase()}</div>`;
// dateWidget.innerHTML = dateSummary;
//
//
// let [crypto, indexes] = Object.values(finance);
// let ticker = indexes[0];
// console.log(indexes[0]);
// let indexSummary = `<div id="index-name">${ticker.indexName}</div><div id="index-price">${ticker.price.toFixed(2)}</div><div id="index-change">${ticker.changes.toFixed(2)}</div>`;
// financeWidget.innerHTML = indexSummary;
//
// let [world, business, national] = Object.values(news);
// let headline = `<blockquote><p>${world[0]}<p></blockquote>`;
// newsWidget.innerHTML = headline;
//
//
// weatherWidget.addEventListener('click', () => weatherPopup.classList.add('active'));
//
//
//
// let largeCanvas = `<div><canvas id="weather-icon-large" height="100" width="100"></canvas></div>`;
// let largeCanvas = `<div>icon</div>`
// let weatherTemperature = `<div id="low-temp-label">LOW</div><div id="low-temp">${low}</div><div id="current-temp">${temp}</div><div id="high-temp-label">HIGH</div><div id="high-temp">${high}</div>`;
// let weatherDescription = `<div id="weather-type">${type}</div><div id="weather-description">${description}</div>`;
// let weatherDetails = `<main>${weatherTemperature}${weatherDescription}</main>`;
// weatherPopup.innerHTML = largeCanvas + weatherDetails;
//
//
// let canvasNode = document.querySelector("#weather-icon-large");
// weatherIcon.add(canvasNode, Skycons[iconW]);
// console.log(canvasNode);











// let weatherDetails = `<main>
// <canvas id="weather-icon-large" height="50" width="50" ></canvas><div>LOW</div><div>${lowTemp}</div><div>${temp}</div></main>`;

// weatherPopup.innerHTML = weatherDetails;

// let largeCanvas = document.querySelector("#weather-icon-large");

// weatherPopup.innerHTML = `<cavnas id="weather-icon-large width="100" height="100">hey</canvas>`;
 // = canvas;
// weatherIcon.add(largeCanvas, Skycons[iconW]);
// largeCanvas.innerHTML("OOPS YOU DOO DOO");
// console.log(largeCanvas);
// let largeIcon = new Skycons({"color": "black"});
// let largeWeatherCavnas = document.querySelector("#weather-icon-large");
// weatherIcon.add(largeWeatherCavnas, Skycons[iconW]);


//popups

// let weatherHeader = `<header><h1>Weather</h1><button>X</button></header>`;
// let weatherFooter = `<div>footer</div>`;
// let weatherMain = `<main>
// <canvas id="weather-icon-large">hey man</canvas>
// <div>LOW</div><div>${low}</div>
// <div>${temp}</div>
// <div>HIGH</div><div>${high}</div>
// <div>${type}</div>
// <div>${description}</div>
// </main>`;
// let weatherDetails = weatherHeader + weatherMain + weatherFooter;
// let weatherIconLarge = document.querySelector("#weather-icon-large");
// let largeIcon = new Skycons({"color": "white"});
// largeIcon.add(weatherIconLarge, Skycons[iconW]);
// weatherPopup.innerHTML = weatherDetails;
