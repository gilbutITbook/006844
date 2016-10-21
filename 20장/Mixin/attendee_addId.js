var Conference = Conference || {};
Conference.attendee = function(firstName, lastName) {
  'use strict';

  var checkedIn = false,
    first = firstName || 'None',
    last = lastName || 'None',
    checkInNumber,

    newAttendee = {
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

  Conference.mixins.addId.call(newAttendee);

  return newAttendee;
};