var Conference = Conference || {};
Conference.clickCountDisplay = function() {
  'use strict';

  var clickCount = 0;

  return {
    getClickCount: function getClickCount() {
      return clickCount;
    },

    updateCountDisplay: function updateCountDisplay() {

    },

    incrementCountAndUpdateDisplay: function incrementCountAndUpdateDisplay() {
      clickCount++;
      this.updateCountDisplay();
    }
  };
};