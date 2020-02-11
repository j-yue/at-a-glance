/***
 * Render page with user's data from local storage. If user is new, load demo data.
 * 
 * TABLE OF CONTENTS  
  1. loading
  2. interactive
  3. complete
    a. createPage
    b. event listeners
      1. primary nav
      2. main header
      3. widgets
      4. popups + actions

 */

import UserData from './UserData.js';
import { DEFAULT_DATA } from './defaultData.js';
import {us, china, germany} from './demo.js';
// import {elementStr, blockStr, findIcon} from './stringify.js';
import { createPage, updateLocation, updatePage } from './createPage.js';
import { viewPopup, closePopup, viewNewsTab, viewFinanceTab } from './eventHandlers.js';
// import * from './eventHandlers';
// let user;
// let lastSession = localStorage.getItem('lastSession');


document.onreadystatechange = () => {
  let state = document.readyState;
  // let user = new UserData(DEFAULT_DATA);
  let user = new UserData(china);
  console.log(user);

  if (state === 'loading') {

  }

  else if (state === 'interactive') {

  }
  else if (state === 'complete') {
    let blankState = document.body.innerHTML;
    createPage(user);
    // console.log(user);

    /**************************************EVENT LISTENERS*******************************************/

    // PRIMARY NAV------------------------------------------------------------------------------------
    // slide primary nav out of view when user closes it
    document.querySelector('.primary-close').addEventListener('click', () => {
      let nav = document.querySelector('.primary-nav');
      nav.style.animation = 'slideOutNav 1s';
      setTimeout(() => nav.classList.add('inactive-nav'), 1000);
    });

    // add event listener for each link in primary nav to slide popup into view
    document.querySelectorAll('.link').forEach(link => {
      link.addEventListener('click', () => {
        viewPopup(link.innerText.toLowerCase());
        document.querySelector('.primary-nav').classList.add('inactive-nav');
      });
    });

    //slide primary nav into view when user clicks menu image
    document.querySelector('.menu').addEventListener('click', () => {
      document.querySelector('.primary-nav').style.animation = 'slideInNav 1s';
      document.querySelector('.inactive-nav').classList.remove('inactive-nav');
    });

    //refresh page
    document.querySelector('.refresh').addEventListener('click', async () => {
      await user.refreshPage();
      updatePage(blankState, user);
      // document.body.innerHTML = blankState;

      console.log(user);
      // document = scaffold;
      // createPage(user);
      // updatePage(user);
      // console.log(document.body.innerHTML);
      // console.log(blankState);
    })


    // WIDGETS------------------------------------------------------------------------------------
    // show selected widget from main screen
    document.querySelectorAll('.widgets > section').forEach(widget => {
      widget.addEventListener('click', () => viewPopup(widget.className.split('-')[0] + '-popup'));
    });


    // POPUPS + ACTIONS--------------------------------------------------------------------------
    // makes close button in each popup and action section work
    document.querySelectorAll('.close').forEach(button => {
      button.addEventListener('click', () => closePopup(document.querySelector('.active-popup')));
    });

    // show selected finance tab
    document.querySelectorAll('.finance-nav > li').forEach(tab => {
      let className = tab.classList[0];
      tab.addEventListener('click', () => viewFinanceTab(className, className + '-info'));
    });

    // make crypto the default active finance tab
    document.querySelector('.crypto').classList.add('active-finance-tab');
    document.querySelector('.crypto-info').classList.add('active-finance');

    // show news tab
    document.querySelectorAll('.news-nav > li').forEach(tab => {
      let className = tab.classList[0];
      tab.addEventListener('click', () => viewNewsTab(className, className + '-headlines'));
    });

    // make world headlines the default active news tab
    document.querySelector('.national-headlines').classList.add('active-headlines');
    document.querySelector('.national').classList.add('active-news-tab');


    document.querySelector('.location-btn').addEventListener('click', () => {
      console.log(user.location.coordinates);
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async position => {
          let [lat, lon] = [position.coords.latitude, position.coords.longitude];
          await user.reverseGeocode(lat, lon).then(res => console.log(res));
          document.querySelector('#map > div').remove();
          updateLocation(user.location);
          // console.log(user.location);
        });
      }
    });

  }
}

// document.addEventListener('DOMContentLoaded', () => {
//   let user = new UserData(DEFAULT_DATA);
//   console.log(user);
//   createPage(user);

//   // console.log(lastSession);

//   // if (!lastSession) {
//   //   user = new UserData(DEFAULT_DATA);
//   //   // user.saveCoords();
//   //   console.log('hi');
//   // } else {
//   //   user = new UserData(JSON.parse(lastSession));
//   // }

//   // await user.saveCoords().then(() => console.log(user.location));

