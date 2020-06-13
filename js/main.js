'use strict';

var TITLES = ['Сдам квартиру срочно', 'Сдам квартиру для туристов', 'Сдам квартиру посуточно'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var DESCRIPTION = ['В шаговой доступности от метро и прочего транспорта', 'Рядом много продуктовых магазинов и ресторанов'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFERS_AMOUNT = 8;

document.querySelector('.map--faded').classList.remove('map--faded');
var pinsRoot = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
pinTemplate.querySelector('img');
var mapElement = document.querySelector('.map');

var formatPixelValueToInt = function (pixels) {
  if (pixels) {
    return parseInt(pixels.replace('px'), 10);
  }
  return null;
};

var temporaryPin = pinTemplate.cloneNode(true);
temporaryPin.style.display = 'none';
temporaryPin = pinsRoot.appendChild(temporaryPin);
var pinHeight = formatPixelValueToInt(getComputedStyle(temporaryPin, ':after').height);
var pinWidth = formatPixelValueToInt(getComputedStyle(temporaryPin, ':after').width);
temporaryPin.remove();


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

var generateOffer = function () {
  var offer = {
    title: '',
    address: '',
    price: '',
    type: '',
    rooms: '',
    guests: '',
    checkin: '',
    checkout: '',
    features: [],
    description: '',
    photos: []
  };
  offer.title = getRandomItemFromArray(TITLES);
  offer.price = getRandomInt(10000, 100000);
  offer.type = getRandomItemFromArray(TYPES);
  offer.rooms = getRandomInt(1, 10);
  offer.guests = getRandomInt(1, 10);
  offer.checkin = getRandomItemFromArray(TIMES);
  offer.checkout = getRandomItemFromArray(TIMES);
  offer.features = getRandomItemsFromArray(FEATURES);
  offer.description = getRandomItemFromArray(DESCRIPTION);
  offer.photos = getRandomItemsFromArray(PHOTOS);
  return offer;
};

var generateOffers = function () {
  var offers = [];
  for (var i = 0; i < OFFERS_AMOUNT; i++) {
    offers.push(generateOffer());
  }
  return offers;
};

var generatePin = function (userNumber, offer) {
  var pin = {
    author: {
      avatar: ''
    },
    location: {
      x: 0,
      y: 0
    }
  };
  var width = mapElement.clientWidth;
  pin.location.x = getRandomInt(0, width);
  pin.location.y = getRandomInt(130, 630);
  pin.author.avatar = 'img/avatars/user' + formatUserNumber(userNumber);
  pin.offer = offer;
  pin.offer.address = pin.location.x + ', ' + pin.location.y;
  return pin;
};


var generatePins = function (array) {
  var pins = [];
  for (var i = 0; i < array.length; i++) {
    pins.push(generatePin(i, array[i]));
  }
  return pins;
};


var createPinElement = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinX = pin.location.x;
  var halfOfWidth = pinWidth / 2;
  var pinY = pin.location.y;
  var height = pinHeight;
  pinElement.style.left = (pinX - halfOfWidth) + 'px';
  pinElement.style.top = (pinY - height) + 'px';

  var imageElement = pinElement.querySelector('img');
  imageElement.alt = pin.offer.title;
  imageElement.src = pin.author.avatar;

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

var offers = generateOffers();
var pins = generatePins(offers);
var documentFragment = createPinElements(pins);

pinsRoot.appendChild(documentFragment);


