'use strict';

window.userDialogs = (function () {
  var ESCAPE_BUTTON_CODE = 'Escape';
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var onRemoveSuccessMessage = function () {
    var successMessage = document.querySelector('.success');
    if (successMessage) {
      successMessage.remove();
      successMessage.removeEventListener('click', onRemoveSuccessMessage);
      document.removeEventListener('keydown', onPressEscapeOnSuccessMessage);
    }
  };

  var onPressEscapeOnSuccessMessage = function (evt) {
    if (evt.code === ESCAPE_BUTTON_CODE) {
      onRemoveSuccessMessage();
    }
  };

  var onRemoveErrorMessage = function () {
    var errorMessage = document.querySelector('.error');
    if (errorMessage) {
      errorMessage.remove();
      errorMessage.removeEventListener('click', onRemoveErrorMessage);
      document.removeEventListener('keydown', onPressEscapeOnErrorMessage);
    }
  };

  var onPressEscapeOnErrorMessage = function (evt) {
    if (evt.code === ESCAPE_BUTTON_CODE) {
      onRemoveErrorMessage();
    }
  };

  var showSuccessSubmitMessage = function () {
    var successMessage = successMessageTemplate.cloneNode(true);
    main.appendChild(successMessage);
    successMessage.addEventListener('click', onRemoveSuccessMessage);
    document.addEventListener('keydown', onPressEscapeOnSuccessMessage);
  };

  var showErrorMessage = function () {
    var errorMessage = errorMessageTemplate.cloneNode(true);
    main.appendChild(errorMessage);
    var tryAgainButton = errorMessage.querySelector('.error__button');
    tryAgainButton.addEventListener('click', onRemoveErrorMessage);
    errorMessage.addEventListener('click', onRemoveErrorMessage);
    document.addEventListener('keydown', onPressEscapeOnErrorMessage);
  };

  return {
    showSuccessSubmitMessage: showSuccessSubmitMessage,
    showErrorMessage: showErrorMessage,
  };
})();
