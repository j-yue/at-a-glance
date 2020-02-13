import { WEATHER_KEY, WORLD_URL, INDEX_URL, CRYPTO_URL, GEOCODE_KEY, CALENDAR_KEY } from './urls.js';

//for debugging
const ALL_PROPERTIES = ['location', 'news', 'finance', 'weather', 'calendar'];

//NEWS api only supports these countries
const SUPPORTED_CC = ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'];

//variables used to turn
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// country codes for Fahrenheit only countries
const FAHRENHEIT_COUNTRIES = ['us', 'bs', 'mh', 'ky', 'pw', 'fm', 'lr'];


export default class UserData {

  /**
   * Data representation of the web app
   * @constructor
   * @param {obj} location user's location (coordinates, city, and country code)
   * @param {obj} news national, global, and business news specific to user's location
   * @param {obj} finance data on us indexes and cryptocurrencies
   * @param {obj} weather user's local weather
   * @param {obj} calendar calendar with country specific holidays
   */
  constructor({ location, news, finance, weather, calendar }) {
    this.location = location;
    this.news = news;
    this.finance = finance;
    this.weather = weather;
    this.calendar = calendar;
  }

  getProperty(property) {
    if (ALL_PROPERTIES.includes(property)) return this[property];
    else console.log('property does not exist');
  }

  setProperty(property, data) {
    if (ALL_PROPERTIES.includes(property)) this[property] = data;
    else console.log('property does not exist');
  }

  /**
   * Returns a GET request to be parsed to JSON
   * @param  {string} url
   * @return {promise} promise to return text in JSON once resolved
   */
  // callApi(url) {
  //   return fetch(url).then(res => res.json());
  // }

  async callApi(url) {
    let result = await fetch(url);
    return result.json();
  }

  /**
   * Save the user's location details from the user's coordinates
   * @param  {number} lat latitude
   * @param  {number} lon longitude
   */
  async reverseGeocode(lat, lon) {
    const geocodeURL = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${GEOCODE_KEY}`;
    // let location = await fetch(geocodeURL).then(response => response.json()).then(data => data.results[0].components);
    try {
      let location = await this.callApi(geocodeURL).then(res => res.results[0].components);
      let [city, cc] = [location.city, location.country_code];
      this.setProperty('location', { coordinates: [lat, lon], cc, city });
      return [city, cc];
    } catch (err) {
      console.log(err);
    }
  }

  /**
   *  Get's the user's coordinates and saves location details
   */
  saveCoords() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log('saving location');
        let [lat, lon] = [position.coords.latitude, position.coords.longitude];
        this.reverseGeocode(lat, lon);
      }, () => console.log("unable to get location, defaulting to los angeles")); //should add default location
    }
  }

  /**
   * Saves the user's date and national holidays
   * The month's start and end are used to generate calendar for the month
   */
  async saveDate() {
    let now = new Date();
    let [year, date, day, month] = [now.getFullYear(), now.getDate(), now.getDay(), now.getMonth()];
    let monthStart = new Date(year, month, 1).getDay();
    let monthEnd = new Date(year, month + 1, 0).getDate();
    let cc = this.getProperty('location').cc;
    const calendarURL = `https://calendarific.com/api/v2/holidays?&api_key=${CALENDAR_KEY}&country=${cc}&year=${year}&month=${month + 1}&type=national`;
    try {
      let result = await this.callApi(calendarURL).then(res => Object.values(res.response.holidays));
      let holidays = [];
      result.map(holiday => {
        let obj = { name: holiday.name, day: holiday.date.datetime.day };
        holidays.push(obj);
      });
      let calendar = {
        date,
        day: DAYS[day],
        month: MONTHS[month],
        holidays,
        monthStart,
        monthEnd
      }
      this.setProperty('calendar', calendar);
    } catch (err) {
      console.log('unable to get holidays, will produce plain calendar');
    }
  }

  /**
   * helper for saveNews()
   * parses response into an array of headlines
   * @param  {boolean} isFromNYT are headlines obtained from new york times
   * @param  {obj} data GET response from api
   * @param  {number} length number of headlines to save
   * @return {array} array containing the specified number of headlines
   */
  saveHeadlines(isFromNYT, data, length) {
    let key = (isFromNYT) ? 'results' : 'articles';
    let headlines = data[key].slice(0, length);
    let arrHeadlines = [];
    headlines.map(story => arrHeadlines.push(story.title));
    return arrHeadlines;
  }


