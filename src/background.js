export default class Background {
  constructor(...stepDefGroups) {
    this.steps = [];
    this.stepDefs = [];
    this::registerStepDefs(stepDefGroups);
  }

  get gherkin() {
    return '\n  Background:\n';
  }

  registerStep(step) {
    this.steps.push(step);
  }
}

function registerStepDefs(stepDefGroups) {
  stepDefGroups.forEach((stepDefGroup) => {
    this.stepDefs = this.stepDefs.concat(stepDefGroup.stepDefs);
  });
}
