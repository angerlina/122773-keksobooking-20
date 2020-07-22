'use strict';

window.filters = (function () {
  var form = document.querySelector('.map__filters');
  var formControls = form.querySelectorAll('select, input');

  var currentFilter = {housingPrice: '', housingType: '', housingRooms: '', housingGuests: '', features: []};

  var selectChangeHandler = function (field, value) {
    if (value === 'any') {
      currentFilter[field] = '';
    } else {
      currentFilter[field] = value;
    }
    window.offersApi.sendGetRequest(window.map.activatePage);
  };

  var checkboxChangeHandler = function (name, checked) {
    if (checked) {
      currentFilter.features.push(name);
    } else {
      var index = currentFilter.features.indexOf(name);
      if (index !== -1) {
        currentFilter.features.splice(index, 1);
      }
    }
    window.offersApi.sendGetRequest(window.map.activatePage);
  };


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
    var itemIsOk = true;
    if (currentFilter.housingType) {
      itemIsOk = itemIsOk && (currentFilter.housingType === offer.type);
    }
    if (currentFilter.housingRooms) {
      itemIsOk = itemIsOk && (+currentFilter.housingRooms === offer.rooms);
    }
    if (currentFilter.housingGuests) {
      itemIsOk = itemIsOk && (+currentFilter.housingGuests === offer.guests);
    }
    if (currentFilter.housingPrice) {
      switch (currentFilter.housingPrice) {
        case 'middle': itemIsOk = itemIsOk && (offer.price > 10000) && (offer.price <= 50000);
          break;
        case 'low': itemIsOk = itemIsOk && (offer.price <= 10000);
          break;
        case 'high': itemIsOk = itemIsOk && (offer.price > 50000);
          break;
      }
    }
    if (currentFilter.features.length > 0) {
      if (offer.features && offer.features.length > 0) {
        currentFilter.features.forEach(function (featureInFilter) {

          itemIsOk = itemIsOk && offer.features.some(function (feature) {
            return feature === featureInFilter;
          });

        });
      } else {
        itemIsOk = false;
      }
    }
    return itemIsOk;
  };
  return {
    filterCallback: filterCallback,
  };
})();
