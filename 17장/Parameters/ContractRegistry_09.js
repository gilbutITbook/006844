var ReliableJavaScript = ReliableJavaScript || {};
ReliableJavaScript.ContractRegistry = function() {

  var registry = {};

  if (!(this instanceof ReliableJavaScript.ContractRegistry)) {
    throw new Error(ReliableJavaScript.ContractRegistry.messages.newRequired);
  }

  this.define = function(contractName, evaluator) {
    if (typeof contractName !== 'string' ) {
      throw new Error(ReliableJavaScript.ContractRegistry.messages.nameMustBeString);
    }
    if (typeof evaluator !== 'function') {
      throw new Error(ReliableJavaScript.ContractRegistry.messages.evaluatorMustBeFunction);
    }
    registry[contractName] = evaluator;
    return this;
  };

  this.fulfills = function fulfills(contractName, obj) {
    if (!registry[contractName]) {
      throw new Error(this.getMessageForNameNotRegistered(contractName));
    }
    return registry[contractName](obj);
  };
};

ReliableJavaScript.ContractRegistry.prototype.assert =
function assert(contractName,obj) {
  if (!this.fulfills(contractName,obj)) {
    throw new Error(this.getMessageForFailedContract(contractName,obj));
  }
  return this;
};

ReliableJavaScript.ContractRegistry.prototype.multipleFulfills =
function multipleFulfills(validator, args) {
  var self = this;

  if (Array.isArray(validator)) {
    validator.forEach(function assertString(elem) {
      if (typeof elem !== 'string' ) {
        throw new Error(ReliableJavaScript.ContractRegistry.messages.validatorsInvalid);
      }
    });
  } else if (typeof validator !== 'function' &&
  typeof validator !== 'string') {
    throw new Error(ReliableJavaScript.ContractRegistry.messages.validatorsInvalid);
  }

  if (!Array.isArray(args) &&
  (!args || typeof args !== 'object' || args.length === undefined)) {
    throw new Error(ReliableJavaScript.ContractRegistry.messages.argsMustBeArrayLike);
  }

  if (typeof validator === 'string' ) {
    return self.fulfills(validator,args);
  }
  if (Array.isArray(validator)) {
    if (validator.length === 0) {
      return true;
    }
  }
  if (typeof validator === 'function' ) {
    return validator.apply(self,args);
  }
};

ReliableJavaScript.ContractRegistry.prototype.attachReturnValidator =
function attachReturnValidator(
funcName, funcObj, contractName) {
  var self = this;
  if (typeof funcName !== 'string') {
    throw new Error(ReliableJavaScript.ContractRegistry.messages.funcNameMustBeString);
  }
  if (typeof funcObj !== 'object') {
    throw new Error(ReliableJavaScript.ContractRegistry.messages.funcObjMustBeObject);
  }
  if (typeof contractName !== 'string') {
    throw new Error(ReliableJavaScript.ContractRegistry.messages.nameMustBeString);
  }

  Aop.around(funcName,
    function validateReturn(targetInfo) {
      var ret = Aop.next(targetInfo);
      self.assert(contractName,ret);
      return ret;
    }, funcObj);

  return this;
};

ReliableJavaScript.ContractRegistry.messages = {
  newRequired: '규약 레지스트리는 "new"로 인스턴스화해야 합니다',
  nameMustBeString: '규약명은 적어도 한 개의 문자로 이루어진 문자열이어야 합니다',
  evaluatorMustBeFunction: '평가기는 함수만 가능합니다',
  nameMustBeRegistered: "'_'은 레지스트리에 없는 규약입니다",
  funcNameMustBeString: '함수명은 반드시 공백 아닌 문자열이어야 합니다',
  funcObjMustBeObject: '장식할 객체는 반드시 객체여야 합니다',
  validatorsInvalid:
    '검사기 인자는 반드시 문자열, 문자열 배열, 각 규약명이 콤마로 구분된 목록, 함수 중 하나여야 합니다.',
  argsMustBeArrayLike: 'args 인자는 유사 배열 타입이어야 합니다',
  argsFailedContract: '규약을 위반한 인자입니다',
  failedContract: "다음 객체는 '_' 규약 위반입니다: ",
  contractsArrayInvalid: "규약 파라미터는 name 및 evaluator 두 프로퍼티를 가진 객체의 배열만 가능합니다"
};

ReliableJavaScript.ContractRegistry.prototype.getMessageForNameNotRegistered =
function getMessageForNameNotRegistered(
contractName) {
  return ReliableJavaScript.ContractRegistry.messages.nameMustBeRegistered
    .replace('_',contractName);
};

ReliableJavaScript.ContractRegistry.prototype.getMessageForFailedContract =
function getMessageForFailedContract(
contractName, obj) {
  return ReliableJavaScript.ContractRegistry.messages.failedContract
      .replace('_',contractName)+ obj;
};
