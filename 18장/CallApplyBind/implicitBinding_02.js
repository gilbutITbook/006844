function valIncrementor() {
  this.val++;
}

var obj = {
  val: 0,
  incrementValue: valIncrementor
};

obj.incrementValue();
obj.incrementValue();
obj.incrementValue();

console.log("최종 결괏값: " + obj.val);  // 3
