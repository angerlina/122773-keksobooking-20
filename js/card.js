'use strict';

window.card = (function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('article');
  var card = cardTemplate.cloneNode(true);

  var createFeatures = function (features) {
    var featuresContainer = card.querySelector('.popup__features');
    var tempFeatures = Array.from(featuresContainer.children);
    if (features) {
      tempFeatures.forEach(function (featureElement) {
        features.forEach(function (feature) {
          if (featureElement.className.indexOf(feature) < 0) {
            featureElement.remove();
          }
        });
      });
    } else {
      featuresContainer.remove();
    }
  };

  var createPhotos = function (photos) {
    var photosContainer = card.querySelector('.popup__photos');
    if (photos) {
      var photoTemp = photosContainer.querySelector('img');
      photosContainer.innerHTML = '';
      photos.forEach(function (photo) {
        var photoElement = photoTemp.cloneNode(false);
        photoElement.src = photo;
        photosContainer.appendChild(photoElement);
      });
    } else {
      photosContainer.remove();
    }
  };

  var setDataInCardBlock = function (blockSelector, data) {
    var element = card.querySelector(blockSelector);
    if (data) {
      element.textContent = data;
    } else {
      element.remove();
    }
  };

  var createCardElement = function (data) {
    var offer = data.offer;
    setDataInCardBlock('.popup__title', offer.title);
    setDataInCardBlock('.popup__text--address', offer.address);
    setDataInCardBlock('.popup__text--price', offer.price + '₽/ночь');
    setDataInCardBlock('.popup__type', offer.type);
    setDataInCardBlock('.popup__text--capacity',
        offer.rooms + ' комнаты для ' + offer.guests + ' гостей');
    setDataInCardBlock('.popup__text--time',
        'заезд после ' + offer.checkin + ' выезд до ' + offer.checkout);
    createFeatures(offer.features);
    createPhotos(offer.photos);
    setDataInCardBlock('.popup__description', offer.description);

    var avatarElement = card.querySelector('.popup__avatar');
    if (offer.author && offer.author.avatar) {
      var avatarImg = avatarElement.querySelector('img');
      avatarImg.src = offer.author.avatar;
    } else {
      avatarElement.remove();
    }

    return card;
  };

  var renderCard = function (offer) {
    var cardElement = createCardElement(offer);
    var map = document.querySelector('.map');
    map.appendChild(cardElement);
  };

  return {
    renderCard: renderCard,
  };
})();

