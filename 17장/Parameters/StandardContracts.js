var ReliableJavaScript = ReliableJavaScript || {};

// 시스템 정의 타입을 위한 규약 배열이다. 
// ReliableJavaScript.ContractRegistry.defineMultiple로
// 이 규약들을 레지스트리에 추가한다.
ReliableJavaScript.StandardContracts = (function() {
 
  //------------------
  // 기본 타입
  //------------------
  
  function isUndefined(obj) {
    return typeof obj === 'undefined';
  }
  
  function isBoolean(obj) {
    return typeof obj === 'boolean';
  }
  
  function isString(obj) {
    return typeof obj === 'string';  
  }
  
  function isNumber(obj) {
    return typeof obj === 'number';
  }
  
  function isFunction(obj) {
    return typeof obj === 'function';
  }
  
  function isObject(obj) {
    return typeof obj === 'object';
  }
  
  //-------------------
  // 준 기본 타입
  //-------------------
  
  function isArray(obj) {
    return Array.isArray(obj);
  }
  
  function isNonEmptyString(obj) {
    return isString(obj) && obj.length>0;
  }
  
  function isNonBlankString(obj) {
    return isString(obj) && /^ *$/.test(obj)===false;
  }
  
  // 출처: http://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
  function isInteger(obj) {
    return !isNaN(value) &&
      (function(x) { return (x | 0) === x; })(parseFloat(obj));
  }
  
  function isNonNegativeInteger(obj) {
    return isInteger(obj) && obj>=0;
  }
  
  function isNonNegativeNumber(obj) {
    return isNumberLike(obj) && obj >=0;
  }
  
  return [
    { name: 'undefined',          evaluator: isUndefined },
    { name: 'boolean',            evaluator: isBoolean },
    { name: 'string',             evaluator: isString },
    { name: 'number',             evaluator: isNumber },
    { name: 'function',           evaluator: isFunction },
    { name: 'object',             evaluator: isObject },
    { name: 'array',              evaluator: isArray },
    { name: 'nonEmptyString',     evaluator: isNonEmptyString },
    { name: 'nonBlankString',     evaluator: isNonBlankString },
    { name: 'integer',            evaluator: isInteger },
    { name: 'nonNegativeInteger', evaluator: isNonNegativeInteger },
    { name: 'nonNegativeNumber',  evaluator: isNonNegativeNumber },
  ];
  
}());