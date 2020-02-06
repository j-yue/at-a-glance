import UserData from './UserData.js';
import {DEFAULT_DATA} from './defaultData.js';
// import {elementStr, blockStr, findIcon} from './stringify.js';
import {createPage, updateLocation} from './createPage.js';
import {viewPopup, closePopup, viewNewsTab, viewFinanceTab} from './eventHandlers.js';
// import * from './eventHandlers';
let user;
let lastSession = localStorage.getItem('lastSession');



document.addEventListener('DOMContentLoaded', () => {
  console.log(lastSession);

  if (!lastSession) {
    user = new UserData(DEFAULT_DATA);
    // user.saveCoords();
    console.log('hi');
  } else {
    user = new UserData(JSON.parse(lastSession));
  }

  // await user.saveCoords().then(() => console.log(user.location));

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async position => {
      let [lat, lon] = [position.coords.latitude, position.coords.longitude];
      // let res = await user.reverseGeocode(lat, lon);
      // console.log(res);
      // let refresh = new Promise((resolve, reject) => {
      //   user.refresh();
      //   resolve('everything has been refreshed');
      // });
      // refresh.then(() => console.log(user));
      // await user.reverseGeocode(lat, lon).then(() => user.refresh());
      // setInterval(() => {
      //   createPage(user);
      // }, 1000);

      // return Promise.all([this.saveDate(), this.saveNews(), this.saveFinance(), this.saveWeather()]);

      user.saveWeather().then(() => console.log(user));
      // user.refreshPage(createPage(user));
      // console.log(user);
      // await user.refresh().then(() => user).then(res => createPage(res));
      // createPage(user);
      // user.refreshUpdate(createPage(user));
      // await user.reverseGeocode(lat, lon).then(() => user.refresh()).then(() => createPage(user));
      // await user.reverseGeocode().then(res => console.log(user.location));
    });
  }

  // console.log(promise1());
  // let res = await user.reverseGeocode
  // console.log(user.location);
  // createPage(user);

  // Promise.all([user.saveCoords(), user.refresh()]).then(res => console.log(user));

  // Promise.resolve().then(user.saveCoords()).then(() => user.refresh()).then(() => console.log(user));
  // await user.saveCoords().then(() => user.refreh());

  // await user.saveCoords().then(() => user.refresh()).then(() => createPage(user));
  // await user.refresh().then(() => createPage(user));


  console.log(user);
  // (!lastSession) ? user = new UserData(DEFAULT_DATA) : user = new UserData(JSON.parse(lastSession));
  // await user.refresh().then(() => user.storeData());
  // console.log(updatePage());
  // user = new UserData(DEFAULT_DATA);
  // let location = {};
  // for (let i = 0; i < localStorage.length; i++) {
  //   let key = localStorage.key(i);
  //   location[key] = JSON.parse(localStorage.getItem(key));
  // }

  // let user = new UserData(DEFAULT_DATA);
  // console.log(user)
  // createPage(user);
  // user = new UserData({location, news: {}, finance: {}, weather: {}, calendar: {}});
  // document.querySelec
  // await user.saveWeather();
  // await user.saveFinance();
  // console.log(user);
  // createPage(user);


  document.querySelectorAll('.widgets > section').forEach(widget => {
    widget.addEventListener('click', () => viewPopup(widget.className.split('-')[0] + '-popup'));
  });

  

  document.querySelectorAll('.link').forEach(link => {
    link.addEventListener('click', () => {
      // event.preventDefault();
      // viewPopup(link.children[0].innerText.toLowerCase());
      // viewPopup(link.innerText.tolowerCase());
      // console.log(link.innerText.toLowerCase())
      viewPopup(link.innerText.toLowerCase());
      document.querySelector('.primary-nav').classList.add('inactive-nav');
    });
  });

  document.querySelector('.world-headlines').classList.add('active-headlines');
  document.querySelector('.world').classList.add('active-news-tab');

  document.querySelectorAll('.news-nav > li').forEach(tab => {
    let className = tab.classList[0];
    tab.addEventListener('click', () => viewNewsTab(className, className + '-headlines'));
  });

  document.querySelector('.crypto').classList.add('active-finance-tab');
  document.querySelector('.crypto-info').classList.add('active-finance');

  document.querySelectorAll('.finance-nav > li').forEach(tab => {
    let className = tab.classList[0];
    tab.addEventListener('click', () => viewFinanceTab(className, className + '-info'));
  });

  document.querySelectorAll('.close').forEach(button => {
    button.addEventListener('click', () => closePopup(document.querySelector('.active-popup')));
  });

  document.querySelector('.primary-close').addEventListener('click', () => {
    document.querySelector('.primary-nav').classList.add('inactive-nav');
  });

  document.querySelector('.menu').addEventListener('click', () => {
    document.querySelector('.inactive-nav').classList.remove('inactive-nav');
  });
  
  document.querySelector('.location-btn').addEventListener('click', () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition( async position => {
        let [lat, lon] = [position.coords.latitude, position.coords.longitude];
        document.querySelector('#map > div').remove();
        await user.reverseGeocode(lat, lon).then(() => updateLocation(user.location));
      });
    }
    console.log(user.location);
  });

  document.querySelector('.refresh').addEventListener('click', () => {

  });
  
  

});

 