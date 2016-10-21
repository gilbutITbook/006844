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
    });

    describe('원post가 실패할 경우', function() {
      beforeEach(function() {
        // 다음 차례가 되어서야 비로소 원 post가 실패하게 만든다.
       spyOn(baseWebApi,'post').and.returnValue(
        new Promise( function(resolve,reject) {
          setTimeout(function() {
            reject(underlyingFailure);
          },1);
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
            },5);
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