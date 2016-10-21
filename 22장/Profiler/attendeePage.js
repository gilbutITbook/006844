var Conference = Conference || {};
Conference.attendeePage = (function attendeeList() {
  'use strict';
  var attendees = [];

  function fetchAttendees() {
    var ix,
        allPossibleInterests = [
          'JavaScript', 'Mobile Apps', 'Game Development',
          'Volunteer for Conferences', 'Graphic Design',
          'Artificial Intelligence', 'C#', 'Java', 'Agile Development',
          'Quality Assurance', 'Cloud Architecture', 'Big Data', 'AngularJS',
          '.NET', 'PHP', 'Linux','Windows','Node.js','CSS', 'HTML 5',
          'Security','Entity Framework', 'Azure', 'AWS', 'Perl',
          'Scalability','MVC', 'Unit Testing', 'Writing Books'].sort();

    function randomName() {
      var consonants = 'bcdfghjklmnpqrstvwxyz',
          vowels = 'aeiou',
          length = Math.floor(Math.random() * 8) + 3, // 3 to 10
          ix,
          letter,
          name = '';
      function randomLetterFrom(someLetters) {
        return someLetters.charAt(Math.floor(Math.random()*someLetters.length));
      }
      for (ix=0; ix<length; ++ix) {
        letter = randomLetterFrom(ix%2===0 ? consonants : vowels);
        if (ix===0) {
          letter = letter.toUpperCase();
        }
        name += letter;
      }
      return name;
    }

    function chooseInterests() {
      var chosenInterests = [];
      allPossibleInterests.forEach(function(interest) {
        if (Math.random() > 0.7) {
          chosenInterests.push(interest);
        }
      });
      return chosenInterests;
    }

    for (ix=0; ix<5000; ++ix) {
      var firstName = randomName(),
          lastName = randomName(),
          interests = chooseInterests();
      attendees.push(Conference.attendee(firstName, lastName, interests));
    }
  }

  function byLastNameThenFirstName(a,b) {
      return a.getLastName().localeCompare( b.getLastName()) ||
             a.getFirstName().localeCompare(b.getFirstName());
  }

  function displayAttendee(attendee) {
    var table = document.getElementById('attendeeTable'),
        tr = document.createElement('tr'),
        tdLastName = document.createElement('td'),
        tdFirstName = document.createElement('td'),
        tdInterests = document.createElement('td'),
        isFirstInterest = true;
    tr.appendChild(tdLastName);
    tr.appendChild(tdFirstName);
    tr.appendChild(tdInterests);
    tdLastName.innerHTML = attendee.getLastName();
    tdFirstName.innerHTML = attendee.getFirstName();

    tdInterests.innerHTML = '';
    attendee.getInterests().forEach(function addInterest(interest) {
      if (!isFirstInterest) {
        tdInterests.innerHTML += ', ';
      } else {
        isFirstInterest = false;
      }
      tdInterests.innerHTML += interest;
      // 위 코드는 다음 코드 한 줄로 대체 가능하다.
      // tdInterests.innerHTML = attendee.getInterests().join(', ');
    });

    table.appendChild(tr);
  }

  return {
    addAttendeesToPage: function() {
      fetchAttendees();
      attendees.sort(byLastNameThenFirstName);
      attendees.forEach(displayAttendee);
    }
  };
}());

document.addEventListener('DOMContentLoaded',
                          Conference.attendeePage.addAttendeesToPage);
