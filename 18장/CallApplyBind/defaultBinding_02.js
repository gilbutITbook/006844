var obj = {
  val: 0,
  incrementValue: function incrementValue() {
    this.val++;
  }
};

// obj에 정의한 함수를 가리키는 참조체를 만든다
var incrementRef = obj.incrementValue;

// 참조체를 통해 incrementValue 함수를 실행한다
incrementRef();
incrementRef();
incrementRef();

console.log("최종 결괏값: " + obj.val);  // ???