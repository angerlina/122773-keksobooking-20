'use strict';

window.card = (function () {
  var typesToLabels = {'flat': 'Квартира', 'bungalo': 'Бунгало', 'house': 'Дом', 'palace': 'Дворец'};
  var cardTemplate = document.querySelector('#card').content.querySelector('article');

  var createFeatures = function (features, card) {
    var featuresContainer = card.querySelector('.popup__features');
    if (features && features.length > 0) {
      Array.from(featuresContainer.children).map(function (element) {
        var featureNameInElement = element.className.replace('popup__feature popup__feature--', '');
        if (!features.some(function (feature) {
          return feature === featureNameInElement;
        })) {
          element.remove();
        }
      });
    } else {
      featuresContainer.remove();
    }
  };

  var createPhotos = function (photos, card) {
    var photosContainer = card.querySelector('.popup__photos');
    if (photos && photos.length > 0) {
      var photoTemp = photosContainer.querySelector('img');
      photoTemp.remove();
      photos.forEach(function (photo) {
        var photoElement = photoTemp.cloneNode(true);
        photoElement.src = photo;
        photosContainer.appendChild(photoElement);
      });
    } else {
      photosContainer.remove();
    }
  };

  var setDataInCardBlock = function (blockSelector, data, card) {
    var element = card.querySelector(blockSelector);
    if (data) {
      element.textContent = data;
    } else {
      element.remove();
    }
  };

  var createCardElement = function (data) {
    var card = cardTemplate.cloneNode(true);
    var offer = data.offer;
    setDataInCardBlock('.popup__title', offer.title, card);
    setDataInCardBlock('.popup__text--address', offer.address, card);
    setDataInCardBlock('.popup__text--price', offer.price + '₽/ночь', card);
    setDataInCardBlock('.popup__type', typesToLabels[offer.type], card);
    setDataInCardBlock('.popup__text--capacity',
        offer.rooms + ' комнаты для ' + offer.guests + ' гостей', card);
    setDataInCardBlock('.popup__text--time',
        'заезд после ' + offer.checkin + ' выезд до ' + offer.checkout, card);
    createFeatures(offer.features, card);
    createPhotos(offer.photos, card);
    setDataInCardBlock('.popup__description', offer.description, card);
    var avatarElement = card.querySelector('.popup__avatar');
    if (data.author && data.author.avatar) {
      avatarElement.src = data.author.avatar;
    } else {
      avatarElement.remove();
    }
    return card;
  };

  var onCloseCard = function () {
    var cardPopup = document.querySelector('.map__card.popup');
    if (cardPopup) {
      cardPopup.remove();
      var pin = document.querySelector('.map__pin--active');
      if (pin) {
        pin.classList.remove('map__pin--active');
      }
    }
  };

  var onCardPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      onCloseCard();
    }
  };

  var renderCard = function (offer) {
    onCloseCard();
    var cardElement = createCardElement(offer);
    var map = document.querySelector('.map');
    map.appendChild(cardElement);

    var closeButton = document.querySelector('.popup__close');

    closeButton.addEventListener('click', onCloseCard);
    document.addEventListener('keydown', onCardPopupEscPress);
  };

  return {
    renderCard: renderCard,
    onCloseCard: onCloseCard,
  };
})();

