/* global QUnit */
import Scenario from 'scenario';

QUnit.module('Unit | Scenario');

QUnit.test('get gherkin', function(assert) {
  assert.expect(1);

  let scenario = new Scenario('cool scenario');

  assert.equal(scenario.gherkin, '\n  Scenario: cool scenario\n');
});

QUnit.test('#registerStep', function(assert) {
  assert.expect(1);

  let scenario = new Scenario('cool scenario');
  let step = 'whatever';

  scenario.registerStep(step);

  assert.deepEqual(scenario.steps, [step,]);
});

QUnit.test('#prependBackground', function(assert) {
  assert.expect(2);

  let scenario = new Scenario('cool scenario');
  let background = {
    steps: ['foo step',],
    stepDefs: ['foo step def',],
  };

  scenario.steps = ['bar step',];
  scenario.stepDefs = ['bar step def',];

  scenario.prependBackground(background);

  assert.deepEqual(scenario.steps, ['foo step', 'bar step',]);
  assert.deepEqual(scenario.stepDefs, ['foo step def', 'bar step def',]);
});
