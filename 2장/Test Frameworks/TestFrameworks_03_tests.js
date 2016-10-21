describe('createReservation(passenger, flight)', function() {
  var testPassenger = null,
    testFlight = null,
    testReservation = null;

  beforeEach(function() {
    testPassenger = {
      firstName: '윤지',
      lastName: '김'
    };

    testFlight = {
      number: '3443',
      carrier: '대한항공',
      destination: '울산'
    };

    testReservation = createReservation(testPassenger, testFlight);
  });

  it('passenger를 passengerInformation 프로퍼티에 할당한다', function() {
    expect(testReservation.passengerInformation).toBe(testPassenger);
  });

  it('flight를 flightInformation 프로퍼티에 할당한다', function() {
    expect(testReservation.flightInformation).toBe(testFlight);
  });
});