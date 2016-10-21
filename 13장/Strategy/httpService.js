var Conference = Conference || {};

Conference.httpService = function() {
  'use strict';

  return {
    post : function post(url, data) {
      // data를 url로 전송한 뒤, 처리가 완료되면 귀결되는
      // 프라미스를 반환한다
    }
  };
};