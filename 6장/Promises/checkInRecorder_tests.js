describe('Conference.checkInRecorder', function() {
  'use strict';

  var attendee, checkInRecorder;
  beforeEach(function() {
    attendee = Conference.attendee('일웅','이');
    attendee.setId(777);
    checkInRecorder = Conference.checkInRecorder();

    // 재스민의 모의 XMLHttpRequest 라이브러리를 설치한다.
    jasmine.Ajax.install();
  });

  afterEach(function() {
    // 다 끝난 후에는 원래 XMLHttpRequests로 돌려놓는다.
    jasmine.Ajax.uninstall();
  });

  describe('recordCheckIn(attendee)', function() {

    it('HTTP 요청이 성공하여 참가자가 체크인되면 체크인 번호로 이루어진 프라미스를 반환한다', function() {
      var expectedCheckInNumber = 1234,
          request;
      attendee.checkIn();
      checkInRecorder.recordCheckIn(attendee).then(
        function promiseResolved(actualCheckInNumber) {
          expect(actualCheckInNumber).toBe(expectedCheckInNumber);
          done();        },
        function promiseRejected() {
          expect('프라미스는 버려졌다').toBe(false);
        });
       request = jasmine.Ajax.requests.mostRecent();
       expect(request.url).toBe('/checkin/' + attendee.getId());
       request.response({
         "status": 200,
         "contentType": "text/plain",
         "responseText": expectedCheckInNumber
       });
    });

    it('HTTP 요청이 실패하여 참가자가 체크인되지 않으면 정확한 메시지와 함께 버림 프라미스를 반환한다', function() {
      var request;
      attendee.checkIn();
      checkInRecorder.recordCheckIn(attendee).then(
        function promiseResolved(actualCheckInNumber) {
          expect('프라미스는 귀결됐다').toBe(false);
        },
        function promiseRejected(reason) {
          expect(reason instanceof Error).toBe(true);
          expect(reason.message)
            .toBe(checkInRecorder.getMessages().httpFailure);
        });
       request = jasmine.Ajax.requests.mostRecent();
       expect(request.url).toBe('/checkin/' + attendee.getId());
       request.response({
         "status": 404,
         "contentType": "text/plain",
         "responseText": "이래서 에러가 났습니다."
       });
    });

    it('참가자가 체크인되지 않으면 에러와 버림 프라미스를 반환한다', function(done) {
      checkInRecorder.recordCheckIn(attendee).then(
        function promiseResolved() {
          expect('프라미스는 귀결됐다').toBe(false);
          done();
        },
        function promiseRejected(reason) {
          expect(reason instanceof Error).toBe(true);
          expect(reason.message)
            .toBe(checkInRecorder.getMessages().mustBeCheckedIn);
          done();
        });
    });
  });
});
