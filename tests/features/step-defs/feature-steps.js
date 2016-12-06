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
} from 'gazpacho';
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

  stepDef(matcher`I have defined ${'n'} failing scenarios`, (_assert, n) => {
    feature('failing feature', 'whatever');
    for (let i = 0; i < n; i++) {
      scenario(`${i}`, BasicSteps);
      then`I am not successful`;
    }
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

  stepDef(matcher`${'n'} scenarios should be successful`, (assert, n) => {
    assert.expect(1);

    let successfulResults = results.filter(result => result.didPass);

    assert.equal(successfulResults.length, n);
  });

  stepDef(matcher`${'n'} scenarios should be unsuccessful`, (assert, n) => {
    assert.expect(1);

    let unsuccessfulResults = results.filter(result => !result.didPass);

    assert.equal(unsuccessfulResults.length, n);
  });

  stepDef('an undefined step def error should be raised', (assert) => {
    assert.expect(1);
    let actual = results[0].error.message;
    let expected =
      'Step "whatever whatever I do what I want" could not be found in step defs';

    assert.equal(actual, expected);
  });
});
