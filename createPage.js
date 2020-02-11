/***
 * Create elements to display info from UserData instance
 * TABLE OF CONTENTS
 * 1. widgets
 * 2. popups
 *    a. header
 *    b. weather
 *    c. calendar
 *    d.news
 *    e. finance
 * 3. actions
 * 4. page
 */

import { elementStr, blockStr, findIcon } from './stringify.js';
import UserData from './UserData.js';


/***************************************************
 * WIDGETS
 * ********************************************** */
/***
 * Helper function that creates layout of widget section in main screen
 * @param {string} starter content unique to specific widget 
 * @param {string} selector classname of element containing the widget
 * @param {arr} keys keys of UserData instance containing desired info
 * @param {obj} data portion of UserData instance containing desired key-value pairs
 * @param {string} tag 
 * @return {string} stringified innerHTML of the widget
 */
const createWidget = (starter, selector, keys, data, tag) => {
  let content = '';
  let block = document.querySelector(`.${selector}`);
  content += blockStr(starter, keys, data, tag);
  block.innerHTML = content;
  return content;
}

/***
 * Given an icon type, match it to a Skycons icon and place it on a specified part of the page
 * @param {string} selector part of the page where to add icon
 * @param {string} data icon type specified by open weather map api
 * @return {Skycons} animated icon resulting from data
 */
const addWeatherIcon = (selector, data) => {
  let icon = findIcon(data);
  let weather = new Skycons({ 'color': 'white' });
  weather.add(selector, Skycons[icon]);
  return weather;
}

/***
 * Create weather widget
 * @param {obj} data portion of UserData instance containing weather data
 */
const weatherWidget = data => {
  let canvas = elementStr('canvas', 'weather-icon-widget', '');
  createWidget(canvas, 'weather-widget', ['current', 'type'], data, 'div');
  addWeatherIcon(document.querySelector('.weather-icon-widget'), data.icon);
}

/***
 * Create calendar widget
 * @param {obj} data portion of UserData instance containing calendar data
 */
const calendarWidget = data => {
  createWidget('', 'calendar-widget', ['day', 'date', 'month'], data, 'div');
}

/***
 * Create finance widget
 * @param {obj} data portion of UserData instance containing finance data
 */
const financeWidget = data => {
  createWidget('', 'finance-widget', ['name', 'price', 'changes'], data, 'div');
}

/***
 * Create news widget
 * @param {obj} data portion of UserData instance containing news data
 */
const newsWidget = headline => {
  document.querySelector('.headline').innerHTML = headline;
}

/***************************************************
 * POPUPS
 * ********************************************** */
// HEADER
/***
 * Header to be used in popup and action screens 
 * Contains name of section and a close button
 * @param {string} headerName classname of resulting header
 * @param {string} name name of the section
 * @return {string} stringified html of the header
 */
const header = (headerName, name) => {
  let title = elementStr('h4', 'title', name);
  let btn = elementStr('button', 'close', 'X');
  let block = `<header class="${headerName}">${title + btn}</header>`;
  return block;
}

/***************************************************
 * WIDGETS
 * ********************************************** */
// WEATHER
/***
 * Create the weather popup
 * @param {obj} data portion of UserData instance containing weather data
 * @param {string} city 
 */
const weather = (data, city) => {
  let canvas = elementStr('canvas', 'weather-icon-popup', '');
  let temp = blockStr('', ['low', 'current', 'high'], data, 'div');
  temp = `<div class="temp">${temp}</div>`;
  let _city = elementStr('div', 'city', city);
  let details = blockStr('', ['type', 'description'], data, 'div');
  let content = canvas + temp + elementStr('div', 'weather-details', _city + details);
  document.querySelector('.weather').innerHTML = content;
  let node = document.querySelector('.weather-popup');
  node.innerHTML = header('header', 'Weather') + node.innerHTML;
  let weather = addWeatherIcon(document.querySelector('.weather-icon-popup'), data.icon);
  weather.play();
}

// CALENDAR
/***
 * Helper for calendar()
 * Create div with classname cell for each day of the week
 * @return {string} stringified HTML of cells for each day of the week
 */
const calendarWeek = () => {
  let days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  let block = '';
  for (let day in days) {
    block += elementStr('div', 'cell', days[day]);
  }
  return block;
}

/***
 * Helper for calendarDay()
 * Checks if the given date is a holiday
 * @param {num} date 
 * @param {arr} holidays array of objects matching holiday names to their dates of the current month
 * @return {string} returns name of holiday if date matches holiday and empty string otherwise
 */
const getHoliday = (date, holidays) => {
  for (let holiday of holidays) {
    if (holiday.day == date) return holiday.name;
  }
  return '';
}

