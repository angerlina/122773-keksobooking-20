'use strict';

window.offerForm = (function () {
  var mainPin = document.querySelector('.map__pin--main');

  var changeFormState = function (formElement, disabled) {
    var elementsToDisable = formElement.querySelectorAll('input, select, textarea');
    for (var i = 0; i < elementsToDisable.length; i++) {
      elementsToDisable[i].disabled = disabled;
    }
  };

  var calculateAndFillAddress = function () {
    mainPin = document.querySelector('.map__pin--main');
    var formatPixelValueToInt = window.utils.formatPixelValueToInt;
    var mainPinOffsetX = formatPixelValueToInt(getComputedStyle(mainPin, ':after').width) / 2;
    var mainPinOffsetY = formatPixelValueToInt(getComputedStyle(mainPin, ':after').height);
    fillAddressInput(formatPixelValueToInt(mainPin.style.left) + mainPinOffsetX,
        formatPixelValueToInt(mainPin.style.top) + mainPinOffsetY);
  };

  var fillAddressInput = function (locationX, locationY) {
    var addressInput = document.querySelector('#address');
    addressInput.value = locationX + ', ' + locationY;
  };


  var fillAddressAfterPageRendering = function () {
    var formatPixelValueToInt = window.utils.formatPixelValueToInt;
    var mainPinDiameter = formatPixelValueToInt(getComputedStyle(mainPin, ':after').width);
    var offset = Math.floor(mainPinDiameter / 2);
    var mainPinX = formatPixelValueToInt(mainPin.style.left) + offset;
    var mainPinY = formatPixelValueToInt(mainPin.style.top) + offset;
    fillAddressInput(mainPinX, mainPinY);
  };

  return {
    fillAddressAfterPageRendering: fillAddressAfterPageRendering,
    calculateAndFillAddress: calculateAndFillAddress,
    changeFormState: changeFormState,
  };
})();
