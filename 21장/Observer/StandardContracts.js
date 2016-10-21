// 17장에서 나왔던 StandardContracts.js

var ReliableJavaScript = ReliableJavaScript || {};

//시스템 정의 타입을 위한 규약 배열이다.
//ReliableJavaScript.ContractRegistry.defineMultiple로
//이 규약들을 레지스트리에 추가한다.
ReliableJavaScript.StandardContracts = (function() {
 'use strict';

  //------------------
  // 기본 타입
  //------------------

  function isUndefined(thing) {
    return typeof thing === 'undefined';
  }

  function isBoolean(thing) {
    return typeof thing === 'boolean';
  }

  function isString(thing) {
    return typeof thing === 'string';
  }

  function isNumber(thing) {
    return typeof thing === 'number';
  }

  function isFunction(thing) {
    return typeof thing === 'function';
  }

  function isObject(thing) {
    return typeof thing === 'object';
  }

  //-------------------
  // 준 기본 타입
  //-------------------

  function isArray(thing) {
    return Array.isArray(thing);
  }

  function isNonEmptyString(thing) {
    return isString(thing) && thing.length>0;
  }

  function isNonBlankString(thing) {
    return isString(thing) && /^ *$/.test(thing)===false;
  }

  // 출처: http://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
  function isInteger(thing) {
    return !isNaN(thing) &&
         (function(x) { return (x | 0) === x; })(parseFloat(thing));
  }

  function isNonNegativeInteger(thing) {
    return isInteger(thing) && thing>=0;
  }

  function isPositiveInteger(thing) {
    return isInteger(thing) && thing > 0;
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
    { name: 'positiveInteger',    evaluator: isPositiveInteger },
  ];

}());