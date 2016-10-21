function Marsupial(name, nocturnal) {
  if (!(this instanceof Marsupial)) {
    throw new Error("이 객체는 new를 사용하여 생성해야 합니다");
  }
  this.name = name;
  this.isNocturnal = nocturnal;
}
Marsupial.prototype.isAwake = function(isNight) {
  return isNight == this.isNocturnal;
};

function Kangaroo(name) {
  if (!(this instanceof Kangaroo)) {
    throw new Error("이 객체는 new를 사용하여 생성해야 합니다");
  }
  this.name = name;
  this.isNocturnal = false;
}

Kangaroo.prototype = new Marsupial();
Kangaroo.prototype.hop = function() {
  return this.name + "가 껑충 뛰었어요!";
};
var jester = new Kangaroo('제스터');
console.log(jester.name);

var isNightTime = false;
console.log(jester.isAwake(isNightTime)); // true
console.log(jester.hop());  // '제스터가 껑충 뛰었어요!'

console.log(jester instanceof Kangaroo);  // true
console.log(jester instanceof Marsupial); // true