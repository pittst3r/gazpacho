import {
  feature,
  scenario,
} from 'cornichon';
import FeatureSteps from 'tests/features/step-defs/feature-steps';

feature('Basic scenarios', `
  In order to have a smoke test
  As a developer 
  I want to be able to define a scenario that runs`
);

scenario('With a passing scenario', FeatureSteps, ({ given, when, then, }) => {
  given('I have defined a successful scenario');
  when('I run the suite');
  then('the scenario should be successful');
});

scenario('With a failing scenario', FeatureSteps, ({ given, when, then, }) => {
  given('I have defined a failing scenario');
  when('I run the suite');
  then('the scenario should be unsuccessful');
});

scenario('With a background', FeatureSteps, ({ given, when, then, }) => {
  given('I have defined a scenario with a background');
  when('I run the suite');
  then('the scenario should be successful');
});
