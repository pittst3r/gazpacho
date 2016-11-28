import { equal, } from 'assert';
import Assertions from 'assertions';
import { tail, } from 'lodash';

export default class StepDef {
  constructor(name, definition) {
    this.name = name;
    this.definition = definition;
  }

  execute(stepTemplate) {
    this.definition(new Assertions(this), ...tail(stepTemplate));

    if (!this.expectedAssertions) { return; }

    equal(
      this.assertionCount,
      this.expectedAssertions,
      `Expected ${this.expectedAssertions} assertions but received ${this.assertionCount}`
    );
  }

  matchesTemplate(template) {
    return this.name === matcher(...template);
  }
}

export function matcher(templateStrings) {
  return templateStrings.join('');
}
