describe('attendeeWebApiDecorator', function() {
  'use strict';

  var decoratedWebApi,
      baseWebApi,
      underlyingFailure = '원함수 실패';

  beforeEach(function() {
    baseWebApi = Conference.fakeAttendeeWebApi();
    decoratedWebApi = Conference.attendeeWebApiDecorator(baseWebApi);
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