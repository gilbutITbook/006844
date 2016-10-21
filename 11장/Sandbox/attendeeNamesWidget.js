var Conference = Conference || {};
Conference.Widgets = Conference.Widgets || {};

Conference.Widgets.attendeeNamesWidget = function(sandbox) {
  'use strict';

  // 해당 도구를 사용할 수 없을 경우 즉시 실패 처리한다
  if (!sandbox.dom) {
    throw new Error(Conference.Widgets.messages.missingTool + 'dom');
  }
  if (!sandbox.attendeeNames) {
    throw new Error(Conference.Widgets.messages.missingTool + 'attendeeNames');
  }

  // attendeeNames를 조회하여 대시보드에 추가한다
  sandbox.attendeeNames.getAll().then(function resolved(names) {
    // sandbox.dom으로 이름 목록을 표시한다
  }, function rejected(reason) {
    // sandbox.dom으로 위젯 대신 에러 메시지를 나타낸다
  });
};

Conference.Widgets.messages = {
  missingTool: "누락된 도구: "
};