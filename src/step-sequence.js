import * as assert from 'assert';

const { assign, } = Object;

export default class StepSequence {
  constructor({ steps, stepDefs, name, }, before, after) {
    this._after = after;
    this._before = before;
    this._name = name;
    this._stepDefs = stepDefs;
    this._steps = steps;
  }

  run() {
    let name = this._name;
    let sequenceResult = { name, };

    this._before();
    assign(sequenceResult, this::runSteps());
    this._after();

    return sequenceResult;
  }
}

function runSteps() {
  let didPass = true;
  let error;

  try {
    this::executeStepDefsWithSteps();
  } catch(e) {
    error = e;
    error.stepName = this.currentStep;
    didPass = false;
  }

  return { didPass, error, };
}

function executeStepDefsWithSteps() {
  this._steps.forEach(step => {
    let stepDef = this::findStepDefFromStep(step);
    this.currentStep = step.name;
    stepDef.execute(step.template);
  });
}

function findStepDefFromStep(step) {
  let stepDef = this._stepDefs.find(sd => sd.matchesTemplate(step.template));

  assert.ok(stepDef, `Step "${step.name}" could not be found in step defs`);

  return stepDef;
}
