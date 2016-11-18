import Feature from 'feature';
import StepDefGroup from 'step-def-group';
import BasicSteps from './basic-steps';

export default new StepDefGroup((StepDef) => {
  let definedFeature;
  let definedFeatureResult;
  let caughtError;

  StepDef('I have defined a successful feature', () => {
    definedFeature = new Feature('successful feature', '', (Scenario) => {
      Scenario('success', BasicSteps, ({ Then, }) => {
        Then('I am successful');
      });
    });
  });

  StepDef('I have defined a failing feature', () => {
    definedFeature = new Feature('unsuccessful feature', '', (Scenario) => {
      Scenario('failure', BasicSteps, ({ Then, }) => {
        Then('I am not successful');
      });
    });
  });

  StepDef('I have defined a feature using an undefined step def', () => {
    definedFeature = new Feature('undefined step def feature', '', (Scenario) => {
      Scenario('success', BasicSteps, ({ Then, }) => {
        Then('whatever whatever I do what I want');
      });
    });
  });

  StepDef('I run the feature', () => {
    try {
      definedFeature.run((result) => {
        definedFeatureResult = result;
      });
    } catch(e) {
      caughtError = e;
    }
  });

  StepDef('the feature should be successful', (assert) => {
    assert.ok(definedFeatureResult.didPass);
  });

  StepDef('the feature should be unsuccessful', (assert) => {
    assert.ok(!definedFeatureResult.didPass);
  });

  StepDef('an undefined step def error should be raised', (assert) => {
    assert.equal(caughtError.name, 'AssertionError');
    assert.equal(
      caughtError.message,
      'Step "whatever whatever I do what I want" could not be found in step defs'
    );
  });
});
