'use strict';

window.offerFormValidate = (function () {
  var ONE_GUEST = 1;
  var TWO_ROOMS = 2;
  var THREE_GUESTS = 3;
  var ZERO_GUESTS = 0;
  var THREE_ROOMS = 3;
  var HUNDRED_ROOMS = 100;

  var offerForm = document.querySelector('.ad-form');
  var roomsSelect = offerForm.querySelector('#room_number');
  var guestsSelect = offerForm.querySelector('#capacity');
  var priceInput = offerForm.querySelector('#price');
  var typeSelect = offerForm.querySelector('#type');
  var checkoutSelect = offerForm.querySelector('#timeout');
  var checkinSelect = offerForm.querySelector('#timein');

  var TypesToMinPrices = {'bungalo': 0, 'flat': 1000, 'house': 5000, 'palace': 10000};

  var setCustomValidityForPrice = function () {
    var price = priceInput.value;
    var type = typeSelect.value;
    if (price < TypesToMinPrices[type]) {
      priceInput.setCustomValidity('Цена для данного типа жилья может быть не меньше ' + TypesToMinPrices[type] + '₽/ночь');
    } else {
      priceInput.setCustomValidity('');
    }
  };

  var setCustomValidityForGuestsAndRooms = function () {
    var rooms = +roomsSelect.value;
    var guests = +guestsSelect.value;
    if (rooms === ONE_GUEST && guests !== ONE_GUEST) {
      guestsSelect.setCustomValidity(' 1 комната может быть только для 1 гостя');
    } else if (rooms === TWO_ROOMS && (guests === THREE_GUESTS || guests === ZERO_GUESTS)) {
      guestsSelect.setCustomValidity('2 комнаты могут быть только для 1 или 2 гостей');
    } else if (rooms === THREE_ROOMS && guests === ZERO_GUESTS) {
      guestsSelect.setCustomValidity('3 комнаты могут быть только для 1, 2 или 3 гостей');
    } else if (rooms === HUNDRED_ROOMS && guests !== ZERO_GUESTS) {
      guestsSelect.setCustomValidity('100 комнат могут быть только "не для гостей"');
    } else {
      guestsSelect.setCustomValidity('');
    }
  };

  var onChangeTypeSelect = function (evt) {
    priceInput.placeholder = TypesToMinPrices[evt.target.value];
  };

  var onChangeRoomsSelect = function (evt) {
    if (evt.target.value === '100') {
      guestsSelect.value = 0;
    } else {
      guestsSelect.value = evt.target.value;
    }
  };

  var onChangeCheckoutSelect = function (evt) {
    checkinSelect.value = evt.target.value;
  };

  var onChangeCheckinSelect = function (evt) {
    checkoutSelect.value = evt.target.value;
  };

  var addEventListenersToOffersForm = function () {
    typeSelect.addEventListener('change', onChangeTypeSelect);
    priceInput.addEventListener('invalid', setCustomValidityForPrice);
    priceInput.addEventListener('change', setCustomValidityForPrice);
    guestsSelect.addEventListener('change', setCustomValidityForGuestsAndRooms);
    guestsSelect.addEventListener('invalid', setCustomValidityForGuestsAndRooms);
    roomsSelect.addEventListener('change', onChangeRoomsSelect);
    checkoutSelect.addEventListener('change', onChangeCheckoutSelect);
    checkinSelect.addEventListener('change', onChangeCheckinSelect);
  };

  var removeEventListenersFromOffersForm = function () {
    typeSelect.removeEventListener('change', onChangeTypeSelect);
    priceInput.removeEventListener('invalid', setCustomValidityForPrice);
    priceInput.removeEventListener('change', setCustomValidityForPrice);
    guestsSelect.removeEventListener('change', setCustomValidityForGuestsAndRooms);
    guestsSelect.removeEventListener('invalid', setCustomValidityForGuestsAndRooms);
    roomsSelect.removeEventListener('change', onChangeRoomsSelect);
    checkoutSelect.removeEventListener('change', onChangeCheckoutSelect);
    checkinSelect.removeEventListener('change', onChangeCheckinSelect);
  };

  return {
    addEventListenersToOffersForm: addEventListenersToOffersForm,
    removeEventListenersFromOffersForm: removeEventListenersFromOffersForm,
  };

})();
