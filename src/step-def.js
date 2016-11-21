export default class StepDef {
  constructor(name, definition) {
    this.name = name;
    this.definition = definition;
  }

  execute(assert) {
    this.definition(assert);
  }
}
