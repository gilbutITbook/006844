describe('attendeeWebApiDecorator', function() {
  'use strict';

  var decoratedWebApi,
      baseWebApi,
      attendeeA,
      underlyingFailure = '원함수 실패';

  beforeEach(function() {
    baseWebApi = Conference.fakeAttendeeWebApi();
    decoratedWebApi = Conference.attendeeWebApiDecorator(baseWebApi);
    attendeeA = Conference.attendee('제이','이');
  });

  describe('post(attendee)', function() {

    describe('원getAll이 실패할 경우', function() {
      beforeEach(function() {
        // 다음 차례가 되어서야 비로소 원post가 실패하게 만든다.
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