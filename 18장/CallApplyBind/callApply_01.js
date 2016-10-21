var ReliableJavaScript = ReliableJavaScript || {};

ReliableJavaScript.addValues = function(value1, value2) {
  // 두 인자를 받는 addValues는
  // 'this'에 'printResult' 메소드가 있다고 본다
  this.printResult(value1 + value2);
};

// printResult 함수가 있는 객체를 정의
var contextObject = {

  printResult: function printResult(toPrint) {
    console.log("Result: " + toPrint);
  }

};

// addValues 함수를 call 메소드로 실행한다.
// 'this'가 바인딩될 객체를 contextObject로 넘겨준다.
// 그리고, addValues가 덧셈할 값, 2와 3을 전달한다.

ReliableJavaScript.addValues.call(contextObject, 2, 3); // "결과: 5"

// addValues 함수를 apply 메소드로 실행한다.
// 여기서도 'this'가 바인딩될 객체를 contextObject로 넘겨준다.
// 마찬가지로, addValues가 덧셈할 값, 2와 3을 전달한다.
ReliableJavaScript.addValues.apply(contextObject, [2, 3]); // "결과: 5"