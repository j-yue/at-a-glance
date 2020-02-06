
// create elements to display information from UserData instance
// uses methods defined in stringify.js to translate UserData instance into
// html

import {elementStr, blockStr, findIcon} from './stringify.js';

//used to create weather and calendar widgets
const createWidget = (starter, selector, keys, data, tag) => {
  let content = '';
  let block = document.querySelector(`.${selector}`);
  // content +=blockStr(starter, selector, keys, data, tag);
  content += blockStr(starter, keys, data, tag);
  block.innerHTML = content;
  return content;
}

const addWeatherIcon = (selector, data) => {
  let icon = findIcon(data);
  let weather = new Skycons({'color': 'white'});
  weather.add(selector, Skycons[icon]);
  // weather.play();
  return weather;
}

const weatherWidget = data => {
  let canvas = elementStr('canvas', 'weather-icon-widget', '');
  createWidget(canvas, 'weather-widget', ['current', 'type'], data, 'div');
  addWeatherIcon(document.querySelector('.weather-icon-widget'), data.icon);
}

const calendarWidget = data => {
  createWidget('', 'calendar-widget', ['day', 'date', 'month'], data, 'div');
}

const financeWidget = data => {
  createWidget('', 'finance-widget', ['name', 'price', 'changes'], data, 'div');
}

//just need to tweak inner text
const newsWidget = headline => {
  document.querySelector('.headline').innerHTML = headline;
}

//END WIDGETS

const header = (headerName , name) => {
  let title = elementStr('h4', 'title', name);
  let btn = elementStr('button', 'close', 'X');
  let block = `<header class="${headerName}">${title + btn}</header>`;
  return block;
}


const weather = (data, city) => {
  let canvas = elementStr('canvas', 'weather-icon-popup', '');
  let temp = blockStr('', ['low', 'current', 'high'], data, 'div');
  temp = `<div class="temp">${temp}</div>`;
  let _city = elementStr('div', 'city', city);
  let details = blockStr('', ['type', 'description'], data, 'div');
  let content = canvas + temp + _city + details;
  document.querySelector('.weather').innerHTML = content;
  let node = document.querySelector('.weather-popup');
  node.innerHTML = header('header', 'Weather') + node.innerHTML;
  let weather = addWeatherIcon(document.querySelector('.weather-icon-popup'), data.icon);
  weather.play();
}


const calendarWeek = () => {
  // let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  let block = '';
  // for (let key in days) {
  //   block += elementStr('div', 'calendar-content__week', days[key]);
  // }
  // return block;
  block = blockStr('', Object.keys(days), days, 'div');
  return elementStr('div', 'week', block);
}


const getHoliday = (date, holidays) => {
  for (let holiday of holidays) {
    // console.log(holiday);
    if (holiday.day == date) return holiday.name;
  }
  return '';
}

const dateCell = (date, holiday) => {
  let _date = elementStr('div', 'date', date);
  let _holiday = elementStr('div', 'holiday', holiday);
  // return `<div class="cell${cellNum}">${_date + _holiday}</div>`;
  return elementStr('div', 'cell', _date + _holiday);
}

const calendarDay = (holidays, start, end) => {
  let content = '';
  let date = 1;
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
  // return content;
  return elementStr('div', 'day', content);
}



const calendar = data => {
  let month = elementStr('div', 'month', data.month);
  let week = calendarWeek();
  let day = calendarDay(data.holidays, data.monthStart, data.monthEnd);
  let content = month + week + day;
  document.querySelector('.calendar').innerHTML = content;
  let node = document.querySelector('.calendar-popup', 'Calendar');
  node.innerHTML = header('header', 'Calendar') + node.innerHTML;
}

const news = data => {
  let content = '';
  for (let type in data) {
    content += blockStr('', Object.keys(data[type]), data[type], 'li');
    // content += blockStr('', , data[type], 'li');
    document.querySelector(`.${type}-headlines`).innerHTML = content;
    content = '';
  }
  let node = document.querySelector('.news-popup');
  node.innerHTML = header('header', 'News') + node.innerHTML;
}

const finance = data => {
  let content = '';
  for (let type in data) {
    data[type].map(item => {
      // let header = elementStr('h5', 'secondary-header', item.name);
      let info = blockStr('', ['ticker','price', 'changes'], item, 'div');
      let _content = elementStr('article', type, info);
      content += _content;
    });
    document.querySelector(`.${type}-info`).innerHTML = content;
    content = '';
  }
  let node = document.querySelector('.finance-popup');
  node.innerHTML = header('header', 'Finance') + node.innerHTML;
}

const createMap = (lon, lat) => {
  let map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        // source: new ol.source.OSM()
        source: new ol.source.OSM({
          // url: 'https://maps-cdn.salesboard.biz/styles/klokantech-3d-gl-style/{z}/{x}/{y}.png'
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

  let  markerLayer = new ol.layer.Vector({
    source: vectorSource
  });

  map.addLayer(markerLayer);
}

// const location = ({cc, city, coordinates}) => {
//   let [lat, lon] = coordinates;
//   createMap(lon, lat);
//   document.querySelector('.cc').innerText = cc.toUpperCase();
//   document.querySelector('.city').innerText = city;
// }

const location = data => {
  let [lat, lon] = data.coordinates;
  createMap(lon, lat);
  document.querySelectorAll('.location-details > div').forEach(detail => {
    detail.innerText = data[detail.classList[0]];
  });
}

export const createPage = (user) => {
  //widgets
  weatherWidget(user.weather);
  calendarWidget(user.calendar);
  console.log(user.finance.crypto);
  // financeWidget(user.finance.crypto[0]);
  // newsWidget(user.news.national);
  // financeWidget(user.finance.indexes[0]);
  // newsWidget(user.news.world[0]);

  //popups
  weather(user.weather, user.location.city);
  calendar(user.calendar);
  news(user.news);
  finance(user.finance);

  //actions
  location(user.location);

  // let [lat, lon] = user.location.coordinates;
  // createMap(lon, lat);
  // createMap(0,0);
  // map.setCoordinates(0,0);
  // document.querySelector('#map > div').remove();

  // createMap(0,0);
  // createMap(lon, lat);

}

export function updateLocation(locationObj) {
  location(locationObj);
}

// export {createPage};
