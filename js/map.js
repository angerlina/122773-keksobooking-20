'use strict';

window.map = (function () {

  document.querySelector('.map').classList.remove('map--faded');

  var mainPin = document.querySelector('.map__pin--main');
  var offerFormElement = document.querySelector('.ad-form');
  var filtersFormElement = document.querySelector('.map__filters');

  var resetMainPin = function () {
    mainPin.style.top = '375px';
    mainPin.style.left = '570px';
  };

  var activatePage = function (offers) {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.offerForm.enableForm(offerFormElement);
    window.offerForm.enableForm(filtersFormElement);
    window.pins.renderPins(offers);
    window.offerForm.calculateAndFillAddress();
  };

  var inactivatePage = function () {
    resetMainPin();
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    window.offerForm.resetOffersForm();
    window.filters.resetFilters();
    window.offerForm.calculateAndFillAddressForRoundPin();
    window.offerForm.disableForm(offerFormElement);
    window.offerForm.disableForm(filtersFormElement);
    window.pins.removePins();
  };

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.code === 'Enter') {
      window.offersApi.sendGetRequest(activatePage);
    }
  });

  return {
    inactivatePage: inactivatePage,
    activatePage: activatePage,
  };
})();
