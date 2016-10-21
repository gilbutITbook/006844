function calculateUpgradeMileages(tripMileages, memberMultiplier) {
  var upgradeMileage = [], i = 0;
  for (i = 0; i < tripMileages.length; i++) {
    var calcRewardsMiles = function(mileage) {
      return mileage * memberMultiplier;
    };
    upgradeMileage[i] = calcRewardsMiles(tripMileages[i]);
  }
  return upgradeMileage;
}