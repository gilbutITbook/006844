describe('calculateUpgradeMileages(tripMileages, memberMultiplier', function() {
  var testPassenger = null;

  beforeEach(function() {
    testPassenger = {
      firstName : '일웅',
      lastName : '이',
      tripMileages : [
        500,
        600,
        3400,
        2500
      ]
    };
  });

  it('배율이 1.0이면 원래 마일리지를 반환한다', function() {
    expect(calculateUpgradeMileages(testPassenger.tripMileages, 1.0)).toEqual(testPassenger.tripMileages);
  });

  it('배율이 3.0이면 해당 마일리지를 계산하여 반환한다', function() {
      var expectedResults = [], multiplier = 3.0;

      for (var i = 0; i<testPassenger.tripMileages.length; i++) {
        expectedResults[i] = testPassenger.tripMileages[i] * multiplier;
      }

      expect(calculateUpgradeMileages(testPassenger.tripMileages, multiplier))
        .toEqual(expectedResults);
    });

});