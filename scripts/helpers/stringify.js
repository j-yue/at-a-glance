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
 * @param  {array} keys array containing keys for desired info in data arg
 * @param  {object} data info from instance of UserData
 * @param  {string} tag element to be created
 * @return {string} the stringified element block
 */
function blockStr(starter, keys, data, tag) {
  let content = starter;
  for (let key of keys) {
    content += elementStr(tag, key, data[key]);
  }
  return content;
}

/**
 * Matches the icon given by the Open Weather Map API to the weather icons by amCharts
 * @param  {string} condition html element
 * @return {string} the Skycons icon name
 */
function findIcon(condition) {
  let icon = "";

  switch (condition) {
    case "01d":
      icon = "day";
      break;
    case "01n":
      icon = "night";
      break;
    case "02d":
      icon = "cloudy-day-1";
      break;
    case "02n":
      icon = "cloudy-night-1";
      break;
    case "03d":
    case "03n":
    case "04d":
    case "04n":
      icon = "cloudy";
      break;
    case "09d":
    case "09n":
      icon = "rainy-7";
      break;
    case "10d":
      icon = "rainy-1";
      break;
    case "10n":
      icon = "rainy-4";
      break;
    case "11d":
    case "11n":
      icon = "thunder";
      break;
    case "13d":
    case "13n":
      icon = "snowy-6";
      break;
    case "50d":
      icon = "day";
      break;
    case "50n":
      icon = "night";
      break;
  }
  return icon;
}

export { elementStr, blockStr, findIcon };
