'use strict';

window.offerForm = (function () {
  var mainPin = document.querySelector('.map__pin--main');

  var enableForm = function (formElement) {
    var elementsToDisable = formElement.querySelectorAll('input, select, textarea');
    for (var i = 0; i < elementsToDisable.length; i++) {
      elementsToDisable[i].disabled = false;
    }
  };

  var disableForm = function (formElement) {
    var elementsToDisable = formElement.querySelectorAll('input, select, textarea');
    for (var i = 0; i < elementsToDisable.length; i++) {
      elementsToDisable[i].disabled = true;
    }
  };

  var calculateAndFillAddress = function () {
    mainPin = document.querySelector('.map__pin--main');
    var formatPixelValueToInt = window.utils.formatPixelValueToInt;
    var mainPinOffsetX = Math.floor(
        formatPixelValueToInt(
            getComputedStyle(mainPin).width) / 2
    );
    var mainPinOffsetY = formatPixelValueToInt(
        getComputedStyle(mainPin).height);
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
    enableForm: enableForm,
    disableForm: disableForm,
  };
})();
