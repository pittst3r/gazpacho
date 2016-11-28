/* global QUnit */
import StepSequence from 'step-sequence';

const NOOP = function() {};

QUnit.module('Unit | StepSequence');

QUnit.test('#run runs a sequence of steps using given step defs', function(assert) {
  assert.expect(2);

  let stepDefMock = {
    execute() {
      assert.ok(true);
    },
    matchesTemplate() {
      return true;
    }
  };

  let stepMock = {
    template: [['really ', ' step',], 'cool',],
    name: 'really cool step',
  };

  let scenarioMock = {
    name: 'foo',
    steps: [stepMock,],
    stepDefs: [stepDefMock,],
  };

  let stepSequence = new StepSequence(scenarioMock, NOOP, NOOP);

  let actualResultObject = stepSequence.run();

  assert.ok(actualResultObject.didPass);
});

QUnit.test('#run runs a `before` and `after` hook around the first step', function(assert) {
  assert.expect(3);

  let counter = 0;
  let before = function before() {
    assert.equal(counter, 0);
    counter += 1;
  };
  let after = function before() {
    assert.equal(counter, 2);
  };
  let stepDefMock = {
    execute() {
      assert.equal(counter, 1);
      counter += 1;
    },
    matchesTemplate() {
      return true;
    },
  };
  let stepMock = {};
  let scenarioMock = {
    name: 'foo',
    steps: [stepMock,],
    stepDefs: [stepDefMock,],
  };

  let stepSequence = new StepSequence(scenarioMock, before, after);

  stepSequence.run();
});

QUnit.test('#run validates steps against available step defs', function(assert) {
  assert.expect(2);

  let stepDefMock = {
    execute() {
      assert.ok(true);
    },
    matchesTemplate() {
      return false;
    }
  };

  let stepMock = {
    template: [['really ', ' step',], 'cool',],
    name: 'really cool step',
  };

  let scenarioMock = {
    name: 'foo',
    steps: [stepMock,],
    stepDefs: [stepDefMock,],
  };

  let stepSequence = new StepSequence(scenarioMock, NOOP, NOOP);

  let actualResultObject = stepSequence.run();

  assert.notOk(actualResultObject.didPass);
  assert.equal(actualResultObject.error.message, 'Step "really cool step" could not be found in step defs');
});
