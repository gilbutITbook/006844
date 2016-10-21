describe('normalPoint', function() {
  'use strict';
  var normalPoint = Game.normalPoint; // 편의 상 에일리어스를 쓰자.
  describe('normalPoint(xNormal, yNormal)', function() {
    var pretendRandomNumber = 0.33;

    it('xNormal이 주어지면 x를 xNormal로 세팅한다', function() {
      var pt = normalPoint(0.5);
      expect(pt.x).toBe(0.5);
    });
    it('xNormal이 주어지지 않으면 x를 [0-1) 무작위값으로 세팅한다', function() {
      spyOn(Math,'random').and.callFake(function() {
        return pretendRandomNumber;
      });
      var pt = normalPoint();
      expect(pt.x).toBe(pretendRandomNumber);
    });

    it('yNormal이 주어지면 y를 yNormal로 세팅한다', function() {
      var pt = normalPoint(0,0.5);
      expect(pt.y).toBe(0.5);
    });
    it('yNormal이 주어지지 않으면 y를 [0-1) 무작위값으로 세팅한다', function() {
      spyOn(Math,'random').and.callFake(function() {
        return pretendRandomNumber;
      });
      var pt = normalPoint(0.9,undefined);
      expect(pt.y).toBe(pretendRandomNumber);
    });
  });
});