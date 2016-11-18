module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Suite = exports.StepDefGroup = exports.Feature = undefined;

	var _suite = __webpack_require__(1);

	var _suite2 = _interopRequireDefault(_suite);

	var _feature = __webpack_require__(3);

	var _feature2 = _interopRequireDefault(_feature);

	var _stepDefGroup = __webpack_require__(7);

	var _stepDefGroup2 = _interopRequireDefault(_stepDefGroup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Feature = _feature2.default;
	exports.StepDefGroup = _stepDefGroup2.default;
	exports.Suite = _suite2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _result = __webpack_require__(2);

	var _result2 = _interopRequireDefault(_result);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NOOP = function NOOP() {};

	var _class = function () {
	  function _class(optionsOrFeatures, features) {
	    _classCallCheck(this, _class);

	    var options = {};

	    if (features) {
	      options = optionsOrFeatures;
	    } else {
	      features = optionsOrFeatures;
	    }

	    this._options = options;
	    this._features = features;
	  }

	  _createClass(_class, [{
	    key: 'run',
	    value: function run() {
	      var _this = this;

	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      var callback = args.pop();
	      var filter = args[0];
	      var testIndex = 0;
	      var features = this._features;

	      if (filter) {
	        features = features.filter(function (feature) {
	          return feature.name.includes(filter);
	        });
	      }

	      features.forEach(function (feature) {
	        feature.beforeEachScenario = _this._options.beforeEachScenario || NOOP;
	        feature.afterEachScenario = _this._options.afterEachScenario || NOOP;
	        feature.run(function (scenarioResult) {
	          callback(new _result2.default(feature, scenarioResult, testIndex));
	          testIndex += 1;
	        });
	      });
	    }
	  }, {
	    key: 'count',
	    get: function get() {
	      return this._features.length;
	    }
	  }, {
	    key: 'string',
	    get: function get() {
	      return this._features.map(function (f) {
	        return f.string;
	      }).join('\n\n');
	    }
	  }]);

	  return _class;
	}();

	exports.default = _class;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _class = function () {
	  function _class(feature, scenarioResult, testIndex) {
	    _classCallCheck(this, _class);

	    this._feature = feature;
	    this._scenarioResult = scenarioResult;
	    this._testIndex = testIndex;
	  }

	  _createClass(_class, [{
	    key: 'tap',
	    get: function get() {
	      return [this._tapStatus, this._tapIndex, this._tapDescription].join(' ');
	    }
	  }, {
	    key: 'testNumber',
	    get: function get() {
	      return this._testIndex + 1;
	    }
	  }, {
	    key: 'error',
	    get: function get() {
	      return this._scenarioResult.error;
	    }
	  }, {
	    key: 'didPass',
	    get: function get() {
	      return this._scenarioResult.didPass;
	    }
	  }, {
	    key: 'name',
	    get: function get() {
	      return this.featureName + ': ' + this._scenarioResult.name;
	    }
	  }, {
	    key: '_tapStatus',
	    get: function get() {
	      return this._scenarioResult.didPass ? 'ok' : 'not ok';
	    }
	  }, {
	    key: '_tapIndex',
	    get: function get() {
	      return this._testIndex + 1;
	    }
	  }, {
	    key: '_tapDescription',
	    get: function get() {
	      return this._feature.name + ': ' + this._scenarioResult.name;
	    }
	  }]);

	  return _class;
	}();

	exports.default = _class;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _stepSequence = __webpack_require__(4);

	var _stepSequence2 = _interopRequireDefault(_stepSequence);

	var _scenario = __webpack_require__(6);

	var _scenario2 = _interopRequireDefault(_scenario);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _class = function () {
	  function _class(name, description, body) {
	    _classCallCheck(this, _class);

	    this._name = name;
	    this._description = description;
	    this._scenarios = [];
	    this._registerScenarios(body);
	  }

	  _createClass(_class, [{
	    key: 'run',
	    value: function run(scenarioCallback) {
	      var _this = this;

	      this._scenarios.forEach(function (scenario, testIndex) {
	        var before = _this.beforeEachScenario;
	        var after = _this.afterEachScenario;
	        var stepSequence = new _stepSequence2.default(scenario, before, after);
	        var testResult = stepSequence.run();
	        scenarioCallback(testResult, testIndex);
	      });
	    }
	  }, {
	    key: '_registerScenarios',
	    value: function _registerScenarios(body) {
	      var scenario = this._addScenario.bind(this);

	      body(scenario);
	    }
	  }, {
	    key: '_addScenario',
	    value: function _addScenario() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      this._scenarios.push(new (Function.prototype.bind.apply(_scenario2.default, [null].concat(args)))());
	    }
	  }, {
	    key: 'name',
	    get: function get() {
	      return this._name;
	    }
	  }, {
	    key: 'description',
	    get: function get() {
	      return this._description.trim().split('\n').map(function (l) {
	        return l.trim();
	      }).join('\n');
	    }
	  }, {
	    key: 'scenarios',
	    get: function get() {
	      return this._scenarios;
	    }
	  }]);

	  return _class;
	}();

	exports.default = _class;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _assert = __webpack_require__(5);

	var assert = _interopRequireWildcard(_assert);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NOOP = function NOOP() {};

	var _class = function () {
	  function _class(_ref, before, after) {
	    var stepNames = _ref.stepNames,
	        stepDefs = _ref.stepDefs,
	        name = _ref.name;

	    _classCallCheck(this, _class);

	    this.stepNames = stepNames;
	    this.stepDefs = stepDefs;
	    this.name = name;
	    this.sequenceAssert = assert;
	    this.before = before || NOOP;
	    this.after = after || NOOP;
	  }

	  _createClass(_class, [{
	    key: 'run',
	    value: function run() {
	      var name = this.name;
	      var didPass = true;
	      var error = void 0;

	      this._validateStepsWithStepDefs();

	      try {
	        this.before();
	        this._executeStepsWithStepDefs();
	        this.after();
	      } catch (e) {
	        error = e;
	        didPass = false;
	      }

	      return { name: name, didPass: didPass, error: error };
	    }
	  }, {
	    key: '_validateStepsWithStepDefs',
	    value: function _validateStepsWithStepDefs() {
	      var stepNames = this.stepNames,
	          stepDefs = this.stepDefs;

	      var stepDefNames = Object.getOwnPropertyNames(stepDefs);

	      stepNames.forEach(function (stepName) {
	        assert.ok(stepDefNames.includes(stepName), 'Step "' + stepName + '" could not be found in step defs');
	      });
	    }
	  }, {
	    key: '_executeStepsWithStepDefs',
	    value: function _executeStepsWithStepDefs() {
	      var stepNames = this.stepNames,
	          stepDefs = this.stepDefs,
	          sequenceAssert = this.sequenceAssert;


	      stepNames.forEach(function (stepName) {
	        var stepDef = stepDefs[stepName];
	        stepDef.execute(sequenceAssert);
	      });
	    }
	  }]);

	  return _class;
	}();

	exports.default = _class;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("assert");

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _class = function () {
	  function _class(name) {
	    _classCallCheck(this, _class);

	    for (var _len = arguments.length, stepDefGroupsAndBody = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      stepDefGroupsAndBody[_key - 1] = arguments[_key];
	    }

	    var body = stepDefGroupsAndBody.pop();
	    var stepDefGroups = stepDefGroupsAndBody;

	    this.stepNames = [];
	    this.steps = [];
	    this.stepDefs = {};
	    this.name = name;
	    this._registerSteps(body);
	    this._registerStepDefs(stepDefGroups);
	  }

	  _createClass(_class, [{
	    key: '_registerSteps',
	    value: function _registerSteps(body) {
	      var Given = this._step.bind(this, 'Given');
	      var When = this._step.bind(this, 'When');
	      var And = this._step.bind(this, 'And');
	      var Then = this._step.bind(this, 'Then');

	      if (typeof body === 'function') body({ Given: Given, And: And, When: When, Then: Then });
	    }
	  }, {
	    key: '_registerStepDefs',
	    value: function _registerStepDefs(stepDefGroups) {
	      var _this = this;

	      stepDefGroups.forEach(function (stepDefGroup) {
	        Object.assign(_this.stepDefs, stepDefGroup.stepDefs);
	      });
	    }
	  }, {
	    key: '_step',
	    value: function _step(stepType, stepName) {
	      this.stepNames.push(stepName);
	      this.steps.push(stepType + ' ' + stepName);
	    }
	  }]);

	  return _class;
	}();

	exports.default = _class;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _stepDef = __webpack_require__(8);

	var _stepDef2 = _interopRequireDefault(_stepDef);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _class = function () {
	  function _class(body) {
	    _classCallCheck(this, _class);

	    var stepDefFactory = this._stepDefFactory.bind(this);

	    this.stepDefs = {};

	    body(stepDefFactory);
	  }

	  _createClass(_class, [{
	    key: '_stepDefFactory',
	    value: function _stepDefFactory(name, definition) {
	      this.stepDefs[name] = new _stepDef2.default(name, definition);
	    }
	  }]);

	  return _class;
	}();

	exports.default = _class;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _class = function () {
	  function _class(name, definition) {
	    _classCallCheck(this, _class);

	    this.name = name;
	    this.definition = definition;
	  }

	  _createClass(_class, [{
	    key: "execute",
	    value: function execute(assert) {
	      this.definition(assert);
	    }
	  }]);

	  return _class;
	}();

	exports.default = _class;

/***/ }
/******/ ]);