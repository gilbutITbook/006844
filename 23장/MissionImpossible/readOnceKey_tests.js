describe('readOnceKey', function() {
  'use strict';

  var readOnceKey;
  beforeEach(function() {
    readOnceKey = Game.readOnceKey();
  });

  describe('getKey()', function() {

    it('최초 호출 시 뭔가 반환한다', function() {
      expect(readOnceKey.getKey()).not.toBeUndefined();
    });

    it('두 번째 호출 시 예외를 던진다', function() {
      readOnceKey.getKey();

      expect(function() {
        readOnceKey.getKey();
      }).toThrowError(Game.readOnceKey.messages.onlyOnce);
    });

    it('가짜 키로 바꿀 수 없다', function() {
      expect(function() {
        readOnceKey['getKey'] = function() { return '가짜라고!'; }
      }).toThrow();
    });
  });

  describe('assertMatches(key)', function() {

    it('올바른 "key"가 아니면 예외를 던진다', function() {
      expect(function() {
        readOnceKey.assertMatches('틀린키');
      }).toThrowError(Game.readOnceKey.messages.badKey);
    });

    it('올바른 "key"가 맞으면 예외를 던지지 않는다', function() {
      var magicKey = readOnceKey.getKey();
      expect(function() {
        readOnceKey.assertMatches(magicKey);
      }).not.toThrow();
    });

    it('가짜 키로 바꿀 수 없다', function() {
      expect(function() {
        readOnceKey['assertMatches'] = function() { }
      }).toThrow();
    });
  });
});