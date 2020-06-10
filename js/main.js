'use strict';

var block = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('.map__pin');
var pinImage = template.querySelector('img');
var mapElement = document.querySelector('.map');

function getRandomInt(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

var getRandomItemsFromArray = function (array) {
  var pickedItems = [];
  var count = getRandomInt(1, array.length);
  for (var i = 0; i < count; i++) {
    var item = getRandomItemFromArray(array);
    pickedItems.push(item);
    var index = array.indexOf(item);
    array.splice(index, 1);
  }
  return pickedItems;
};


var getRandomItemFromArray = function (array) {
  return array[getRandomInt(0, array.length - 1)];
};


var generatePin = function () {
  var titles = ['Сдам квартиру срочно', 'Сдам квартиру для туристов', 'Сдам квартиру посуточно'];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var times = ['12:00', '13:00', '14:00'];
  var descriptions = ['В шаговой доступности от метро и прочего транспорта', 'Рядом много продуктовых магазинов и ресторанов'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var pin = {
    author: {
      avatar: ''
    },
    offer: {
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
    },
    location: {
      x: 0,
      y: 0
    }
  };
  var width = mapElement.clientWidth;
  pin.location.x = getRandomInt(0, width);
  pin.location.y = getRandomInt(130, 630);
  pin.author.avatar = 'img/avatars/user0' + getRandomInt(0, 8);
  pin.offer.title = getRandomItemFromArray(titles);
  pin.offer.address = pin.location.x + ', ' + pin.location.y;
  pin.offer.price = getRandomInt(10000, 100000);
  pin.offer.type = getRandomItemFromArray(types);
  pin.offer.rooms = getRandomInt(1, 10);
  pin.offer.guests = getRandomInt(1, 10);
  pin.offer.checkin = getRandomItemFromArray(times);
  pin.offer.checkout = getRandomItemFromArray(times);
  pin.offer.features = getRandomItemsFromArray(features);
  pin.offer.description = getRandomItemFromArray(descriptions);
  pin.offer.photos = getRandomItemsFromArray(photos);
  return pin;
};


var generatePins = function () {
  var pins = [];
  for (var i = 0; i < 8; i++) {
    pins.push(generatePin());
  }
  return pins;
};


var createPinElement = function (pin) {
  var pinElement = template.cloneNode(true);
  var x = pin.location.x;
  var halfOfWidth = pinImage.width / 2;
  var y = pin.location.y;
  var height = pinImage.height;
  pinElement.style.left = (x - halfOfWidth) + 'px';
  pinElement.style.top = (y - height) + 'px';

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


var pins = generatePins();
var documentFragment = createPinElements(pins);


block.appendChild(documentFragment);


