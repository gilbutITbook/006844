var Conference = Conference || {};
Conference.attendeeWebApiDecorator = function(baseWebApi) {
  'use strict';

  var self = this,

      // post 함수에 전달할 레코드들
      // 호출 결과는 아직 귀결되지 않은 상태다
      pendingPosts = [],

      messages = {
        postPending: '이 참가자에 대한 처리가 진행 중인 것 같습니다.'
      };

  // attendee에 해당하는 'posts' 원소를 반환하거나
  // 그런 원소가 없을 경우 -1을 반환한다
  function indexOfPostForSameAttendee(posts,attendee) {
    var ix;
    for (ix=0; ix<posts.length; ++ix) {
      if (posts[ix].isSamePersonAs(attendee)) {
        return ix;
      }
    }
    return -1;
  }

  return {

    post: function post(attendee) {
      if (indexOfPostForSameAttendee(pendingPosts, attendee) >=0 ) {
        return Promise.reject(new Error(messages.postPending));
      }

      pendingPosts.push(attendee);

      return baseWebApi.post(attendee).then(
        function onPostSucceeded(attendeeWithId) {
          // post가 ID를 채번한 attendee를 반환할 때 pendingPosts에 ID를 넣는다.
          // getAll 결과에 이미 레코드가 추가되었다면 ID를 세팅한 다음 받는 편이 더 좋기 때문이다.
          var ix = pendingPosts.indexOf(attendee);
          if (ix >= 0) {
              pendingPosts[ix].setId(attendeeWithId.getId());
              pendingPosts.splice(ix, 1);
          }
          return attendeeWithId;
        });
    },

    getAll: function getAll() {
      return baseWebApi.getAll().then(function(records) {
        pendingPosts.forEach(function(pending) {
          var ix = indexOfPostForSameAttendee(records,pending);
          if (ix<0) {
            records.push(pending);
          }
        });
        return records;
      });
    },

    getMessages: function getMessages() {
      return messages;
    }
  };
};