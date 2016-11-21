import Feature from 'feature';
import StepDefGroup from 'step-def-group';
import BasicSteps from './basic-steps';

export default new StepDefGroup((StepDef) => {
  let definedFeature;
  let definedFeatureResult;
  let definedFeatureGherkin;

  StepDef('I have defined a successful feature', () => {
    definedFeature = new Feature('successful feature', 'whatever', ({ Scenario, }) => {
      Scenario('success', BasicSteps, ({ Then, }) => {
        Then('I am successful');
      });
    });
  });

  StepDef('I have defined a failing feature', () => {
    definedFeature = new Feature('unsuccessful feature', '', ({ Scenario, }) => {
      Scenario('failure', BasicSteps, ({ Then, }) => {
        Then('I am not successful');
      });
    });
  });

  StepDef('I have defined a feature using an undefined step def', () => {
    definedFeature = new Feature('undefined step def feature', '', ({ Scenario, }) => {
      Scenario('success', BasicSteps, ({ Then, }) => {
        Then('whatever whatever I do what I want');
      });
    });
  });

  StepDef('I have defined a feature with a Background', () => {
    definedFeature = new Feature('feature with background', 'whatever',
      ({ Scenario, Background, }) => {
        Background(BasicSteps, ({ Given, }) => {
          Given('I do a thing common to all scenarios');
        });

        Scenario('success', BasicSteps, ({ Then, }) => {
          Then('that thing should have been done');
        });
      }
    );
  });

  StepDef('I run the feature', () => {
    definedFeature.run((result) => {
      definedFeatureResult = result;
    });
  });

  StepDef('the feature should be successful', (assert) => {
    assert.ok(definedFeatureResult.didPass);
  });

  StepDef('the feature should be unsuccessful', (assert) => {
    assert.ok(!definedFeatureResult.didPass);
  });

  StepDef('an undefined step def error should be raised', (assert) => {
    assert.equal(definedFeatureResult.error.name, 'AssertionError');
    assert.equal(
      definedFeatureResult.error.message,
      'Step "whatever whatever I do what I want" could not be found in step defs'
    );
  });

  StepDef('I call the `gherkin` prop on the feature', () => {
    definedFeatureGherkin = definedFeature.gherkin;
  });

  StepDef('it should return the gherkin string', (assert) => {
    let expectedGherkin = `
Feature: successful feature
  whatever

  Scenario: success
    Then I am successful
`.trimLeft();

    assert.equal(definedFeatureGherkin, expectedGherkin);
  });

  StepDef('it should return the gherkin string with the background', (assert) => {
    let expectedGherkin = `
Feature: feature with background
  whatever

  Background:
    Given I do a thing common to all scenarios

  Scenario: success
    Then that thing should have been done
`.trimLeft();

    assert.equal(definedFeatureGherkin, expectedGherkin);
  });
});
