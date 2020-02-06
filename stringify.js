/**
 * Returns string of html element to be inserted into page
 * @param  {string} tag html element
 * @param  {string} className class name for the element
 * @param  {string} data inner text of the element
 * @return {string} the stringified element
 */
function elementStr(tag, className, data) {
  return `<${tag} class="${className}">${data}</${tag}>`;
}

/**
 * Returns string for a block of html elements
 * @param  {string} starter prepend element(s) to the block
//  * @param  {string} blockName each element's class follows BEM naming conventions
 * @param  {array} keys array containing keys for desired info in data arg
 * @param  {object} data info from instance of UserData
 * @param  {string} tag element to be created
 * @return {string} the stringified element block
 */
function blockStr(starter, keys, data, tag) {
  let content = starter;
  for (let key of keys) {
    // content += elementStr(tag, `${blockName}__${key}`, data[key]);
    content += elementStr(tag, key, data[key]);
  }
  return content;
}

/**
 * Matches the icon given by the Open Weather Map API to the Skycons weather icons
 * @param  {string} condition html element
 * @return {string} the Skycons icon name
 */
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



export {elementStr, blockStr, findIcon};
