var Conference = Conference || {};

Conference.WidgetSandbox = function() {
  'use strict';

  // Conference.WidgetSandbox(...)를 "new"로 실행했는지 보장한다
  if (!(this instanceof Conference.WidgetSandbox)) {
    throw new Error(Conference.WidgetSandbox.messages.mustBeCalledWithNew);
  }

  var widgetFunction = arguments[0];

  if (typeof widgetFunction !== "function") {
    throw new Error(Conference.WidgetSandbox.messages.fcnMustBeProvided);
  }

  widgetFunction(this);
};

Conference.WidgetSandbox.messages = {
  mustBeCalledWithNew: "WidgetSandbox 함수는 반드시 new로 호출해야 합니다",
  fcnMustBeProvided: "위젯 함수는 필수 입력 항목입니다"
};