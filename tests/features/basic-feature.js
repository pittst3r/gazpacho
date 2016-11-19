import Feature from 'feature';
import FeatureSteps from 'tests/features/step-defs/feature-steps';

export default new Feature('Basic features', `
  In order to have a smoke test
  As a developer 
  I want to be able to define a feature that runs`,
  ({ Scenario, }) => {
    Scenario('With a passing scenario', FeatureSteps, ({ Given, When, Then, }) => {
      Given('I have defined a successful feature');
      When('I run the feature');
      Then('the feature should be successful');
    });

    Scenario('With a failing scenario', FeatureSteps, ({ Given, When, Then, }) => {
      Given('I have defined a failing feature');
      When('I run the feature');
      Then('the feature should be unsuccessful');
    });

    Scenario('With a Background', FeatureSteps, ({ Given, When, Then, }) => {
      Given('I have defined a feature with a Background');
      When('I run the feature');
      Then('the feature should be successful');
    });
  }
);
