var Conference = Conference || {};
Conference.attendee = function(firstName, lastName, registry) {
  'use strict';

  var attendeeId,
    checkedIn = false,
    first = firstName || 'None',
    last = lastName || 'None',
    checkInNumber,
    attendeePersonalInfo = 'Conference.attendee.personalInfo',
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

  var ret = {
    setId: function(id) {
      attendeeId = id;
    },
    getId: function() {
      return attendeeId;
    },

    getFullName: function() {
      return first + ' ' + last;
    },

    isCheckedIn: function() {
      return checkedIn;
    },

    checkIn: function() {
      checkedIn = true;
    },

    undoCheckIn: function() {
      checkedIn = false;
      checkInNumber = undefined;
    },

    setCheckInNumber: function(number) {
      checkInNumber = number;
    },

    getCheckInNumber: function() {
      return checkInNumber;
    }
  };

  registry.assert(attendeePersonalInfo, ret);
  registry.assert(attendeeCheckInManagement, ret);

  return ret;
};

// 사용 예
var registry = ReliableJavaScript.contractRegistry();
var a = Conference.attendee('Rock','Star', registry); // 예외를 던지지 않음.
