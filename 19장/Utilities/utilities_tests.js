describe('borrow(borrower, donor, funcName)', function() {
  'use strict';
  var borrow = ReliableJavaScript.utilities.borrow;
  it('빌리는 객체가 빌린 함수를 실행한다', function() {
    var donor = {
      subtract: function(minuend, subtrahend) {
        return minuend - subtrahend;
      }
    },
    borrower = {};
    borrow(borrower, donor, 'subtract');
    expect(borrower.subtract(5,2)).toBe(3);
  });
});