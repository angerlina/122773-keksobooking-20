'use strict';

window.pins = (function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsContainer = document.querySelector('.map__pins');

  var removePins = function () {
    var pins = pinsContainer.querySelectorAll(':not(.map__pin--main).map__pin ');
    pins.forEach(function (pin) {
      pin.remove();
    });
    window.card.onCloseCard();
  };

  var getPinSize = function () {
    pinTemplate.querySelector('img');
    var temporaryPin = pinTemplate.cloneNode(false);
    temporaryPin.style.visibily = 'hidden';
    temporaryPin = pinsContainer.appendChild(temporaryPin);
    var pinHeight = window.utils.formatPixelValueToInt(getComputedStyle(temporaryPin, ':after').height);
    var pinWidth = window.utils.formatPixelValueToInt(getComputedStyle(temporaryPin, ':after').width);
    temporaryPin.remove();
    return {
      width: pinWidth,
      height: pinHeight,
    };
  };

  var pinSize = getPinSize();

  var createPinElement = function (object) {
    if (object.offer) {
      var pinElement = pinTemplate.cloneNode(true);
      var pinX = object.location.x;
      var pinY = object.location.y;
      pinElement.style.left = (pinX - pinSize.width / 2) + 'px';
      pinElement.style.top = (pinY - pinSize.height) + 'px';

      var imageElement = pinElement.querySelector('img');
      imageElement.alt = object.title;
      imageElement.src = object.author.avatar;
      return pinElement;
    } else {
      return null;
    }
  };

  var handleClickOnPin = function (pinElement, data) {
    window.card.renderCard(data);
    pinElement.classList.add('map__pin--active');
  };

  var addEventListeners = function (pinElement, data) {
    pinElement.addEventListener('click', function () {
      handleClickOnPin(pinElement, data);
    });
    pinElement.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        handleClickOnPin(pinElement, data);
      }
    });
  };

  var renderPins = function (array) {
    removePins();
    var documentFragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var pinElement = createPinElement(array[i]);
      if (pinElement) {
        documentFragment.appendChild(pinElement);
        addEventListeners(pinElement, array[i]);
      }
    }
    pinsContainer.appendChild(documentFragment);
  };

  return {
    renderPins: renderPins,
    pinSize: pinSize,
    removePins: removePins,
  };
})();
