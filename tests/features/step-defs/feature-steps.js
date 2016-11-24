import {
  StepDefGroup,
  Suite,
  background,
  feature,
  queue,
  scenario,
} from 'cornichon';
import BasicSteps from './basic-steps';

export default new StepDefGroup((stepDef) => {
  let results;

  stepDef('I have defined a successful scenario', () => {
    feature('successful feature', 'whatever');
    scenario('success', BasicSteps, ({ then, }) => {
      then('I am successful');
    });
  });

  stepDef('I have defined a failing scenario', () => {
    feature('failing feature', 'whatever');
    scenario('failure', BasicSteps, ({ then, }) => {
      then('I am not successful');
    });
  });

  stepDef('I have defined a scenario with a background', () => {
    feature('background feature', 'whatever');
    background(BasicSteps, ({ given, }) => {
      given('I do a thing common to all scenarios');
    });
    scenario('success', BasicSteps, ({ then, }) => {
      then('that thing should have been done');
    });
  });

  stepDef('I have defined some scenarios', () => {
    feature('successful feature', 'whatever');
    scenario('foo', BasicSteps, ({ then, }) => {
      then('I am successful');
    });
    scenario('bar', BasicSteps, ({ then, }) => {
      then('I am successful');
    });
  });

  stepDef('I run the suite', () => {
    results = [];
    let suite = new Suite({});
    suite.processQueue(queue);
    suite.run((result) => {
      results.push(result);
    });
  });

  stepDef('the scenario should be successful', (assert) => {
    results.forEach((result) => {
      assert.ok(result.didPass);
    });
  });

  stepDef('the scenario should be unsuccessful', (assert) => {
    results.forEach((result) => {
      assert.ok(!result.didPass);
    });
  });
});