//   // if ('geolocation' in navigator) {
//     // navigator.geolocation.getCurrentPosition(async position => {
//     //   let [lat, lon] = [position.coords.latitude, position.coords.longitude];
//       // let res = await user.reverseGeocode(lat, lon);
//       // console.log(res);
//       // let refresh = new Promise((resolve, reject) => {
//       //   user.refresh();
//       //   resolve('everything has been refreshed');
//       // });
//       // refresh.then(() => console.log(user));
//       // await user.reverseGeocode(lat, lon).then(() => user.refresh());
//       // setInterval(() => {
//       //   createPage(user);
//       // }, 1000);

//       // return Promise.all([this.saveDate(), this.saveNews(), this.saveFinance(), this.saveWeather()]);

//       // user.saveWeather().then(() => console.log(user));
//       // user.refreshPage(createPage(user));
//       // console.log(user);
//       // await user.refresh().then(() => user).then(res => createPage(res));
//       // createPage(user);
//       // user.refreshUpdate(createPage(user));
//       // await user.reverseGeocode(lat, lon).then(() => user.refresh()).then(() => createPage(user));
//       // await user.reverseGeocode().then(res => console.log(user.location));
//   //   });
//   // }

//   // console.log(promise1());
//   // let res = await user.reverseGeocode
//   // console.log(user.location);
//   // createPage(user);

//   // Promise.all([user.saveCoords(), user.refresh()]).then(res => console.log(user));

//   // Promise.resolve().then(user.saveCoords()).then(() => user.refresh()).then(() => console.log(user));
//   // await user.saveCoords().then(() => user.refreh());

//   // await user.saveCoords().then(() => user.refresh()).then(() => createPage(user));
//   // await user.refresh().then(() => createPage(user));


//   // console.log(user);
//   // (!lastSession) ? user = new UserData(DEFAULT_DATA) : user = new UserData(JSON.parse(lastSession));
//   // await user.refresh().then(() => user.storeData());
//   // console.log(updatePage());
//   // user = new UserData(DEFAULT_DATA);
//   // let location = {};
//   // for (let i = 0; i < localStorage.length; i++) {
//   //   let key = localStorage.key(i);
//   //   location[key] = JSON.parse(localStorage.getItem(key));
//   // }

//   // let user = new UserData(DEFAULT_DATA);
//   // console.log(user)
//   // createPage(user);
//   // user = new UserData({location, news: {}, finance: {}, weather: {}, calendar: {}});
//   // document.querySelec
//   // await user.saveWeather();
//   // await user.saveFinance();
//   // console.log(user);
//   // createPage(user);


//   document.querySelectorAll('.widgets > section').forEach(widget => {
//     widget.addEventListener('click', () => viewPopup(widget.className.split('-')[0] + '-popup'));
//   });

//   // document.querySelector('.menu').addEventListener('click', () => viewMenu());


//   document.querySelectorAll('.link').forEach(link => {
//     link.addEventListener('click', () => {
//       // event.preventDefault();
//       // viewPopup(link.children[0].innerText.toLowerCase());
//       // viewPopup(link.innerText.tolowerCase());
//       // console.log(link.innerText.toLowerCase())
//       viewPopup(link.innerText.toLowerCase());
//       document.querySelector('.primary-nav').classList.add('inactive-nav');
//       // document.querySelector('.primary-nav')
//       // viewMenu();
//     });
//   });

//   document.querySelector('.world-headlines').classList.add('active-headlines');
//   document.querySelector('.world').classList.add('active-news-tab');

//   document.querySelectorAll('.news-nav > li').forEach(tab => {
//     let className = tab.classList[0];
//     tab.addEventListener('click', () => viewNewsTab(className, className + '-headlines'));
//   });

//   document.querySelector('.crypto').classList.add('active-finance-tab');
//   document.querySelector('.crypto-info').classList.add('active-finance');

//   document.querySelectorAll('.finance-nav > li').forEach(tab => {
//     let className = tab.classList[0];
//     tab.addEventListener('click', () => viewFinanceTab(className, className + '-info'));
//   });

//   document.querySelectorAll('.close').forEach(button => {
//     button.addEventListener('click', () => closePopup(document.querySelector('.active-popup')));
//   });

//   document.querySelector('.primary-close').addEventListener('click', () => {
//     let nav = document.querySelector('.primary-nav');
//     nav.style.animation = 'slideOutNav 1s';
//     setTimeout(() => nav.classList.add('inactive-nav'), 1000);
//   });

//   document.querySelector('.menu').addEventListener('click', () => {
//     document.querySelector('.primary-nav').style.animation = 'slideInNav 1s';
//     document.querySelector('.inactive-nav').classList.remove('inactive-nav');
//   });

//   document.querySelector('.location-btn').addEventListener('click', () => {
//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition( async position => {
//         let [lat, lon] = [position.coords.latitude, position.coords.longitude];
//         document.querySelector('#map > div').remove();
//         await user.reverseGeocode(lat, lon).then(() => updateLocation(user.location));
//       });
//     }
//     console.log(user.location);
//   });

//   // document.querySelector('.refresh').addEventListener('click', () => {

//   // });



// });

