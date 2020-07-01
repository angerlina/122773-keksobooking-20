'use strict';

window.data = (function () {

  var TITLES = ['Сдам квартиру срочно', 'Сдам квартиру для туристов', 'Сдам квартиру посуточно'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var DESCRIPTIONS = ['В шаговой доступности от метро и прочего транспорта', 'Рядом много продуктовых магазинов и ресторанов'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var getPinSize = function () {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    pinTemplate.querySelector('img');
    var pinsContainer = document.querySelector('.map__pins');
    var temporaryPin = pinTemplate.cloneNode(false);
    temporaryPin.style.visibily = 'hidden';
    temporaryPin = pinsContainer.appendChild(temporaryPin);
    var pinHeight = window.utils.formatPixelValueToInt(getComputedStyle(temporaryPin, ':after').height);
    var pinWidth = window.utils.formatPixelValueToInt(getComputedStyle(temporaryPin, ':after').width);
    pinsContainer.removeChild(temporaryPin);
    return {
      width: pinWidth,
      height: pinHeight,
    };
  };

  var mapElement = document.querySelector('.map');

  var pinSize = getPinSize();

  var formatUserNumber = function (number) {
    var formattedNumber = number + 1;
    if (formattedNumber.toString().length === 1) {
      formattedNumber = '0' + formattedNumber;
    }
    return formattedNumber;
  };


  var generateOffer = function (userNumber) {
    var getRandomItemFromArray = window.utils.getRandomItemFromArray;
    var getRandomItemsFromArray = window.utils.getRandomItemsFromArray;
    var getRandomInt = window.utils.getRandomInt;
    var mapWidth = mapElement.clientWidth;
    var offer = {
      location: {
        x: window.utils.getRandomInt(pinSize.width / 2, mapWidth),
        y: window.utils.getRandomInt(130 + pinSize.height, 630)},
      author: {
        avatar: 'img/avatars/user' + formatUserNumber(userNumber) + '.png'
      },
      title: window.utils.getRandomItemFromArray(TITLES),
      price: getRandomInt(10000, 100000),
      type: getRandomItemFromArray(TYPES),
      rooms: getRandomInt(1, 10),
      guests: getRandomInt(1, 10),
      checkin: getRandomItemFromArray(TIMES),
      checkout: getRandomItemFromArray(TIMES),
      features: getRandomItemsFromArray(FEATURES),
      description: getRandomItemFromArray(DESCRIPTIONS),
      photos: getRandomItemsFromArray(PHOTOS),
    };
    offer.address = offer.location.x + ', ' + offer.location.y;
    return offer;
  };

  var generateOffers = function (quantity) {
    var offers = [];
    for (var i = 0; i < quantity; i++) {
      offers.push(generateOffer(i));
    }
    return offers;
  };

  return {
    pinSize: pinSize,
    generateOffers: generateOffers,
  };
})();