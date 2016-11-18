/* global QUnit */
import Feature from 'feature';

const NOOP = function() {};

QUnit.module('Unit | Feature');

QUnit.test('it exposes a `name` property', function(assert) {
  assert.expect(1);

  let feature = new Feature('foo', 'bar', () => {});

  assert.equal(feature.name, 'foo');
});

QUnit.test('it exposes a `description` property', function(assert) {
  assert.expect(1);

  let feature = new Feature('foo', 'bar', () => {});

  assert.equal(feature.description, 'bar');
});

QUnit.test('it runs given scenarios', function(assert) {
  assert.expect(4);

  let StepDefMock = {
    execute() {
      assert.ok(true);
    },
  };
  let SexyStepDefGroup = {
    stepDefs: {
      'I go to planet Sexor': StepDefMock,
      'sexy lightning always strikes twice': StepDefMock,
    },
  };
  let feature = new Feature('foo', 'bar', (Scenario) => {
    Scenario('baz', SexyStepDefGroup, ({ When, Then, }) => {
      When('I go to planet Sexor');
      Then('sexy lightning always strikes twice');
    });
  });

  feature.run((scenarioResult) => {
    assert.ok(scenarioResult.didPass);
    assert.equal(scenarioResult.name, 'baz');
  });
});

QUnit.test('it has a beforeEachScenario hook', function(assert) {
  assert.expect(2);

  let feature = new Feature('foo', '', (Scenario) => {
    Scenario('bar');
    Scenario('baz');
  });

  feature.beforeEachScenario = function beforeEachScenario() {
    assert.ok(true);
  };

  feature.run(NOOP);
});

QUnit.test('it has an afterEachScenario hook', function(assert) {
  assert.expect(2);

  let feature = new Feature('foo', '', (Scenario) => {
    Scenario('bar');
    Scenario('baz');
  });

  feature.afterEachScenario = function afterEachScenario() {
    assert.ok(true);
  };

  feature.run(NOOP);
});
