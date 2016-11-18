import Feature from 'feature';
import HelperSteps from 'tests/features/step-defs/helper-steps';

export default new Feature('Setup and teardown helpers', `
  In order to have an environment for the program to run in
  As a developer
  I want to be able to set up a DOM`,
  (Scenario) => {
    Scenario('Setup and teardown', HelperSteps, ({ When, And, Then, }) => {
      When('I use the `setupDOM` helper');
      Then('there should be a global `document` object');
      And('there should be a global `window` object');
      When('I use the `teardownDOM` helper');
      Then('there should no longer be a global `document` object');
      And('there should no longer be a global `window` object');
    });
  }
);
