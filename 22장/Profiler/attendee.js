var Conference = Conference || {};
Conference.attendee = function(firstName, lastName, interestKeywords) {

  var checkedIn = false,
    first = firstName || 'None',
    last = lastName || 'None',
    interests = interestKeywords || [];

  return {
    getFirstName: function getFirstName() {
      return first;
    },

    getLastName: function getLastName() {
      return last;
    },

    getInterests: function getInterests() {
      return interests;
    },

    getFullName: function getFullName() {
      return first + ' ' + last;
    },

    isCheckedIn: function isCheckedIn() {
      return checkedIn;
    },

    checkIn: function checkIn() {
      checkedIn = true;
    }
  };
};