  /**
  * save 10 headlines about:
  * global news (from the NYT)
  * national news (country-specific)
  * business news (country-specific)
  */
  async saveNews() {
    // let news = {};
    let cc = this.getProperty('location').cc;

    if (!SUPPORTED_CC.includes(cc)) cc = 'us';
    // console.log(cc);
    const urls = {
      national: `https://newsapi.org/v2/top-headlines?country=${cc}&apiKey=096c894b904a48a59480e20957af73fa`,
      business: `https://newsapi.org/v2/top-headlines?category=business&country=${cc}&apiKey=096c894b904a48a59480e20957af73fa`,
      world: WORLD_URL
    };
    let promises = Object.keys(urls).map(async key => {
      let temp = {};
      let data = await this.callApi(urls[key]);
      let headlines = this.saveHeadlines(urls[key].includes('nytimes'), data, 10);
      temp[`${key}`] = headlines;
      return temp;
    });

    let result = await Promise.all(promises);
    let merge = Object.assign(result[0], result[1], result[2]);
    this.setProperty('news', merge);
  }

  /**
  * helper for saveFinance()
  * @param {boolean} isIndex
  * @param {obj} data
  * @return arr of obj containing the security's name, price, and price changes and prepends '$' to price
  */
  saveTicker(isIndex, data) {
    let result = [];
    let key = (isIndex) ? 'majorIndexesList' : 'cryptocurrenciesList';
    let name = (isIndex) ? 'indexName' : 'name';
    let parsedData = data[key].slice(0, 10);
    parsedData.map(index => {
      result.push({
        name: index[`${name}`],
        price: '$' + index.price.toFixed(2),
        changes: index.changes.toFixed(2),
        ticker: index.ticker
      });
    });
    return result;
  }

  /**
  * save current info on us indexes and the top 10 cryptocurrencies
  */
  async saveFinance() {
    const urls = {
      "indexes": INDEX_URL,
      "crypto": CRYPTO_URL
    };
    let finance = {
      "indexes": '',
      "crypto": ''
    };
    let promises = Object.keys(urls).map(async key => {
      let response = await this.callApi(urls[`${key}`]);
      let details = this.saveTicker(key.includes('index'), response);
      return details;
    });

    let result = await Promise.all(promises);
    finance.indexes = result[0];
    finance.crypto = result[1];
    this.setProperty('finance', finance);
  }

  /**
  * helper for save weather
  * @param {obj} data GET response from Open Weather Map
  * @param {string} unit does country use Fahrenheit or Celsius
  * @return returns parsed GET response as an obj and rounds up temperatures
    and adds degree symbol with unit
  */
  parseWeather(data, unit) {
    return {
      type: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      current: Math.round(data.main.temp) + `&#176${unit}`,
      high: Math.round(data.main.temp_max) + `&#176${unit}`,
      low: Math.round(data.main.temp_min) + `&#176${unit}`
    };
  }

  /**
  * save the user's current weather conditions
  */
  async saveWeather() {
    let location = this.getProperty('location');
    let [lat, lon, cc] = [location.coordinates[0], location.coordinates[1], location.cc];
    let units = (FAHRENHEIT_COUNTRIES.includes(cc)) ? 'imperial' : 'metric';
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${WEATHER_KEY}`;
    let data = await this.callApi(weatherURL);
    let unit = (FAHRENHEIT_COUNTRIES.includes(cc)) ? 'F' : 'C';
    this.setProperty('weather', this.parseWeather(data, unit));
  }

  /***
   * fetch new information on weather, news, date, and finance
   */
  async update() {
    await Promise.all([this.saveWeather(), this.saveNews(), this.saveDate(), this.saveFinance()]);
    console.log(this);
  }


  /**
  * save only the user's location property to local local storage
  * coordinates are the only input needed form user
  */
  storeLocation() {
    let location = this.getProperty('location');
    for (let key in location) {
      localStorage.setItem(key, JSON.stringify(location[key]));
    }
  }

}
