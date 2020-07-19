'use strict';

window.userDialogs = (function () {

  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var removeSuccessMessageHandler = function () {
    var successMessage = document.querySelector('.success');
    if (successMessage) {
      successMessage.remove();
      document.removeEventListener('click', removeSuccessMessageHandler);
      document.removeEventListener('keydown', removeSuccessMessageHandler);
    }
  };

  var removeErrorMessageHandler = function () {
    var errorMessage = document.querySelector('.error');
    if (errorMessage) {
      errorMessage.remove();
      document.removeEventListener('click', removeErrorMessageHandler);
      document.removeEventListener('keydown', removeErrorMessageHandler);
    }
  };

  document.addEventListener('click', removeSuccessMessageHandler);
  document.addEventListener('keydown', function (evt) {
    if (evt.code === 'Escape') {
      removeSuccessMessageHandler();
    }
  });

  document.addEventListener('click', removeErrorMessageHandler);
  document.addEventListener('keydown', function (evt) {
    if (evt.code === 'Escape') {
      removeErrorMessageHandler();
    }
  });
  var showSuccessSubmitMessage = function () {
    var successMessage = successMessageTemplate.cloneNode(true);
    main.appendChild(successMessage);
  };

  var showErrorMessage = function () {
    var errorMessage = errorMessageTemplate.cloneNode(true);
    main.appendChild(errorMessage);
    var tryAgainButton = errorMessage.querySelector('.error__button');
    tryAgainButton.addEventListener('click', removeErrorMessageHandler);
  };

  return {
    showSuccessSubmitMessage: showSuccessSubmitMessage,
    showErrorMessage: showErrorMessage,
  };
})();
