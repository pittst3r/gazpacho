import {
  StepDefGroup,
  Suite,
  background,
  feature,
  given,
  queue,
  scenario,
  then,
  when,
  matcher,
} from 'cornichon';
import BasicSteps from './basic-steps';

export default new StepDefGroup((stepDef) => {
  let results;

  stepDef(matcher`I have defined ${'n'} successful scenarios`, (_assert, n) => {
    feature('successful feature', 'whatever');
    for (let i = 0; i < n; i++) {
      scenario(`${i}`, BasicSteps);
      then`I am successful`;
    }
  });

  stepDef(matcher`I have defined ${'n'} failing scenarios`, () => {
    feature('failing feature', 'whatever');
    scenario('failure', BasicSteps);
    then`I am not successful`;
  });

  stepDef('I have defined a scenario with a background', () => {
    feature('background feature', 'whatever');
    background(BasicSteps);
    given`I do a thing common to all scenarios`;
    scenario('success', BasicSteps);
    then`that thing should have been done`;
  });

  stepDef('I have defined a scenario using an undefined step def', () => {
    feature('undefined step def feature', 'whatever');
    scenario('foo', BasicSteps);
    when`whatever whatever I do what I want`;
  });

  stepDef('I run the suite', () => {
    results = [];
    let suite = new Suite({});
    suite.processQueue(queue);
    suite.run((result) => {
      results.push(result);
    });
  });

  stepDef('the scenarios should be successful', (assert) => {
    assert.expect(results.length || 1);
    results.forEach((result) => {
      assert.ok(result.didPass, `Expected didPass to be true but was ${result.didPass}`);
    });
  });

  stepDef('the scenarios should be unsuccessful', (assert) => {
    assert.expect(results.length || 1);
    results.forEach((result) => {
      assert.notOk(result.didPass);
    });
  });

  stepDef('an undefined step def error should be raised', (assert) => {
    assert.expect(1);
    let actual = results[0].error.message;
    let expected =
      'Step "whatever whatever I do what I want" could not be found in step defs';

    assert.equal(actual, expected);
  });
});
