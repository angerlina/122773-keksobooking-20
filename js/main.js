'use strict';

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
var mainPin = document.querySelector('.map__pin--main');
var offerForm = document.querySelector('.ad-form');
var roomsSelect = offerForm.querySelector('#room_number');
var guestsSelect = offerForm.querySelector('#capacity');
var filtersForm = document.querySelector('.map__filters');

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
  var offer = {
    location: {
      x: getRandomInt(halfOfPinWidth, mapWidth),
      y: getRandomInt(130 + pinHeight, 630)},
    author: {
      avatar: 'img/avatars/user' + formatUserNumber(userNumber) + '.png'
    }
  };

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

var createPinElement = function (offer) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinX = offer.location.x;
  var pinY = offer.location.y;
  pinElement.style.left = (pinX - halfOfPinWidth) + 'px';
  pinElement.style.top = (pinY - pinHeight) + 'px';

  var imageElement = pinElement.querySelector('img');
  imageElement.alt = offer.title;
  imageElement.src = offer.author.avatar;

  return pinElement;
};

var renderPins = function (offers) {
  var documentFragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    var pinElement = createPinElement(offers[i]);
    documentFragment.appendChild(pinElement);
  }
  pinsContainer.appendChild(documentFragment);
};

var changeFormState = function (formElement, disabled) {
  var elementsToDisable = formElement.querySelectorAll('input, select');
  for (var i = 0; i < elementsToDisable.length; i++) {
    elementsToDisable[i].disabled = disabled;
  }
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
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  changeFormState(offerForm, false);
  changeFormState(filtersForm, false);
  var offers = generateOffers(OFFERS_AMOUNT);
  renderPins(offers);
  calculateAndFillAddress();
};

var inactivatePage = function () {
  document.querySelector('.map').classList.add('map--faded');
  document.querySelector('.ad-form').classList.add('ad-form--disabled');
  changeFormState(offerForm, true);
  changeFormState(filtersForm, true);
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
  inactivatePage();
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
