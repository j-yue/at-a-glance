/***
 * Render the page. If the user is new (i.e. lat and lon are not in localStorage), use demo data. 
 * If the user is returning, update UserData instance before creating the page.
 * 
 * global variables:
 *  user - instance of UserData 
 *  prevState - state of page before createPage() called

 */

import UserData from "./modules/UserData.js";
import { us, china, japan, germany } from "./constants/demo.js";
import { createPage } from "./helpers/createPage.js";
import { addEverything } from "./helpers/eventListeners.js";

document.onreadystatechange = async () => {
  let state = document.readyState;
  let lat = localStorage.getItem("lat");
  let lon = localStorage.getItem("lon");

  let user = new UserData(us);
  if (lat && lon) await user.update();
  window.user = user;

  if (state === "loading") {
  } else if (state === "interactive") {
  } else if (state === "complete") {
    let blankState = document.body.innerHTML;
    window.prevState = blankState;
    createPage(user);
    addEverything();
  }
};
