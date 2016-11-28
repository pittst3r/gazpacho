import StepDef from 'step-def';

export default class StepDefGroup {
  constructor(body) {
    this.stepDefs = [];
    body(this::stepDefFactory);
  }
}

function stepDefFactory(name, definition) {
  this.stepDefs.push(new StepDef(name, definition));
}
