export default class Scenario {
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

  get gherkin() {
    return [
      `  Scenario: ${this.name}`,
      this.steps.map(sn => `    ${sn}`).join('\n'),
    ].join('\n');
  }

  prependBackground(background) {
    this.stepNames = background.stepNames.concat(this.stepNames);
    Object.assign(this.stepDefs, background.stepDefs);
  }

  _registerSteps(body) {
    let given = this._step.bind(this, 'Given');
    let when = this._step.bind(this, 'When');
    let and = this._step.bind(this, 'And');
    let then = this._step.bind(this, 'Then');

    body({ given, and, when, then, });
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
