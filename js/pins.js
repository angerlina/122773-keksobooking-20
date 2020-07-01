'use strict';

window.pins = (function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsContainer = document.querySelector('.map__pins');

  var createPinElement = function (offer) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinX = offer.location.x;
    var pinY = offer.location.y;
    var pinSize = window.data.pinSize;
    pinElement.style.left = (pinX - pinSize.width) + 'px';
    pinElement.style.top = (pinY - pinSize.width) + 'px';

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

  return {
    renderPins: renderPins,
  };
})();
