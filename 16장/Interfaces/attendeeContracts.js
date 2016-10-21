var Conference = Conference || {};

// 이 함수를 호출하여 Conference.attendee(firstName, lastName)가
// 올바르게 attendees를 생성했는지 확인하는 애스팩트를 설치한다
Conference.attendeeContracts = function attendeeContracts(registry) {
  'use strict';

  var attendeePersonalInfo = 'Conference.attendee.personalInfo',
      attendeeCheckInManagement = 'Conference.attendee.checkInManagement';

  function fulfillsPersonalInfo(att) {
    return typeof att.setId === 'function' &&
           typeof att.getId === 'function' &&
           typeof att.getFullName === 'function';
  }

  function fulfillsCheckInManagement(att) {
    return typeof att.getId === 'function' &&
           typeof att.isCheckedIn === 'function' &&
           typeof att.checkIn === 'function' &&
           typeof att.undoCheckIn === 'function' &&
           typeof att.setCheckInNumber === 'function' &&
           typeof att.getCheckInNumber === 'function';
  }

  registry.define(attendeePersonalInfo, fulfillsPersonalInfo);
  registry.define(attendeeCheckInManagement, fulfillsCheckInManagement);

  registry.attachReturnValidator('attendee', Conference, attendeePersonalInfo);
  registry.attachReturnValidator('attendee', Conference, attendeeCheckInManagement);
};

// 사용 예:
// 애플리케이션 시동 시, 레지스트리를 인스턴스화하고 애스팩트를 붙인다.
var registry = ReliableJavaScript.contractRegistry();
Conference.attendeeContracts(registry);
// 계속해서 다른 모듈에도 애스팩트를 설치한다.

// 나중에 attendee가 만들어지면
// 올바르게 생성된 객체인지 애스팩트가 보장한다.
var a = Conference.attendee('Rock','Star'); // 예외를 던지지 않음.