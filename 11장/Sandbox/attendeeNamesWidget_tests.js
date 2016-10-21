describe("Conference.Widgets.attendeeNamesWidget(sandbox)", function() {
  'use strict';

  var sandbox;
  beforeEach(function() {
    sandbox = {};
  });

  it("dom 도구를 사용할 수 없는 경우 에러를 던진다", function() {
    expect(function shouldThrow() {
      Conference.Widgets.attendeeNamesWidget(sandbox);
    }).toThrowError(Conference.Widgets.messages.missingTool + 'dom');
  });

  it("attendeeNames 도구를 사용할 수 없는 경우 에러를 던진다", function() {
    expect(function shouldThrow() {
      sandbox.dom = {};
      Conference.Widgets.attendeeNamesWidget(sandbox);
    }).toThrowError(Conference.Widgets.messages.missingTool + 'attendeeNames');
  });

  // attendeeNamesWidget이 제대로 작동하는지 확인하는 다른 테스트...
});