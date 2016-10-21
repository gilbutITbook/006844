"use strict";

function Counter() {

  // 생성자 함수를 new 키워드로 실행하면
  // 'this'는 새 객체에 바인딩된다
  this.val = 0;
}
Counter.prototype.incrementValue = function() {
    // 함수 안에서의 'this'는 이 함수 호출 시
    // 객체 인스턴스를 분명히 가리켜야 하므로
    // 아직까진 암시적 바인딩에 따라 참조한다
    this.val++;
};

var cnt = new Counter();
var incrementRef = cnt.incrementValue;

// 참조체를 통해 함수를 실행하면 에러가 난다
incrementRef();