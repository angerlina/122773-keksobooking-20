'use strict';

window.utils = (function () {

  function snakeToCamel(str) {
    return str.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
  }

  var getRandomInt = function (min, max) {
    return min + Math.round((max - min) * Math.random());
  };

  var formatPixelValueToInt = function (pixels) {
    if (pixels) {
      return parseInt(pixels.replace('px'), 10);
    }
    return null;
  };

  var getRandomItemsFromArray = function (array) {
    var arrayCopy = array.slice();
    var pickedItems = [];
    var count = getRandomInt(1, array.length);
    for (var i = 0; i < count; i++) {
      var item = getRandomItemFromArray(arrayCopy);
      pickedItems.push(item);
      var index = arrayCopy.indexOf(item);
      arrayCopy.splice(index, 1);
    }
    return pickedItems;
  };


  var getRandomItemFromArray = function (array) {
    return array[getRandomInt(0, array.length)];
  };

  var cloneObject = function (obj) {
    return JSON.parse(JSON.stringify(obj));
  };

  return {
    getRandomInt: getRandomInt,
    formatPixelValueToInt: formatPixelValueToInt,
    getRandomItemsFromArray: getRandomItemsFromArray,
    getRandomItemFromArray: getRandomItemFromArray,
    snakeToCamel: snakeToCamel,
    cloneObject: cloneObject,
  };
})();
