describe("Conference.outgoingLinkClickHandler", function() {
  'use strict';

  var clickRecorder,
      clickHandler;

  beforeEach(function() {
    clickRecorder = Conference.outgoingLinkClickRecorder();
    spyOn(clickRecorder, "recordClick");

    clickHandler = Conference.outgoingLinkClickHandler(clickRecorder);
  });

  describe("handleClick()", function() {
    it("자신(handleClick)을 포함한 객체를 통해 실행되면 클릭을 기록한다", function() {
      clickHandler.handleClick();
      expect(clickRecorder.recordClick).toHaveBeenCalled();
    });
  });
});