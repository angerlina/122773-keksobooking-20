'use strict';

window.pins = (function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsContainer = document.querySelector('.map__pins');

  var getPinSize = function () {
    pinTemplate.querySelector('img');
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

  var pinSize = getPinSize();

  var createPinElement = function (offer) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinX = offer.location.x;
    var pinY = offer.location.y;
    pinElement.style.left = (pinX - pinSize.width / 2) + 'px';
    pinElement.style.top = (pinY - pinSize.height) + 'px';

    var imageElement = pinElement.querySelector('img');
    imageElement.alt = offer.title;
    imageElement.src = offer.author.avatar;
    return pinElement;
  };

  var renderPins = function (array) {
    var documentFragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var pinElement = createPinElement(array[i]);
      documentFragment.appendChild(pinElement);
    }
    pinsContainer.appendChild(documentFragment);
  };

  return {
    renderPins: renderPins,
    pinSize: pinSize,
  };
})();
