/* global QUnit */
import Scenario from 'scenario';

QUnit.module('Unit | Scenario');

QUnit.test('it exposes a `steps` property', function(assert) {
  assert.expect(1);

  let scenario = new Scenario('cool scenario', ({ When, Then, }) => {
    When('foo');
    Then('bar');
  });

  let actualSteps = scenario.steps;
  let expectedSteps = ['When foo', 'Then bar',];

  assert.deepEqual(actualSteps, expectedSteps);
});

QUnit.test('it exposes a `stepNames` property', function(assert) {
  assert.expect(1);

  let scenario = new Scenario('cool scenario', ({ When, Then, }) => {
    When('foo');
    Then('bar');
  });

  let actualSteps = scenario.stepNames;
  let expectedSteps = ['foo', 'bar',];

  assert.deepEqual(actualSteps, expectedSteps);
});

QUnit.test('it exposes a `name` property', function(assert) {
  assert.expect(1);

  let scenario = new Scenario('cool scenario', () => {});

  assert.equal(scenario.name, 'cool scenario');
});

QUnit.test('it exposes a `stepDefs` property', function(assert) {
  assert.expect(1);

  let StepDefMock = 'step def mock';
  let SweetStepDefGroup = {
    stepDefs: {
      'foo': StepDefMock,
      'bar': StepDefMock,
    },
  };
  let scenario = new Scenario('cool scenario', SweetStepDefGroup, ({ When, Then, }) => {
    When('foo');
    Then('bar');
  });
  let actualStepDefs = scenario.stepDefs;
  let expectedStepDefs = SweetStepDefGroup.stepDefs;

  assert.deepEqual(actualStepDefs, expectedStepDefs);
});
