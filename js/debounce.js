'use strict';
window.debounce = (function () {
  var DEBOUNCE_INTERVAL = 300; // ms

  var makeDebounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
  return {
    makeDebounce: makeDebounce,
  };
})();
