describe('createReservation(passenger, flight)', function() {
  it('주어진 passenger를 passengerInfo 프로퍼티에 할당한다', function() {
    var testPassenger = {
      firstName: '윤지',
      lastName: '김'
    };

    var testFlight = {
      number: '3443',
      carrier: '대한항공',
      destination: '울산'
    };

    var reservation = createReservation(testPassenger, testFlight);
    expect(reservation.passengerInfo).toBe(testPassenger);
  });

  it('주어진 flight를 flightInfo 프로퍼티에 할당한다', function() {
    var testPassenger = {
      firstName: '윤지',
      lastName: '김'
    };

    var testFlight = {
      number: '3443',
      carrier: '대한항공',
      destination: '울산'
    };

    var reservation = createReservation(testPassenger, testFlight);
    expect(reservation.flightInfo).toBe(testFlight);
  });
});