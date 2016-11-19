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

  set beforeEachScenario(value) {
    this._beforeEachScenario = value;
  }

  set afterEachScenario(value) {
    this._afterEachScenario = value;
  }

  get fullTextForTerminal() {
    return [
      `Feature: ${this.name}`,
      this._descriptionLines.map(line => `  ${line}`).join('\n'),
      null,
      this._scenarios.map(s => s.fullTextForTerminal).join('\n\n'),
    ].join('\n');
  }

  run(scenarioCallback) {
    this._scenarios.forEach((scenario, testIndex) => {
      let before = this._beforeEachScenario;
      let after = this._afterEachScenario;
      let stepSequence = new StepSequence(scenario, before, after);
      let testResult = stepSequence.run();
      scenarioCallback(testResult, testIndex);
    });
  }

  get _descriptionLines() {
    return this.description.split('\n').map(line => line.trim());
  }

  _registerScenarios(body) {
    let scenario = this._addScenario.bind(this);

    body(scenario);
  }

  _addScenario(...args) {
    this._scenarios.push(new Scenario(...args));
  }
}
