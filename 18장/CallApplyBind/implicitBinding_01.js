var obj = {
  val: 0,
  incrementValue: function incrementValue() {
    this.val++;
  }
};

obj.incrementValue();
obj.incrementValue();
obj.incrementValue();

console.log("최종 결괏값: " + obj.val);  // ???
