
function pairNodeData(screen, selector, info, keys) {
  let elements = document.querySelectorAll(`${selector}`);
  let data = [];
  for (let key of keys) data.push(data[key]);
  return [elements, data];
}

function updateScreen(elements, data) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].innerHTML = data[i];
  }
}

function updatePage() {
  let allScreens = {};
  for (let screen of allScreens) {
    let [dataKeys, selector, property] = [screen[dataKeys], screen[selector], screen[property]];
    let data = user.getProperty(property);
    let elements = pairNodeData(screen, selector, data, dataKeys);
    updateScreen(elements[0], elements[1]) //(...elements)
  }

}



function findIcon(condition) {
  let icon = 'weather condition';
  switch (condition) {
    case '01d':
      icon = 'CLEAR_DAY';
      break;
    case '01d':
      icon = 'CLEAR_NIGHT';
      break;
    case '02d':
    case '03d':
      icon = 'PARTLY_CLOUDY_DAY';
      break;
    case '02n' || '03n':
      icon = 'PARTLY_CLOUDY_NIGHT';
      break;
    case '04d':
    case '04n':
      icon = 'CLOUDY';
      break;
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      icon = 'RAIN';
      break;
    case '11d':
    case '11n':
      icon = 'SLEET';
      break;
    case '13d':
    case '13n':
      icon = 'SNOW';
      break;
    case '50d':
    case '50n':
      icon = 'FOG';
      break;
  }
  return icon;
}

// const dynamicElements = {
//   'weather-summary': ['weather-summary__icon', 'weather-summary__temp', 'weather-summary__type'],
//   'calendar-summary': ['calendar-summary__day', 'calendar-summary__date', 'calendar-summary__month'],
//   'finance-summary': ['finance-summary__name', 'finance-summary__price', 'finance-summary__change'],
//   'news-summary': ['news-summary__headline'],
//   'weather-details':
//   ['weather-details__icon', 'temp__low--label', 'temp__low--value', 'temp__current', 'temp__high--label', 'temp__high--value', 'weather-details__type', 'weather-deatails__description'],
//   'calendar-details': [],
//   'finance-details': [],
//   'news-details': [],
//   'location': ['location-details__city', 'location-details__country']
// };
//not sure about calendar-details and finance-details
// export {dynamicElements};

const dynamicElements = {
  'weather-summary': ['weather-summary__icon', 'weather-summary__temp', 'weather-summary__type'],
  'calendar-summary': ['calendar-summary__day', 'calendar-summary__date', 'calendar-summary__month'],
  'finance-summary': ['finance-summary__name', 'finance-summary__price', 'finance-summary__change'],
  'news-summary': ['news-summary__headline'],
  'weather-details':
  ['weather-details__icon', 'temp__low--label', 'temp__low--value', 'temp__current', 'temp__high--label', 'temp__high--value', 'weather-details__type', 'weather-deatails__description'],
  'calendar-details': [],
  'finance-details': [],
  'news-details': [],
  'location': ['location-details__city', 'location-details__country']
};icons need to changed manually...

const dynamicElements = {
  weather: {
    elements: ['weather-summary__temp', 'weather-summary__type','temp__low--value', 'temp__current', 'temp__high--value', 'weather-details__type', 'weather-deatails__description'],
    keys: ['temp', 'type', 'low', 'temp', 'high', 'type', 'description']
  },

  calendar: {

  },

  news: {

  },

  location: {
    elements: ['location-details__city', 'location-details__country'],
    keys: ['city', 'cc']
  }



//actually, get rid of this, totally not nevessary
