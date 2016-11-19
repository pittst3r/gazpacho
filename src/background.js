export default class {
  constructor(...stepDefGroupsAndBody) {
    let body = stepDefGroupsAndBody.pop();
    let stepDefGroups = stepDefGroupsAndBody;

    this.stepNames = [];
    this.steps = [];
    this.stepDefs = {};
    this._registerSteps(body);
    this._registerStepDefs(stepDefGroups);
  }

  get fullTextForTerminal() {
    return [
      '  Background:',
      this.steps.map(sn => `    ${sn}`).join('\n'),
    ].join('\n');
  }

  _registerSteps(body) {
    let Given = this._step.bind(this, 'Given');
    let And = this._step.bind(this, 'And');

    body({ Given, And, });
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
