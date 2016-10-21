function calculateUpgradeMileages(tripMileages, memberMultiplier) {
  var upgradeMileage = [],
    i = 0;
  for (i = 0; i < tripMileages.length; i++) {
    /*jshint loopfunc: true */
    var calcRewardsMiles = function(mileage) {
      return mileage * memberMultiplier;
    };
    /*jshint loopfunc: false */
    upgradeMileage[i] = calcRewardsMiles(tripMileages[i]);
  }
  return upgradeMileage;
}