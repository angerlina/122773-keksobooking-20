'use strict';

window.map = (function () {

  document.querySelector('.map').classList.remove('map--faded');

  var mainPin = document.querySelector('.map__pin--main');
  var offerFormElement = document.querySelector('.ad-form');
  var filtersFormElement = document.querySelector('.map__filters');


  var activatePage = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.offerForm.enableForm(offerFormElement, false);
    window.offerForm.enableForm(filtersFormElement, false);
    var offers = window.data.generateOffers(8);
    window.pins.renderPins(offers);
    window.offerForm.calculateAndFillAddress();
  };

  var inactivatePage = function () {
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    window.offerForm.disableForm(offerFormElement);
    window.offerForm.disableForm(filtersFormElement);
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
  return {
    inactivatePage: inactivatePage,
  };
})();
