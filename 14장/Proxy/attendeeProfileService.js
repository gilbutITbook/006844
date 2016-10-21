var Conference = Conference || {};
Conference.attendeeProfileService = function() {
  'use strict';
  var messages = {
    httpFailure: 'HTTP 요청 실패!'
  };
  return {
    // 참가자 프로필에 대한 프라미스를 반환한다
    getProfile: function(attendeeId) {
      return new Promise( function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange=function onreadystatechange() {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              resolve(xhr.responseText);
            } else {
              reject(new Error(messages.httpFailure));
            }
          }
        };
        xhr.open("GET","profile/" + attendeeId, true);
        xhr.send();
      });
    }
  };
};