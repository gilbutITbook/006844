var ReliableJavaScript = ReliableJavaScript || {};
ReliableJavaScript.ContractRegistry = function() {
  'use strict';

  var registry = {};

  if (!(this instanceof ReliableJavaScript.ContractRegistry)) {
    throw new Error(ReliableJavaScript.ContractRegistry.messages.newRequired);
  }

  this.define = function(contractName, evaluator) {
    if (typeof contractName !== 'string' ) {
      throw new Error(ReliableJavaScript.ContractRegistry.messages.nameMustBeString);
    }
    contractName = contractName.trim();
    if (contractName.length === 0) {
      throw new Error(ReliableJavaScript.ContractRegistry.messages.nameMustBeString);
    }
    if (typeof evaluator !== 'function') {
      throw new Error(ReliableJavaScript.ContractRegistry.messages.evaluatorMustBeFunction);
    }
    registry[contractName] = evaluator;
    return this;
  };

  this.fulfills = function fulfills(contractName, obj) {
    if (typeof contractName === 'string') {
      contractName = contractName.trim();
    }
    if (!registry[contractName]) {
      throw new Error(this.getMessageForNameNotRegistered(contractName));
    }
    return registry[contractName](obj);
  };
};

ReliableJavaScript.ContractRegistry.prototype.defineMultiple =
function assert(contracts) {
  'use strict';
  var self=this,
      ix;
  if (!Array.isArray(contracts)) {
    throw new Error(
      ReliableJavaScript.ContractRegistry.messages.contractsArrayInvalid);
  }
  for (ix=0; ix<contracts.length; ++ix) {
    if (!contracts[ix].name || !contracts[ix].evaluator) {
      throw new Error(
        ReliableJavaScript.ContractRegistry.messages.contractsArrayInvalid);
    }
  }
  contracts.forEach(function defineContract(c) {
    self.define(c.name, c.evaluator);
  });
  return this;
};

ReliableJavaScript.ContractRegistry.prototype.assert =
function assert(contractName,obj) {
  'use strict';
  if (!this.fulfills(contractName,obj)) {
    throw new Error(this.getMessageForFailedContract(contractName,obj));
  }
  return this;
};

// 인자 'args'의 원소들이 validator 기준을 충족하는지
// 그 여부에 따라 true/false를 반환한다.
// validator는 다음 중 한 가지만 가능하다.
// 1. 규약명: contractRegistry.define으로 등록한 규약 이름이다.
//    주어진 규약은 'args'에 전체적으로 적용된다.
// 2. 문자열 배열: 각 문자열이 콤마로 구분된 규약명 목록을 나타낸다.
//    배열 원소는 각각 함수의 허용 가능한 오버로드를 의미한다.
//    콤마로 구분된 규약명을 하나씩 가져와 먼저 첫 번째 규약을 첫 번째 'args' 원소에 적용하고,
//    두 번째 규약은 두 번째 'args' 원소에 적용하는 식으로 진행된다.
//    규약명이 빈 문자열이면 해당 위치에 있는 인자 검사는 규약을 지키지 않아도 된다.
//    인자 개수가 더 많아 남을 경우 체크하지 않는다.
// 3. 함수: 첫 번째 인자는 해당 레지스트리, 나머지 인자는 대상 함수에 넣을 인자다.
//    어느 인자 하나라도 올바르지 않으면 예외를 던진다.
ReliableJavaScript.ContractRegistry.prototype.multipleFulfills =
function multipleFulfills(validator, args) {
  'use strict';
  var self = this,
      index;

  // validator 배열에 있는 원소 하나를 평가한다
  // (validator가 배열일 경우만 호출한다)
  function validateWithContractNameString(v) {
    var ix,
        contractNames = v.split(/ *, */);
    for (ix=0; ix<contractNames.length; ++ix) {
      if (contractNames[ix].length === 0) {
        continue;
      }
      if (!self.fulfills(contractNames[ix],args[ix])) {
        return false;
      }
    }
    return true;
  }
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
    for (index=0; index<validator.length; ++index) {
      if (validateWithContractNameString(validator[index])) {
        return true;
      }
    }
    return validator.length === 0;
  }
  if (typeof validator === 'function' ) {
    return validator.apply(self,args);
  }
};

ReliableJavaScript.ContractRegistry.prototype.multipleAssert =
function multipleAssert(validator,args) {
  'use strict';
  if (!this.multipleFulfills(validator,args)) {
    throw new Error(ReliableJavaScript.ContractRegistry.messages.argsFailedContract);
  }
  return this;
};

//인자 검사기를 'funcObj' 객체의 'funcName' 함수에 붙인다
//검사기는 multipleAssert에서 꺼내어 사용한다
ReliableJavaScript.ContractRegistry.prototype.attachArgumentsValidator =
function attachArgumentsValidator(funcName, funcObj, validator) {
  'use strict';
  var self = this;
  function validateStringOrUndefined(contractName) {
    if (contractName!==undefined && typeof contractName !== 'string') {
      throw new Error(ReliableJavaScript.ContractRegistry.messages.namesMustBeStringArray);
    }
  }
  if (typeof funcName !== 'string') {
    throw new Error(ReliableJavaScript.ContractRegistry.messages.funcNameMustBeString);
  }
  if (typeof funcObj !== 'object') {
    throw new Error(ReliableJavaScript.ContractRegistry.messages.funcObjMustBeObject);
  }
  if (Array.isArray(validator)) {
    validator.forEach(function assertStringNullOrUndefined(v) {
      if (typeof v !== 'string' &&
      typeof v !== 'undefined') {
        throw new Error(ReliableJavaScript.ContractRegistry.messages.validatorsInvalid);
      }
    });
  } else if (typeof validator !== 'function' &&
  typeof validator !== 'string') {
    throw new Error(ReliableJavaScript.ContractRegistry.messages.validatorsInvalid);
  }

  Aop.before(funcName, function validateArguments() {
      self.multipleAssert(validator,arguments);
  }, funcObj );

  return this;
};

ReliableJavaScript.ContractRegistry.prototype.attachReturnValidator =
function attachReturnValidator(funcName, funcObj, contractName) {
  'use strict';
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

ReliableJavaScript.ContractRegistry.prototype.attachPreCallValidator =
function attachPreCallValidator(funcName, funcObj, contractName) {
  'use strict';
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
    function validateObject(targetInfo) {
      self.assert(contractName,funcObj);
      return Aop.next.call(funcObj,targetInfo);
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
  'use strict';
  return ReliableJavaScript.ContractRegistry.messages.nameMustBeRegistered
    .replace('_',contractName);
};

ReliableJavaScript.ContractRegistry.prototype.getMessageForFailedContract =
function getMessageForFailedContract(
contractName, obj) {
  'use strict';
  return ReliableJavaScript.ContractRegistry.messages.failedContract
      .replace('_',contractName)+ obj;
};
