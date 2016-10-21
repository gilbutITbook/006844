function incrementValue() {
  this.val++;
};
// 함수도 프로퍼티를 가질 수 있다
incrementValue.val = 0;

incrementValue();  // 1
incrementValue();  // 2
incrementValue();  // 3

console.log("최종 결괏값: " + incrementValue.val);  // ???