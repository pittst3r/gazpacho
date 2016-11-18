import * as assert from 'assert';

const NOOP = function() {};

export default class {
  constructor({ stepNames, stepDefs, name, }, before, after) {
    this.stepNames = stepNames;
    this.stepDefs = stepDefs;
    this.name = name;
    this.sequenceAssert = assert;
    this.before = before || NOOP;
    this.after = after || NOOP;
  }

  run() {
    let name = this.name;
    let didPass = true;
    let error;

    this._validateStepsWithStepDefs();

    try {
      this.before();
      this._executeStepsWithStepDefs();
      this.after();
    } catch(e) {
      error = e;
      error.stepName = this.currentStep;
      didPass = false;
    }

    return { name, didPass, error, };
  }

  _validateStepsWithStepDefs() {
    let {
      stepNames,
      stepDefs,
    } = this;
    let stepDefNames = Object.getOwnPropertyNames(stepDefs);

    stepNames.forEach((stepName) => {
      assert.ok(
        stepDefNames.includes(stepName),
        `Step "${stepName}" could not be found in step defs`
      );
    });
  }

  _executeStepsWithStepDefs() {
    let {
      stepNames,
      stepDefs,
      sequenceAssert,
    } = this;

    stepNames.forEach((stepName) => {
      let stepDef = stepDefs[stepName];
      this.currentStep = stepName;
      stepDef.execute(sequenceAssert);
    });
  }
}
