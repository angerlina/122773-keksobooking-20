'use strict';

(function () {
  var offerForm = document.querySelector('.ad-form');
  var roomsSelect = offerForm.querySelector('#room_number');
  var guestsSelect = offerForm.querySelector('#capacity');

  guestsSelect.addEventListener('change', function () {
    setCustomValidityForGuestsAndRooms(guestsSelect);
  });

  roomsSelect.addEventListener('change', function () {
    setCustomValidityForGuestsAndRooms(roomsSelect);
  });


  guestsSelect.addEventListener('invalid', function () {
    setCustomValidityForGuestsAndRooms(guestsSelect);
  });


  var setCustomValidityForGuestsAndRooms = function (inputElement) {
    var rooms = parseInt(roomsSelect.value, 10);
    var guests = parseInt(guestsSelect.value, 10);
    if (rooms === 1 && guests !== 1) {
      inputElement.setCustomValidity(' 1 комната может быть только для 1 гостя');
    } else if (rooms === 2 && (guests === 3 || guests === 0)) {
      inputElement.setCustomValidity('2 комнаты могут быть только для 1 или 2 гостей');
    } else if (rooms === 3 && guests === 0) {
      inputElement.setCustomValidity('3 комнаты могут быть только для 1, 2 или 3 гостей');
    } else if (rooms === 100 && guests !== 0) {
      inputElement.setCustomValidity('100 комнат могут быть только "не для гостей"');
    } else {
      inputElement.setCustomValidity('');
    }

  };
})();
