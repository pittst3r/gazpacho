export default class {
  constructor(name, ...stepDefGroupsAndBody) {
    let body = stepDefGroupsAndBody.pop();
    let stepDefGroups = stepDefGroupsAndBody;

    this.stepNames = [];
    this.steps = [];
    this.stepDefs = {};
    this.name = name;
    this._registerSteps(body);
    this._registerStepDefs(stepDefGroups);
  }

  get fullTextForTerminal() {
    return [
      `  Scenario: ${this.name}`,
      this.steps.map(sn => `    ${sn}`).join('\n'),
    ].join('\n');
  }

  _registerSteps(body) {
    let Given = this._step.bind(this, 'Given');
    let When = this._step.bind(this, 'When');
    let And = this._step.bind(this, 'And');
    let Then = this._step.bind(this, 'Then');

    if (typeof body === 'function') body({ Given, And, When, Then, });
  }

  _registerStepDefs(stepDefGroups) {
    stepDefGroups.forEach((stepDefGroup) => {
      Object.assign(this.stepDefs, stepDefGroup.stepDefs);
    });
  }

  _step(stepType, stepName) {
    this.stepNames.push(stepName);
    this.steps.push(`${stepType} ${stepName}`);
  }
}
