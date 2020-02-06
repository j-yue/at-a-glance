
// export function widgetClicked(sel) {
// export function viewPopup(sel) {
//     let className = sel.split('-')[0];
//     let popup = document.querySelector(`.${className}-popup`);
//     popup.classList.toggle('active-popup');
// }

export function viewPopup(sel) {
    let popup = document.querySelector(`.${sel}`);
    popup.classList.toggle('active-popup');
    document.querySelector('.primary-nav').classList.add('inactive-nav');//hide primary nav if active and widget clicked
}


export function closePopup(sel) {
    sel.classList.toggle('active-popup');
}


function removeClassName(name) {
    document.querySelector(`.${name}`).classList.remove(name);
}


function addClassName(name, sel) {
    document.querySelector(`.${sel}`).classList.add(name);
}

function viewTab(activeTab, activeContent, selectedTab, selectedContent) {
    removeClassName(activeTab);
    removeClassName(activeContent);
    addClassName(activeTab, selectedTab);
    addClassName(activeContent, selectedContent);
}


export function viewNewsTab(tab, headlines) {
    viewTab('active-news-tab', 'active-headlines', tab, headlines);
}


export function viewFinanceTab(tab, content) {
    viewTab('active-finance-tab', 'active-finance', tab, content);
}
