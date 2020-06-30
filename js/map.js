'use strict';

window.map = (function () {

  document.querySelector('.map').classList.remove('map--faded');

  var mainPin = document.querySelector('.map__pin--main');
  var offerFormElement = document.querySelector('.ad-form');
  var filtersForm = document.querySelector('.map__filters');


  var activatePage = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.offerForm.changeFormState(offerFormElement, false);
    window.offerForm.changeFormState(filtersForm, false);
    var offers = window.data.generateOffers(window.data.OFFERS_AMOUNT);
    window.pins.renderPins(offers);
    window.offerForm.calculateAndFillAddress();
  };

  var inactivatePage = function () {
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    window.offerForm.changeFormState(offerFormElement, true);
    window.offerForm.changeFormState(filtersForm, true);
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
