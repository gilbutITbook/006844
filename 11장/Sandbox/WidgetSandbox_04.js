var Conference = Conference || {};

Conference.WidgetSandbox = function() {
  'use strict';

  // Conference.WidgetSandbox(...)를 "new"로 실행했는지 보장한다
  if (!(this instanceof Conference.WidgetSandbox)) {
    throw new Error(Conference.WidgetSandbox.messages.mustBeCalledWithNew);
  }

  var widgetFunction,
      toolsToLoad = [],
      argsArray;

  // arguments에서 *진짜* 배열을 추출한다
  argsArray = Array.prototype.slice.call(arguments);

  // 배열 마지막 원소는 widgetFunction일 것이다. 뽑아낸다.
  widgetFunction = argsArray.pop();

  if (typeof widgetFunction !== "function") {
    throw new Error(Conference.WidgetSandbox.messages.fcnMustBeProvided);
  }

  toolsToLoad = (argsArray[0] instanceof Array)?
    argsArray[0] :
    argsArray;

  toolsToLoad.forEach(function loadTool(toolName) {
    if (!Conference.WidgetTools.hasOwnProperty(toolName)) {
      throw new Error(Conference.WidgetSandbox.messages.unknownTool + toolName);
    }

    Conference.WidgetTools[toolName](this);
  }, this); // 콜백 내에서 'this'가 sandbox 인스턴스를 가리키도록 보장한다

  var widget = widgetFunction(this);
};

// 빈 도구 명칭공간을 생성한다
Conference.WidgetTools = {};

Conference.WidgetSandbox.messages = {
  mustBeCalledWithNew: "WidgetSandbox 함수는 반드시 new로 호출해야 합니다",
  fcnMustBeProvided: "위젯 함수는 필수 입력 항목입니다",
  unknownTool: "알 수 없는 도구입니다"
};