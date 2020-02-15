/***
 * Render page with user's data from local storage. If user is new, load demo data.
 * 
 * TABLE OF CONTENTS  
    event listeners
      1. primary nav
      2. main header
      3. widgets
      4. popups + actions

 */

import { viewPopup, closePopup, viewNewsTab, viewFinanceTab } from './eventHandlers.js';
import { updateLocation, updatePage } from './createPage.js';


export const addEverything = () => {

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
        if (user === undefined) user = window.user;
        await user.update();
        updatePage(window.prevState, user);
        console.log(user);
    });

    document.querySelector('.refresh-error').addEventListener('click', async () => {
        if (user === undefined) user = window.user;
        await user.update();
        updatePage(window.prevState, user);
    });


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

    // update location when location button clicked
    document.querySelector('.location-btn').addEventListener('click', (e) => {
        let user = window.user;
        document.querySelector('.location-error').innerText = '';
        try {
            document.querySelector('#map > div').remove();
            user.saveCoords(
                () => {
                    document.querySelector('.location-error').innerText = 'Please enable location services';
                }
            );
            setTimeout(() => updateLocation(user.location), 1000);
        } catch (err) {
            document.querySelector('.location-error').innerText = 'Location services unsupported in browser.';
        }
    });
}