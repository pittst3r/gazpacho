import Result from 'result';
import StepSequence from 'step-sequence';

const NOOP = function() {};
const FEATURE_CONTEXT = 'feature_context';
const SCENARIO_CONTEXT = 'scenario_context';
const BACKGROUND_CONTEXT = 'background_context';

export default class Suite {
  constructor({ filter, beforeEachScenario, afterEachScenario, }) {
    this._scenarios = [];
    this._gherkinArray = [];
    this._filter = filter;
    this._beforeEachScenario = beforeEachScenario;
    this._afterEachScenario = afterEachScenario;
  }

  get count() {
    return this._scenarios.length;
  }

  get gherkin() {
    return this._gherkinArray.join('').concat('\n');
  }

  processQueue(queue) {
    let queueItem;
    let processorMap = {
      Feature: this::processFeature,
      Background: this::processBackground,
      Scenario: this::processScenario,
      Step: this::processStep,
    };

    if (queue.count() === 0) { return; }

    queueItem = queue.shift();

    processorMap[queueItem.constructor.name](queueItem);

    this._gherkinArray.push(queueItem.gherkin);

    this.processQueue(queue);
  }

  run(callback) {
    this._scenarios.forEach((scenario, testIndex) => {
      let before = this._beforeEachScenario || NOOP;
      let after = this._afterEachScenario || NOOP;
      let stepSequence = new StepSequence(scenario, before, after);
      let testResult = stepSequence.run();

      callback(new Result(testResult, testIndex, scenario.feature));
    });
  }
}

function processFeature(queueItem) {
  if (this._currentContext === SCENARIO_CONTEXT) {
    this._gherkinArray.push('\n');
  }
  this._currentContext = FEATURE_CONTEXT;
  this._currentFeature = queueItem;
}

function processBackground(queueItem) {
  this._currentContext = BACKGROUND_CONTEXT;
  this._currentBackground = queueItem;
}

function processScenario(queueItem) {
  this._currentContext = SCENARIO_CONTEXT;

  if (this::shouldFilterOutScenario(queueItem)) { return; }

  this._currentScenario = queueItem;
  queueItem.feature = this._currentFeature;

  if (this._currentBackground) {
    queueItem.prependBackground(this._currentBackground);
  }

  this._scenarios.push(queueItem);
}

function processStep(queueItem) {
  let isBackgroundContext = this._currentContext === BACKGROUND_CONTEXT;
  let isScenarioFilteredOut =
    !this._currentScenario || this::shouldFilterOutScenario(this._currentScenario);

  if (isBackgroundContext) {
    this._currentBackground.registerStep(queueItem);
    return;
  }

  if (isScenarioFilteredOut) {
    return;
  }

  this._currentScenario.registerStep(queueItem);
}

function shouldFilterOutScenario(scenario) {
  let filter = this._filter;
  let nameToMatch = `${this._currentFeature.name} ${scenario.name}`;

  return filter && !nameToMatch.includes(filter);
}
