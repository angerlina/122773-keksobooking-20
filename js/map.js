'use strict';

window.map = (function () {

  var MAIN_PIN_TOP = '375px';
  var MAIN_PIN_LEFT = '570px';
  document.querySelector('.map').classList.remove('map--faded');

  var mainPin = document.querySelector('.map__pin--main');
  var offerFormElement = document.querySelector('.ad-form');
  var filtersFormElement = document.querySelector('.map__filters');

  var resetMainPin = function () {
    mainPin.style.top = MAIN_PIN_TOP;
    mainPin.style.left = MAIN_PIN_LEFT;
  };

  var activatePage = function (offers) {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.offerForm.enableForm(offerFormElement);
    window.offerFormValidate.addEventListenersToOffersForm();
    window.offerForm.enableForm(filtersFormElement);
    window.offerForm.addSubmitHandlerToOffersForm();
    window.filters.addEventListenersToFilterControls();
    window.pins.renderPins(offers);
    window.offerForm.calculateAndFillAddress();
    window.offerForm.addEventListenerToClearButton();
  };

  var inactivatePage = function () {
    resetMainPin();
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    window.offerForm.resetOffersForm();
    window.filters.resetFilters();
    window.offerForm.calculateAndFillAddressForRoundPin();
    window.offerForm.disableForm(offerFormElement);
    window.offerFormValidate.removeEventListenersFromOffersForm();
    window.offerForm.removeSubmitHandlerFromOffersForm();
    window.offerForm.disableForm(filtersFormElement);
    window.filters.removeEventListenersFromFilterControls();
    window.pins.removePins();
    window.offerForm.removeEventListenerFromClearButton();
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
