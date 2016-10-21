describe("Conference.clickCountDisplay", function() {
  'use strict';

  var display,
      displayElement,
      clickElement;

  beforeEach(function() {
    // DOM 요소를 정의하는 문자열에서 제이쿼리 요소를 만든 다음,
    displayElement = $("<span></span>");
    // body에 붙인다.
    $('body').append(displayElement);

    // click 버튼을 만들어 body에 붙인다.
    clickElement = $("<button></button>");
    $('body').append(clickElement);

    var options = {
      updateElement : displayElement,
      triggerElement : clickElement
    };

    display = Conference.clickCountDisplay(options);
  });

  afterEach(function() {
    displayElement.remove();
    clickElement.remove();
  });

  it("클릭 횟수를 0으로 초기화한다", function() {
    expect(display.getClickCount()).toEqual(0);
  });

  it("클릭 이벤트가 발생하면 incrementCountAndUpdateDisplay를 실행한다", function() {
    spyOn(display, "incrementCountAndUpdateDisplay");
    clickElement.trigger('click');
    expect(display.incrementCountAndUpdateDisplay).toHaveBeenCalled();
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

    it("updateElement의 텍스트를 세팅한다", function() {
      display.incrementCountAndUpdateDisplay();
      expect(displayElement).toHaveText(display.getClickCount());
      display.incrementCountAndUpdateDisplay();
      expect(displayElement).toHaveText(display.getClickCount());
    });
  });

  describe("updateCountDisplay()", function() {
    it("횟수를 한번도 늘린 적 없으면 0이 표시된다", function() {
      expect(displayElement).toHaveText("");
      display.updateCountDisplay();
      expect(displayElement).toHaveText("0");
    });
  });
});