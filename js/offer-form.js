'use strict';

window.offerForm = (function () {
  var mainPin = document.querySelector('.map__pin--main');
  var offerForm = document.querySelector('.ad-form');
  var clearButton = document.querySelector('.ad-form__reset');

  clearButton.addEventListener('click', function () {
    window.map.inactivatePage();
  });

  var resetOffersForm = function () {
    offerForm.reset();
  };

  var submitHandler = function (evt) {
    window.offersApi.sendPostRequest(new FormData(offerForm), function () {
      window.map.inactivatePage();
      window.userDialogs.showSuccessSubmitMessage();
    }, function () {
      window.userDialogs.showErrorMessage();
    });
    evt.preventDefault();
  };

  offerForm.addEventListener('submit', submitHandler);

  var enableForm = function (formElement) {
    var elementsToDisable = formElement.querySelectorAll('input, select, textarea, button');
    for (var i = 0; i < elementsToDisable.length; i++) {
      elementsToDisable[i].disabled = false;
    }
  };

  var disableForm = function (formElement) {
    var elementsToDisable = formElement.querySelectorAll('input, select, textarea, button');
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


  var calculateAndFillAddressForRoundPin = function () {
    var formatPixelValueToInt = window.utils.formatPixelValueToInt;
    var mainPinDiameter = formatPixelValueToInt(getComputedStyle(mainPin, ':after').width);
    var offset = Math.floor(mainPinDiameter / 2);
    var mainPinX = formatPixelValueToInt(mainPin.style.left) + offset;
    var mainPinY = formatPixelValueToInt(mainPin.style.top) + offset;
    fillAddressInput(mainPinX, mainPinY);
  };

  return {
    calculateAndFillAddressForRoundPin: calculateAndFillAddressForRoundPin,
    calculateAndFillAddress: calculateAndFillAddress,
    enableForm: enableForm,
    disableForm: disableForm,
    resetOffersForm: resetOffersForm,
  };
})();
