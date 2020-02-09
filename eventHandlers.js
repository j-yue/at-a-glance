
  /**
   * View popup screen selected from clicked widget in main screen
   */
export function viewPopup(sel) {
    let popup = document.querySelector(`.${sel}`);
    popup.classList.toggle('active-popup');
    document.querySelector('.primary-nav').classList.add('inactive-nav');//hide primary nav if active and widget clicked
}


/**
   * Close active popup
   */
export function closePopup(sel) {
    sel.classList.toggle('active-popup');
}


  /**
   * Remove a classname from element containing it
   * used to toggle between active elements/screens
   * @param  {string} name
   */
function removeClassName(name) {
    document.querySelector(`.${name}`).classList.remove(name);
}


  /**
   * Add classname to element
   * used to toggle between active elements/screens
   * @param  {string} name
   * @param {string} sel
   */
function addClassName(name, sel) {
    document.querySelector(`.${sel}`).classList.add(name);
}


  /**
   * Switch active tabs
   * used in news and finance screens
   * @param  {string} activeTab
   * @param  {string} activeContent
   * @param  {string} selectedTab
   * @param  {string} selectedContent
   */
function viewTab(activeTab, activeContent, selectedTab, selectedContent) {
    removeClassName(activeTab);
    removeClassName(activeContent);
    addClassName(activeTab, selectedTab);
    addClassName(activeContent, selectedContent);
}

/**
   * View selected news tab
   */
export function viewNewsTab(tab, headlines) {
    viewTab('active-news-tab', 'active-headlines', tab, headlines);
}

/**
   * View selected finance tab
   */
export function viewFinanceTab(tab, content) {
    viewTab('active-finance-tab', 'active-finance', tab, content);
}
