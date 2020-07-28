'use strict';
(function () {
  var MIN_Y = 130;
  var MAX_Y = 630;
  var mapElement = document.querySelector('.map');
  var mainPin = mapElement.querySelector('.map__pin');
  var halfOfPinWidth = mainPin.clientWidth / 2;
  var min = {x: 0 - halfOfPinWidth, y: MIN_Y};
  var max = {x: mapElement.clientWidth, y: MAX_Y};

  var getPinsAndActivatePage = function () {
    window.offersApi.sendGetRequest(window.map.activatePage);
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newY = mainPin.offsetTop - shift.y;
      var newX = mainPin.offsetLeft - shift.x;

      if (newX > max.x - halfOfPinWidth) {
        newX = max.x - halfOfPinWidth;
      }
      if (newX < min.x) {
        newX = min.x;
      }
      if (newY > max.y - mainPin.clientHeight) {
        newY = max.y - mainPin.clientHeight;
      }
      if (newY < min.y) {
        newY = min.y;
      }

      mainPin.style.top = newY + 'px';
      mainPin.style.left = newX + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }
      getPinsAndActivatePage();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

})();
