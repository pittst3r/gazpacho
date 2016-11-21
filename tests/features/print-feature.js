import Feature from 'feature';
import FeatureSteps from 'tests/features/step-defs/feature-steps';

export default new Feature('Print', `
  In order to easily view features
  As a developer 
  I want to have access to the gherkin output of a feature`,
  ({ Scenario, }) => {
    Scenario('Without a background', FeatureSteps, ({ Given, When, Then, }) => {
      Given('I have defined a successful feature');
      When('I call the `gherkin` prop on the feature');
      Then('it should return the gherkin string');
    });

    Scenario('With a background', FeatureSteps, ({ Given, When, Then, }) => {
      Given('I have defined a feature with a Background');
      When('I call the `gherkin` prop on the feature');
      Then('it should return the gherkin string with the background');
    });
  }
);
