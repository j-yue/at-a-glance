
  /**
   * Slide up selected widget into view
   */
export function viewPopup(sel) {
    let popup = document.querySelector(`.${sel}`);
    popup.classList.toggle('active-popup');
    popup.style.animation = 'slideUp 1s';
}

/**
   * Slide down widget when closing popup 
   */
export function closePopup(sel) {
    sel.style.animation = 'slideDown 1s';
    setTimeout(() => sel.classList.toggle('active-popup'), 1000);
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

