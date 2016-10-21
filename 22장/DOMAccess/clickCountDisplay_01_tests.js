describe("Conference.clickCountDisplay", function() {
  'use strict';

  var display;

  beforeEach(function() {
    display = Conference.clickCountDisplay();
  });

  it("클릭 횟수를 0으로 초기화한다", function() {
    expect(display.getClickCount()).toEqual(0);
  });

  describe("incrementCountAndUpdateDisplay()", function() {
    it("클릭 횟수를 늘린다", function() {
      var initialCount = display.getClickCount();
      display.incrementCountAndUpdateDisplay();
      expect(display.getClickCount()).toEqual(initialCount + 1);
    });

    it("updateCountDisplay 함수를 실행한다", function() {
      spyOn(display, "updateCountDisplay");
      display.incrementCountAndUpdateDisplay();
      expect(display.updateCountDisplay).toHaveBeenCalled();
    });
  });
});