Attendee = function(service, messenger, attendeeId) {
   // 'new'로 생성하도록 강제한다.
  if (!(this instanceof Attendee)) {
    return new Attendee(attendeeId);
  }

  this.attendeeId = attendeeId;

  this.service = service;
  this.messenger = messenger;
};
