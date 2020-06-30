'use strict';

window.utils = (function () {

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
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

  return {
    getRandomInt: getRandomInt,
    formatPixelValueToInt: formatPixelValueToInt,
    getRandomItemsFromArray: getRandomItemsFromArray,
    getRandomItemFromArray: getRandomItemFromArray,
  };
})();
