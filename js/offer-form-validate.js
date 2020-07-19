'use strict';

(function () {
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
    if (rooms === 1 && guests !== 1) {
      guestsSelect.setCustomValidity(' 1 комната может быть только для 1 гостя');
    } else if (rooms === 2 && (guests === 3 || guests === 0)) {
      guestsSelect.setCustomValidity('2 комнаты могут быть только для 1 или 2 гостей');
    } else if (rooms === 3 && guests === 0) {
      guestsSelect.setCustomValidity('3 комнаты могут быть только для 1, 2 или 3 гостей');
    } else if (rooms === 100 && guests !== 0) {
      guestsSelect.setCustomValidity('100 комнат могут быть только "не для гостей"');
    } else {
      guestsSelect.setCustomValidity('');
    }
  };

  typeSelect.addEventListener('change', function (evt) {
    priceInput.placeholder = TypesToMinPrices[evt.target.value];
  });

  priceInput.addEventListener('invalid', function () {
    setCustomValidityForPrice();
  });

  priceInput.addEventListener('change', function () {
    setCustomValidityForPrice();
  });


  guestsSelect.addEventListener('change', function () {
    setCustomValidityForGuestsAndRooms(guestsSelect);
  });

  guestsSelect.addEventListener('invalid', function () {
    setCustomValidityForGuestsAndRooms(guestsSelect);
  });

  roomsSelect.addEventListener('change', function (evt) {
    if (evt.target.value === '100') {
      guestsSelect.value = 0;
    } else {
      guestsSelect.value = evt.target.value;
    }
  });

  checkoutSelect.addEventListener('change', function (evt) {
    checkinSelect.value = evt.target.value;
  });

  checkinSelect.addEventListener('change', function (evt) {
    checkoutSelect.value = evt.target.value;
  });
})();
