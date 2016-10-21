describe('애스팩트 적용', function() {
  'use strict';
  function doNothing() {
  }
  it('빌리기 전 애스팩트를 적용할 경우', function() {
    expect(function() {
      objWithEarlyAspect.forEach(doNothing);
    }).toThrow();
  });
  it('빌린 후 애스팩트를 적용할 경우', function() {
    expect(function() {
      objWithLateAspect.forEach(doNothing);
    }).toThrow();
  });
});