/***
 * Helper for calendarDay()
 * Creates cells for calendar
 * Resulting cells are either empty (padding if month doesn't start on sunday) or has a date and/or holiday
 * @param {num} date 
 * @param {arr} holidays array of objects matching holiday names to their dates of the current month
 * @return {string} the cell
 */
const dateCell = (date, holiday) => {
  let _date = elementStr('div', 'date', date);
  let _holiday = elementStr('div', 'holiday', holiday);
  return elementStr('div', 'cell', _date + _holiday);
}

/***
 * Helper for calendar()
 * creates the nunber of cells to populate the calendar 
 * accounts for cells to pad calendar if month does not start on a sunday
 * @param {obj} holidays array of objects matching holiday names and their dates
 * @param {num} start 0-6 range indicating which day of the week the month starts on
 * @param {num} end last day of the month
 * @return {string} each cell of the monthly calendar
 */
const calendarDay = (holidays, start, end) => {
  let content = '';
  let date = 1;
  //loop starts on sunday
  //produce empty cells until start of month hit, then add the date (and holidya if matched)
  for (let i = 0; date <= end; i++) {
    let day = '';
    let holiday = '';
    if (i >= start) {
      day = date;
      holiday = getHoliday(day, holidays);
      date++;
    }
    content += dateCell(day, holiday);
  }
  return content;
}

/***
 * Create calendar popup
 * @param {obj} data portion of UserData instance containing calendar data
 */
const calendar = data => {
  let week = calendarWeek();
  let day = calendarDay(data.holidays, data.monthStart, data.monthEnd);
  let content = week + day;
  document.querySelector('.calendar').innerHTML = content;
  let node = document.querySelector('.calendar-popup', 'Calendar');
  node.innerHTML = header('header', data.month) + node.innerHTML;
}

/***
 * Create news popup
 * @param {obj} data portion of UserData instance containing news data
 */
const news = data => {
  let content = '';
  for (let type in data) {
    content += blockStr('', Object.keys(data[type]), data[type], 'li');
    document.querySelector(`.${type}-headlines`).innerHTML = content;
    content = '';
  }
  let node = document.querySelector('.news-popup');
  node.innerHTML = header('header', 'News') + node.innerHTML;
}

/***
 * Create finance popup
 * @param {obj} data portion of UserData instance containing finance data
 */
const finance = data => {
  let content = '';
  for (let type in data) {
    data[type].map(item => {
      let info = blockStr('', ['ticker', 'price', 'changes'], item, 'div');
      let _content = elementStr('article', type, info);
      content += _content;
    });
    document.querySelector(`.${type}-info`).innerHTML = content;
    content = '';
  }
  let node = document.querySelector('.finance-popup');
  node.innerHTML = header('header', 'Finance') + node.innerHTML;
}

/***************************************************
 * ACTIONS
 * ********************************************** */
/***
 * Helper for location()
 * Create map in location screen with user's recorded general location marked
 * @param {num} lon longitude
 * @param {num} lat latitude
 */
const createMap = (lon, lat) => {
  let map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM({
          url: 'http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
        })
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([lon, lat]),
      zoom: 10
    }),
    controls: [],
    interactions: []
  });

  let marker = new ol.Feature({
    geometry: new ol.geom.Point(
      ol.proj.fromLonLat([lon, lat])
    )
  });

  let vectorSource = new ol.source.Vector({
    features: [marker]
  });

  let markerLayer = new ol.layer.Vector({
    source: vectorSource
  });
  map.addLayer(markerLayer);
}

/***
 * Create location action screen
 * @param {obj} data portion of UserData instance containing location data
 */
const location = data => {
  let [lat, lon] = data.coordinates;
  createMap(lon, lat);
  document.querySelectorAll('.location-details > div').forEach(detail => {
    detail.innerText = data[detail.classList[0]];
  });
}

/***************************************************
 * PAGE
 * ********************************************** */
/***
 * Create web app based on UserData instance
 * @param {UserData} user UserData instance
 */
export const createPage = (user) => {
  //widgets
  weatherWidget(user.weather);
  calendarWidget(user.calendar);
  financeWidget(user.finance.crypto[0]);
  newsWidget(user.news.national);
  financeWidget(user.finance.indexes[0]);
  newsWidget(user.news.world[0]);

  //popups
  weather(user.weather, user.location.city);
  calendar(user.calendar);
  news(user.news);
  finance(user.finance);

  //actions
  location(user.location);
}

/***
 * Called when user refreshes the page
 * Update the page with new info 
 * @param {string} prevState innerHTML of body before createPage was called to remove old information
 * @param {UserData} user UserData instance with updated information
 */
export const updatePage = (prevState, user) => {
  document.body.innerHTML = prevState;
  createPage(user);
}

/***
 * Called when use current location button clicked 
 * Update contents of location screen
 * @param {obj} data portion of UserData instance containing calendar data
 */
export function updateLocation(locationObj) {
  location(locationObj);
}
