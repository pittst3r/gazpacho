import Feature from 'feature';
import FeatureSteps from 'tests/features/step-defs/feature-steps';

export default new Feature('Missing step defs', `
  In order to work efficiently
  As a developer 
  I want to get an informative error when there is a missing step def`,
  ({ Scenario, }) => {
    Scenario('Step using undefined step def', FeatureSteps, ({ Given, When, Then, }) => {
      Given('I have defined a feature using an undefined step def');
      When('I run the feature');
      Then('an undefined step def error should be raised');
    });
  }
);
