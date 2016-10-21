describe('Conference.attendee', function() {
  'use strict';

  var attendee, firstName, lastName;
  beforeEach(function() {
    firstName = '성인';
    lastName = '이';
    attendee = Conference.attendee(firstName, lastName);
  });
  it('setId(id)/getId()로 각각 PK를 지정/조회한다', function() {
    var id = 1234;
    attendee.setId(id);
    expect(attendee.getId()).toBe(id);
  });
  it('getFullName()로 전체 성명을 가져온다', function() {
    expect(attendee.getFullName()).toBe(firstName + ' ' + lastName);
  });
  it('처음에는 체크인되지 않은 상태다', function() {
    expect(attendee.isCheckedIn()).toBe(false);
  });
  it('checkIn()을 호출한 후 체크인 상태가 된다', function() {
    attendee.checkIn();
    expect(attendee.isCheckedIn()).toBe(true);
  });
  it('undoCheckIn()를 실행하면 더 이상 체크인 상태가 아니다', function() {
    attendee.checkIn();
    attendee.undoCheckIn();
    expect(attendee.isCheckedIn()).toBe(false);
  });
  it('setCheckInNumber()로 체크인 번호를 지정하고 getCheckInNumber()로 조회한다', function() {
    var checkInNumber = 5555;
    attendee.setCheckInNumber(checkInNumber);
    expect(attendee.getCheckInNumber()).toBe(checkInNumber);
  });
});