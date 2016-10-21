var obj = {
  val: 0,
  incrementValue: function incrementValue() {
    "use strict";
    // 엄격 모드에서 'this'는 기본적으로 window가 아닌, undefined에 바인딩된다.
    this.val++;
  }
};

// obj에 정의한 함수를 가리키는 참조체를 만든다
var incrementRef = obj.incrementValue;

//참조체를 통해 incrementValue 함수를 실행한다
incrementRef();  // 에러가 난다