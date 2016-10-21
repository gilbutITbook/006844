var Conference = Conference || {};
Conference.clickCountDisplay = function(options) {
  'use strict';

  var clickCount = 0;

  // 실제 제품 코드에서는 options가 정의되었는지,
  // 그리고 그 프로퍼티 타입이 올바른지 확인해야 한다.

  var clickCounter = {
    getClickCount: function getClickCount() {
      return clickCount;
    },

    updateCountDisplay: function updateCountDisplay() {
      options.updateElement.text(clickCount);
    },

    incrementCountAndUpdateDisplay: function incrementCountAndUpdateDisplay() {
      clickCount++;
      this.updateCountDisplay();
    }
  };

  options.triggerElement.on('click', function clickBinder() {
    clickCounter.incrementCountAndUpdateDisplay();
  });

  return clickCounter;
};