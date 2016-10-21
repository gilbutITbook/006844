describe('fakeAttendeeWebApi', function() {
  'use strict';

  var webApi,
      attendeeA,
      attendeeB;
  beforeEach(function() {
    webApi = Conference.fakeAttendeeWebApi();
    attendeeA = Conference.attendee('제이','이');
    attendeeB = Conference.attendee('솔이','이');
  });
  describe('post(attendee)', function() {
    it('성공 시 ID가 채번된 attendee로 귀결된다', function(done/*6장 참고*/) {
      webApi.post(attendeeA).then(
        function promiseResolved(attendee) {
          expect(attendee.getId()).not.toBeUndefined();
          done();
        },
        function promiseRejected() {
          expect('프라미스 버림').toBe(false);
          done();
        });
    });
  });

  describe('getAll()', function () {
    it('전송한 attendees 프라미스가 모두 귀결되기를 기다린다면 해당 귀결 프라미스를 반환한다', function (done) {
      webApi.post(attendeeA)
      .then(function() {
        return webApi.post(attendeeB);
      })
      .then(function() {
        return webApi.getAll();
      })
      .then(
        function promiseResolved(attendees) {
          expect(attendees[0].getFullName()).toEqual(attendeeA.getFullName());
          expect(attendees[1].getFullName()).toEqual(attendeeB.getFullName());
          done();
        },
        function promiseRejected() {
          expect('프라미스 버림').toBe(false);
          done();
        });
    });
    it('post가 귀결되지 않은 attendees는 포함하지 않는다', function(done) {
      webApi.post(attendeeA);
      webApi.post(attendeeB);
      webApi.getAll().then(
        function promiseResolved(attendees) {
          expect(attendees.length).toBe(0);
          done();
        },
        function promiseRejected() {
          expect('프라미스 버림').toBe(false);
          done();
        });
    });
  });
});