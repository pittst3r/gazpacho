import StepSequence from 'step-sequence';
import Scenario from 'scenario';

export default class {
  constructor(name, description, body) {
    this._name = name;
    this._description = description;
    this._scenarios = [];
    this._registerScenarios(body);
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description
      .trim()
      .split('\n')
      .map(l => l.trim())
      .join('\n');
  }

  get scenarios() {
    return this._scenarios;
  }

  get scenarioCount() {
    return this._scenarios.length;
  }

  run(scenarioCallback) {
    this._scenarios.forEach((scenario, testIndex) => {
      let before = this.beforeEachScenario;
      let after = this.afterEachScenario;
      let stepSequence = new StepSequence(scenario, before, after);
      let testResult = stepSequence.run();
      scenarioCallback(testResult, testIndex);
    });
  }

  _registerScenarios(body) {
    let scenario = this._addScenario.bind(this);

    body(scenario);
  }

  _addScenario(...args) {
    this._scenarios.push(new Scenario(...args));
  }
}
