import StepDef from 'step-def';

export default class StepDefGroup {
  constructor(body) {
    let stepDefFactory = this._stepDefFactory.bind(this);

    this.stepDefs = {};

    body(stepDefFactory);
  }

  _stepDefFactory(name, definition) {
    this.stepDefs[name] = new StepDef(name, definition);
  }
}
