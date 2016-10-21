describe('Conference.checkInService', function() {
  'use strict';

  var checkInService,
      checkInRecorder,
      attendee;

  beforeEach(function() {
    checkInRecorder = Conference.checkInRecorder();
    checkInService = Conference.checkInService(checkInRecorder);
    attendee = Conference.attendee('형철', '서');
  });

  describe('checkInService.checkIn(attendee)', function() {

    describe('checkInRecorder 성공 시', function() {
      var checkInNumber = 1234;
      beforeEach(function() {
        spyOn(checkInRecorder,'recordCheckIn').and.returnValue(
          Promise.resolve(checkInNumber));
      });

      // 5장과 동일한 테스트
      it('참가자를 체크한 것으로 표시한다', function() {
        checkInService.checkIn(attendee);
        expect(attendee.isCheckedIn()).toBe(true);
      });
      it('체크인을 등록한다', function() {
        checkInService.checkIn(attendee);
        expect(checkInRecorder.recordCheckIn).toHaveBeenCalledWith(attendee);
      });

      // 6장에서 추가된 테스트
      it("참가자의 checkInNumber를 지정한다", function(done) {
        checkInService.checkIn(attendee).then(
          function promiseResolved() {
            expect(attendee.getCheckInNumber()).toBe(checkInNumber);
            done();
          },
          function promiseRejected() {
            expect('이 실패 분기 코드가 실행됐다').toBe(false);
            done();
          });
        });
      });

    describe('checkInRecorder 실패 시', function() {
      var recorderError = '체크인 등록 실패!';
      beforeEach(function() {
        spyOn(checkInRecorder,'recordCheckIn').and.returnValue(
          Promise.reject(new Error(recorderError)));
        spyOn(attendee,'undoCheckIn');
      });

      it("기대 사유와 함께 버림 프라미스를 반환한다", function(done) {
        checkInService.checkIn(attendee).then(
          function promiseResolved() {
            expect('이 성공 함수가 실행된다').toBe(false);
            done();
          },
          function promiseRejected(reason) {
            expect(reason.message).toBe(recorderError);
            done();
          });
      });

      it("참가자 체크인을 원상복구한다", function(done) {
        checkInService.checkIn(attendee).then(
          function promiseResolved() {
            expect('이 성공 함수가 실행된다').toBe(false);
            done();
          },
          function promiseRejected(reason) {
            expect(attendee.undoCheckIn).toHaveBeenCalled();
            done();
          });
      });
    });
  });
});


