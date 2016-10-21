var Conference = Conference || {};

Conference.recentRegistrationsService = function(registrationsService) {
  'use strict';

    var registeredObservers = [],
        service = {
          // 관찰자를 관찰자 목록에 추가해서
          // 새 참가자가 등록하면 알림을 받는다.
          addObserver: function addObserver(observer) {
            return registeredObservers.push(observer);
          },

          // 관찰자 목록에서 관찰자를 삭제한다. (목록에 있을 경우)
          removeObserver: function removeObserver(observer) {
            var index = registeredObservers.indexOf(observer);
            if (index >= 0) {
              registeredObservers.splice(index, 1);
            }
          },

          // 관찰자를 모두 삭제한다.
          clearObservers: function clearObservers() {
            registeredObservers = [];
          },

          // 주어진 관찰자가 등록되어 있으면 true를,
          // 그렇지 않으면 false를 반환한다.
          hasObserver: function hasObserver(observer) {
            return registeredObservers.indexOf(observer) >= 0;
          },

          // 새로 등록한 참가자, newAttendee를 인자로
          // 등록된 관찰자들이 각자 제공한 update 메소드를 실행한다
          updateObservers: function updateObservers(newAttendee) {
            registeredObservers.forEach(function executeObserver(observer) {
              observer.update(newAttendee);
            });
          },

          // 폴링을 멈춘다.
          // 한번 폴링이 멈춘 다음에는 다시 시작하지 않는다.
          stopPolling : function() {
            if (pollingProcess) {
              clearInterval(pollingProcess);
              pollingProcess = false;
            }
          }
        },

        getNewAttendees = function getNewAttendees() {
        // 서버를 호출해서 최종 조회 시점 이후로 등록한 참가자를 조회하여
        // 참가자 배열의 프라미스를 반환한다.
          return new Promise(function(resolve, reject) {
            // 서버와 통신하는 코드는 줄임
            resolve([]);
          });
        },
        pollingProcess = setInterval(function pollForNewAttendees() {
          getNewAttendees().then(function processNewAttendees(newAttendees) {
            newAttendees.forEach(function updateWithNewAttendee(newAttendee) {
              service.updateObservers(newAttendee);
            });
          });
        }, 15000);

      return service;
};