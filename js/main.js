'use strict';

var MAIN_PIN_SELECTOR = '.map__pin--main';
var TITLES = ['Сдам квартиру срочно', 'Сдам квартиру для туристов', 'Сдам квартиру посуточно'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var DESCRIPTIONS = ['В шаговой доступности от метро и прочего транспорта', 'Рядом много продуктовых магазинов и ресторанов'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFERS_AMOUNT = 8;

document.querySelector('.map').classList.remove('map--faded');
var pinsContainer = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
pinTemplate.querySelector('img');
var mapElement = document.querySelector('.map');
var mainPin = document.querySelector(MAIN_PIN_SELECTOR);

var roomsSelect = document.querySelector('#room_number');
var guestsSelect = document.querySelector('#capacity');

var formatPixelValueToInt = function (pixels) {
  if (pixels) {
    return parseInt(pixels.replace('px'), 10);
  }
  return null;
};

var temporaryPin = pinTemplate.cloneNode(true);
temporaryPin.style.display = 'none';
temporaryPin = pinsContainer.appendChild(temporaryPin);
var pinHeight = formatPixelValueToInt(getComputedStyle(temporaryPin, ':after').height);
var pinWidth = formatPixelValueToInt(getComputedStyle(temporaryPin, ':after').width);
var halfOfPinWidth = pinWidth / 2;
pinsContainer.removeChild(temporaryPin);


var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
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

var formatUserNumber = function (number) {
  var formattedNumber = number + 1;
  if (formattedNumber.toString().length === 1) {
    formattedNumber = '0' + formattedNumber;
  }
  return formattedNumber;
};

var generateOffer = function (userNumber) {
  var mapWidth = mapElement.clientWidth;
  var offer = {location: {}, author: {}};
  offer.title = getRandomItemFromArray(TITLES);
  offer.price = getRandomInt(10000, 100000);
  offer.type = getRandomItemFromArray(TYPES);
  offer.rooms = getRandomInt(1, 10);
  offer.guests = getRandomInt(1, 10);
  offer.checkin = getRandomItemFromArray(TIMES);
  offer.checkout = getRandomItemFromArray(TIMES);
  offer.features = getRandomItemsFromArray(FEATURES);
  offer.description = getRandomItemFromArray(DESCRIPTIONS);
  offer.photos = getRandomItemsFromArray(PHOTOS);
  offer.location.x = getRandomInt(halfOfPinWidth, mapWidth);
  offer.location.y = getRandomInt(130 + pinHeight, 630);
  offer.author.avatar = 'img/avatars/user' + formatUserNumber(userNumber) + '.png';
  offer.address = offer.location.x + ', ' + offer.location.y;
  return offer;
};

var generateOffers = function () {
  var offers = [];
  for (var i = 0; i < OFFERS_AMOUNT; i++) {
    offers.push(generateOffer(i));
  }
  return offers;
};


var generatePins = function (array) {
  var pins = [];
  for (var i = 0; i < array.length; i++) {
    var pin = {};
    pin.offer = array[i];
    pins.push(pin);
  }
  return pins;
};

var createPinElement = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinX = pin.offer.location.x;
  var pinY = pin.offer.location.y;
  pinElement.style.left = (pinX - halfOfPinWidth) + 'px';
  pinElement.style.top = (pinY - pinHeight) + 'px';

  var imageElement = pinElement.querySelector('img');
  imageElement.alt = pin.offer.title;
  imageElement.src = pin.offer.author.avatar;

  return pinElement;
};

var createPinElements = function (pins) {
  var documentFragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    var pinElement = createPinElement(pins[i]);
    documentFragment.appendChild(pinElement);
  }
  return documentFragment;
};

var toggleDisableForElementsList = function (selector, isDisabled) {
  var elements = document.querySelectorAll(selector);
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = isDisabled;
  }
};

var toggleClass = function (selector, hasToContainClass, className) {
  var element = document.querySelector(selector);
  var containsClass = element.classList.contains(className);
  if (containsClass && !hasToContainClass) {
    element.classList.remove(className);
  } else if (!containsClass && hasToContainClass) {
    element.classList.add(className);
  }
};

var togglePageActivity = function (isActive) {
  toggleDisableForElementsList('.ad-form > fieldset', !isActive);
  toggleDisableForElementsList('.map__filters > *', !isActive);
  toggleClass('.map', !isActive, 'map--faded');
  toggleClass('.ad-form', !isActive, 'ad-form--disabled');
};

var calculateAndFillAddress = function () {
  mainPin = document.querySelector('.map__pin--main');
  var mainPinOffsetX = formatPixelValueToInt(getComputedStyle(mainPin, ':after').width) / 2;
  var mainPinOffsetY = formatPixelValueToInt(getComputedStyle(mainPin, ':after').height);
  fillAddressInput(formatPixelValueToInt(mainPin.style.left) + mainPinOffsetX,
      formatPixelValueToInt(mainPin.style.top) + mainPinOffsetY);
};

var fillAddressInput = function (locationX, locationY) {
  var addressInput = document.querySelector('#address');
  addressInput.value = locationX + ', ' + locationY;
};


var activatePage = function () {
  togglePageActivity(true);
  var offers = generateOffers();
  var pins = generatePins(offers);
  var documentFragment = createPinElements(pins);
  pinsContainer.appendChild(documentFragment);
  calculateAndFillAddress();
};

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activatePage();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.code === 'Enter') {
    activatePage();
  }
});

var fillAddressAfterPageRendering = function () {
  togglePageActivity(false);
  mainPin = document.querySelector(MAIN_PIN_SELECTOR);
  var mainPinDiameter = formatPixelValueToInt(getComputedStyle(mainPin, ':after').width);
  var offset = Math.floor(mainPinDiameter / 2);
  var mainPinX = formatPixelValueToInt(mainPin.style.left) + offset;
  var mainPinY = formatPixelValueToInt(mainPin.style.top) + offset;
  fillAddressInput(mainPinX, mainPinY);
};

guestsSelect.addEventListener('change', function () {
  setCustomValidityForGuestsAndRooms(guestsSelect);
});

roomsSelect.addEventListener('change', function () {
  setCustomValidityForGuestsAndRooms(roomsSelect);
});


guestsSelect.addEventListener('invalid', function () {
  setCustomValidityForGuestsAndRooms(guestsSelect);
});


var setCustomValidityForGuestsAndRooms = function (inputElement) {
  var rooms = parseInt(roomsSelect.value, 10);
  var guests = parseInt(guestsSelect.value, 10);
  if (rooms === 1 && guests !== 1) {
    inputElement.setCustomValidity(' 1 комната может быть только для 1 гостя');
  } else if (rooms === 2 && (guests === 3 || guests === 0)) {
    inputElement.setCustomValidity('2 комнаты могут быть только для 1 или 2 гостей');
  } else if (rooms === 3 && guests === 0) {
    inputElement.setCustomValidity('3 комнаты могут быть только для 1, 2 или 3 гостей');
  } else if (rooms === 100 && guests !== 0) {
    inputElement.setCustomValidity('100 комнат могут быть только "не для гостей"');
  } else {
    inputElement.setCustomValidity('');
  }
};


fillAddressAfterPageRendering();
