describe("Conference.WidgetTools.attendeeNames", function() {
  'use strict';

  var attendeeWebApi,
      sandbox;

  beforeEach(function() {
    attendeeWebApi = Conference.attendeeWebApi();

    // post 메소드는 호출되면 안 된다.
    // 그래도 혹시 모르니 스파이를 심어두어 확인한다.
    spyOn(attendeeWebApi, 'post');

    // attendeeNames를 단위 테스트하기 위해 sandbox는 빈 객체로 지정한다
    sandbox = {};
  });

  afterEach(function() {
    // 테스트할 때마다 post가 호출되지 않았는지 확인한다
    expect(attendeeWebApi.post).not.toHaveBeenCalled();
  });

  it("주어진 sandbox 객체에 자신을 추가한다", function() {
    Conference.WidgetTools.attendeeNames(sandbox, attendeeWebApi);
    expect(sandbox.attendeeNames).not.toBeUndefined();
  });

  describe("attendeeNames.getAll()", function() {
    var attendees,
        attendeeNames;

    beforeEach(function() {
        Conference.WidgetTools.attendeeNames(sandbox, attendeeWebApi);

        // 테스트 참가자 배열을 채워넣는다
        attendees = [
          Conference.attendee("태희", "김"),
          Conference.attendee("윤지", "김"),
          Conference.attendee("정윤", "최")
        ];

        // 테스트 참가자 배열에서 이름을 추출한다
        attendeeNames = [];
        attendees.forEach(function getNames(attendee) {
          attendeeNames.push(attendee.getFullName());
        });
    });

    it("참가자가 없을 경우 빈 배열로 귀결한다", function(done) {

      spyOn(attendeeWebApi, 'getAll').and.returnValue(
        new Promise( function(resolve, reject) {
          resolve([]);
        })
      );

      sandbox.attendeeNames.getAll().then(function resolved(names) {
        expect(names).toEqual([]);
        done();
      }, function rejected(reason) {
        expect('실패함').toBe(false);
        done();
      });

    });

    it("참가자가 있을 경우 해당 이름으로 귀결한다", function(done) {

      spyOn(attendeeWebApi, 'getAll').and.returnValue(
        new Promise( function(resolve, reject) {
          resolve(attendees);
        })
      );

      sandbox.attendeeNames.getAll().then(function resolved(names) {
        expect(names).toEqual(attendeeNames);
        done();
      }, function rejected(reason) {
        expect('실패함').toBe(false);
        done();
      });

    });

    it("어떤 사유로 인해 버려진다", function(done) {
      var rejectionReason = "버림받은 이유";

      spyOn(attendeeWebApi, 'getAll').and.returnValue(
        new Promise( function(resolve, reject) {
          reject(rejectionReason);
        })
      );

      sandbox.attendeeNames.getAll().then(function resolved(names) {
        expect('귀결됨').toBe(false);
        done();
      }, function rejected(reason) {
        expect(reason).toBe(rejectionReason);
        done();
      });
    });
  });
});