export default class Scenario {
  constructor(name, ...stepDefGroups) {
    this.name = name;
    this.steps = [];
    this.stepDefs = [];
    this::registerStepDefs(stepDefGroups);
  }

  get gherkin() {
    return `\n  Scenario: ${this.name}\n`;
  }

  registerStep(step) {
    this.steps.push(step);
  }

  prependBackground(background) {
    this.steps = background.steps.concat(this.steps);
    this.stepDefs = background.stepDefs.concat(this.stepDefs);
  }
}

function registerStepDefs(stepDefGroups) {
  stepDefGroups.forEach((stepDefGroup) => {
    this.stepDefs = this.stepDefs.concat(stepDefGroup.stepDefs);
  });
}
