import UserData from './UserData.js';
import {DEFAULT_DATA} from './defaultData.js';

// localStorage.clear();
// let lastSession = localStorage.getItem('lastSession');
// let user;
const KEYS_TO_BLOCKS = {
  weather: ['weather-summary', 'weather-details', 'temp'],
  // calendar: ['calendar-summary', 'calendar-details'],
  finance: ['finance-summary', 'finance-details', 'index', 'crypto'],
  news: ['news-summary', 'news-details']
}

//wait...why are you manually adding everything, why not just generate it... like in react... im so stupid

function getBlockChildren(blockName) {
  let selector = `[class^=${blockName}__]`;
  return document.querySelectorAll(selector);
}

function parseClass(classname) {
  return classname.split('__')[1];
}

function updateBlock(children, data) {
  for (let child of children) {
    let key = parseClass(child.classList[0]);
    if (!key.includes('--')) child.innerHTML = data[key];
    // child.innerHTML = data[key];
  }
}

function updatePage(user) {
  for (let key in KEYS_TO_BLOCKS) {
    KEYS_TO_BLOCKS[key].map(block => {
      // console.log(update);
      updateBlock(getBlockChildren(block), user.getProperty(key))
    })
  }
}

function createHeadlines() {

}
//oh shit what about modifiers?? wait you're okay no you're not

let user;
let lastSession = localStorage.getItem('lastSession');
document.addEventListener('DOMContentLoaded', async () => {
  // console.log(lastSession);
  // (!lastSession) ? user = new UserData(DEFAULT_DATA) : user = new UserData(JSON.parse(lastSession));
  // await user.refresh().then(() => user.storeData());
  // console.log(updatePage());
  user = new UserData(DEFAULT_DATA);
  updatePage(user);
  console.log(user);

});




// console.log(user);
// window.setInterval(async () => await user.refresh().then(() => user.storeData()).then(() => console.log(user)), 150);
