var Game = Game || {};

Game.readOnceKey = function readOnceKey() {
  'use strict';
  var magicKey = {},
      alreadyRead = false,
      ret = {}; // 한번만 읽히는 키. 이 키를 반환한다.

  function getKey() {
    if (alreadyRead) {
      throw new Error(Game.readOnceKey.messages.onlyOnce);
    }
    alreadyRead = true;
    return magicKey;
  }
  function assertMatches(key) {
    if (key !== magicKey) {
      throw new Error(Game.readOnceKey.messages.badKey);
    }
  }

  Object.defineProperty(ret, 'getKey', { value: getKey });
  Object.defineProperty(ret, 'assertMatches', { value: assertMatches });
  return ret;
};

Game.readOnceKey.messages = {
  onlyOnce: 'readOnceKey는 단 한번만 읽을 수 있습니다.',
  badKey: '잘못된 키입니다. 혹시 아키텍처 제약 조건을 위반한 건 아닌지요?'
};