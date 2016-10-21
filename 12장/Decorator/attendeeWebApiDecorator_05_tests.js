describe('attendeeWebApiDecorator', function() {
  'use strict';

  var decoratedWebApi,
      baseWebApi,
      attendeeA,
      attendeeB,
      underlyingFailure = '원함수 실패';

  // decoratedWebApi.getAll()를 실행하면 프라미스가 귀결되어 반환될 것이다
  // done        - 비동기 처리 시 널리 쓰이는 재스민 done() 함수다
  // expectation - 반환된 attendees에 관한 기대식을 적용할 함수
  function getAllWithSuccessExpectation(done,expectation) {
    decoratedWebApi.getAll().then(
      function onSuccess(attendees) {
        expectation(attendees);
        done();
      },
      function onFailure() {
        expect('getAll 실패').toBe(false);
        done();
      });
  }
  beforeEach(function() {
    baseWebApi = Conference.fakeAttendeeWebApi();
    decoratedWebApi = Conference.attendeeWebApiDecorator(baseWebApi);
    attendeeA = Conference.attendee('제이','이');
    attendeeB = Conference.attendee('솔이','이');
  });

  describe('post(attendee)', function() {

    describe('원post가 성공할 경우', function() {
      it('ID가 채번된 attendee로 귀결되는 프라미스를 반환한다', function(done) {
        decoratedWebApi.post(attendeeA).then(
          function onSuccess(attendee) {
            expect(attendee.getFullName()).toBe(attendeeA.getFullName());
            expect(attendee.getId()).not.toBeUndefined();
            done();
          },
          function onFailure() {
            expect('실패').toBe(false);
            done();
          });
      });
      it('getAll을 즉시 실행하면 ID가 채번되지 않은 레코드가 포함된다', function(done) {
        decoratedWebApi.post(attendeeA);
        // post가 귀결되기를 기다리지 않고 getAll을 바로 실행한다
        getAllWithSuccessExpectation(done, function onSuccess(attendees) {
          expect(attendees.length).toBe(1);
          expect(attendees[0].getId()).toBeUndefined();
        });
      });
      it('getAll을 지연시키면 ID가 채번된 레코드가 포함된다', function(done) {
        decoratedWebApi.post(attendeeA).then(function() {
          // 이번에는 post 귀결 이후 getAll을 실행한다
          getAllWithSuccessExpectation(done, function onSuccess(attendees) {
            expect(attendees.length).toBe(1);
            expect(attendees[0].getId()).not.toBeUndefined();
          });
        });
      });
      it('getAll에 이미 추가된 레코드의 ID들을 채운다', function(done) {
        var recordsFromGetAll, promiseFromPostA;
        // post를 실행하고 그 결과를 기다리지 않는다
        promiseFromPostA = decoratedWebApi.post(attendeeA);
        // getAll을 즉시 실행하고 그 결과를 포착한다
        decoratedWebApi.getAll().then(function onSuccess(attendees) {
          recordsFromGetAll = attendees;
          expect(recordsFromGetAll[0].getId()).toBeUndefined();
        });
        // 이제 post가 최종 귀결되기를 기다린다.
        // (post의 타임아웃이 getAll의 타임아웃보다 시간이 더 짧다)
        // post가 귀결하면 비로소 getAll()이 가져온 미결 레코드에서
        // attendeeId가 그 모습을 드러낼 것이다.
        promiseFromPostA.then(function() {
          expect(recordsFromGetAll[0].getId()).not.toBeUndefined();
          done();
        });
      });
    });

    describe('원post가 실패할 경우', function() {
      beforeEach(function() {
        // 다음 차례가 되어서야 비로소 원 post가 실패하게 만든다.
       spyOn(baseWebApi,'post').and.returnValue(
        new Promise( function(resolve,reject) {
          setTimeout(function() {
            reject(underlyingFailure);
          },5);
        }));
      });
      it('원사유로 인해 버려진 프라미스를 반환한다', function(done) {
        decoratedWebApi.post(attendeeA).then(
          function onSuccessfulPost() {
            expect('전송 성공').toBe(false);
            done();
          },
          function onRejectedPost(reason) {
            expect(reason).toBe(underlyingFailure);
            done();
          });
      });
    });
    describe('전송한 참가자에 대해서만 호출할 때', function() {
      it('버림 프라미스를 반환한다', function(done) {
        decoratedWebApi.post(attendeeA);
        decoratedWebApi.post(attendeeA).then(
          function onSuccess() {
            expect('전송 성공').toBe(false);
            done();
          },
          function onFailure(error) {
            expect(error instanceof Error).toBe(true);
            expect(error.message).toBe(
              decoratedWebApi.getMessages().postPending);
            done();
          });
      });
    });
  });

  describe('getAll()', function() {

    describe('원getAll이 성공할 경우', function() {
      it('미결 상태인 레코드가 하나도 없다면 처리된 전체 레코드에 대한 프라미스를 반환한다', function(done) {
        spyOn(baseWebApi,'getAll').and.returnValue(
          new Promise( function(resolve,reject) {
            setTimeout(function() {
              resolve([attendeeA,attendeeB]);
            },1);
          }));
        getAllWithSuccessExpectation(done,function onSuccess(attendees) {
          expect(attendees.length).toBe(2);
        });
      });
      it('처리된 전체 레코드 + 미결 상태인 전체 레코드를 반환한다', function(done) {
        decoratedWebApi.post(attendeeA).then(function() {
          decoratedWebApi.post(attendeeB); // 놔둔다.
          getAllWithSuccessExpectation(done,function onSuccess(attendees) {
            expect(attendees.length).toBe(2);
            expect(attendees[0].getId()).not.toBeUndefined();
            expect(attendees[1].getId()).toBeUndefined();
          });
        });
      });
    });

    describe('원getAll이 실패할 경우', function() {
      it('원버림 프라미스를 반환한다', function(done) {
        spyOn(baseWebApi,'getAll').and.returnValue(
          new Promise( function(resolve,reject) {
            setTimeout(function() {
              reject(underlyingFailure);
            },1);
          }));
        decoratedWebApi.getAll().then(
          function onSuccess() {
            expect('원getAll 함수 성공').toBe(false);
            done();
          },
          function onFailure(reason) {
            expect(reason).toBe(underlyingFailure);
            done();
          });
      });
    });
  });
});