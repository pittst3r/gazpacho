import Result from 'result';
import StepSequence from 'step-sequence';

const NOOP = function() {};

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
    return this._gherkinArray.join('\n\n').concat('\n');
  }

  processQueue(queue) {
    let queueItem;
    let actionMap = {
      Feature: this._processFeature.bind(this),
      Background: this._processBackground.bind(this),
      Scenario: this._processScenario.bind(this),
    };

    if (queue.count() === 0) {
      return;
    }

    queueItem = queue.shift();

    this._gherkinArray.push(queueItem.gherkin);

    actionMap[queueItem.constructor.name](queueItem);

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

  _processFeature(queueItem) {
    this._currentFeature = queueItem;
  }

  _processBackground(queueItem) {
    this._currentBackground = queueItem;
  }

  _processScenario(queueItem) {
    if (this._shouldFilterOutScenario(queueItem)) { return; }

    queueItem.feature = this._currentFeature;

    if (this._currentBackground) {
      queueItem.prependBackground(this._currentBackground);
    }

    this._scenarios.push(queueItem);
  }

  _shouldFilterOutScenario(scenario) {
    let filter = this._filter;
    let nameToMatch = [this._currentFeature.name, scenario.name,].join(' ');

    return filter && !nameToMatch.includes(filter);
  }
}
