'use strict';

window.filters = (function () {
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;
  var form = document.querySelector('.map__filters');
  var formControls = form.querySelectorAll('select, input');
  var initialFiltersValues = {housingPrice: '', housingType: '', housingRooms: '', housingGuests: '', features: []};
  var currentFilter = window.utils.cloneObject(initialFiltersValues);

  var resetFilters = function () {
    form.reset();
    var checkboxes = form.querySelectorAll('input');
    currentFilter = window.utils.cloneObject(initialFiltersValues);
    currentFilter.features = [];
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });
  };

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

  var onChangeFormControls = function (evt) {
    if (evt.target.type === 'checkbox') {
      checkboxChangeHandler(evt.target.value, evt.target.checked);
    } else {
      selectChangeHandler(window.utils.snakeToCamel(evt.target.name), evt.target.value);
    }
    window.offersApi.sendGetRequest(window.map.activatePage);
  };

  var addEventListenersToFilterControls = function () {
    formControls.forEach(function (element) {
      element.addEventListener('change', onChangeFormControls);
    });
  };

  var removeEventListenersFromFilterControls = function () {
    formControls.forEach(function (element) {
      element.removeEventListener('change', onChangeFormControls);
    });
  };

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
        case 'middle': testPassed = testPassed && (offer.price > MIN_PRICE) && (offer.price <= MAX_PRICE);
          break;
        case 'low': testPassed = testPassed && (offer.price <= MIN_PRICE);
          break;
        case 'high': testPassed = testPassed && (offer.price > MAX_PRICE);
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
    resetFilters: resetFilters,
    addEventListenersToFilterControls: addEventListenersToFilterControls,
    removeEventListenersFromFilterControls: removeEventListenersFromFilterControls,
  };
})();
