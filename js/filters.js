'use strict';

window.filters = (function () {
  var form = document.querySelector('.map__filters');
  var formControls = form.querySelectorAll('select, input');

  var currentFilter = {housingPrice: '', housingType: '', housingRooms: '', housingGuests: '', features: []};

  var selectChangeHandler = window.debounce.makeDebounce(function (field, value) {
    if (value === 'any') {
      currentFilter[field] = '';
    } else {
      currentFilter[field] = value;
    }
    window.offersApi.sendGetRequest(window.map.activatePage);
  });

  var checkboxChangeHandler = window.debounce.makeDebounce(function (name, checked) {
    if (checked) {
      currentFilter.features.push(name);
    } else {
      var index = currentFilter.features.indexOf(name);
      if (index !== -1) {
        currentFilter.features.splice(index, 1);
      }
    }
    window.offersApi.sendGetRequest(window.map.activatePage);
  });


  formControls.forEach(function (element) {
    element.addEventListener('change', function (evt) {
      if (evt.target.type === 'checkbox') {
        checkboxChangeHandler(evt.target.value, evt.target.checked);
      } else {
        selectChangeHandler(window.utils.snakeToCamel(evt.target.name), evt.target.value);
      }
      window.offersApi.sendGetRequest(window.map.activatePage);
    });
  });


  var filterCallback = function (item) {
    var offer = item.offer;
    var testPassed = true;
    if (currentFilter.housingType) {
      testPassed = testPassed && (currentFilter.housingType === offer.type);
    }
    if (currentFilter.housingRooms) {
      testPassed = testPassed && (+currentFilter.housingRooms === offer.rooms);
    }
    if (currentFilter.housingGuests) {
      testPassed = testPassed && (+currentFilter.housingGuests === offer.guests);
    }
    if (currentFilter.housingPrice) {
      switch (currentFilter.housingPrice) {
        case 'middle': testPassed = testPassed && (offer.price > 10000) && (offer.price <= 50000);
          break;
        case 'low': testPassed = testPassed && (offer.price <= 10000);
          break;
        case 'high': testPassed = testPassed && (offer.price > 50000);
          break;
      }
    }
    if (currentFilter.features.length > 0) {
      if (offer.features && offer.features.length > 0) {
        currentFilter.features.forEach(function (featureInFilter) {

          testPassed = testPassed && offer.features.some(function (feature) {
            return feature === featureInFilter;
          });

        });
      } else {
        testPassed = false;
      }
    }
    return testPassed;
  };
  return {
    filterCallback: filterCallback,
  };
})();
