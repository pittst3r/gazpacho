/* global QUnit */
import StepSequence from 'step-sequence';

QUnit.module('Unit | StepSequence');

QUnit.test('it runs a sequence of steps using given step defs', function(assert) {
  assert.expect(3);

  let stepDefMock = {
    execute(stepAssert) {
      stepAssert.ok(false);
    },
  };

  let scenarioMock = {
    name: 'foo',
    stepNames: ['cool step',],
    stepDefs: {
      'cool step': stepDefMock,
    },
  };

  let stepSequence = new StepSequence(scenarioMock);

  let expectedResultObject = {
    didPass: false,
    error: {
      actual: false,
      expected: true,
      generatedMessage: true,
      message: 'false == true',
      name: 'AssertionError',
      operator: '==',
    },
    name: 'foo',
  };

  let actualResultObject = stepSequence.run();

  assert.notOk(actualResultObject.didPass);
  assert.equal(actualResultObject.name, expectedResultObject.name);
  assert.equal(actualResultObject.error.constructor.name, 'AssertionError');
});

QUnit.test('it runs a `before` and `after` hook around the first step', function(assert) {
  assert.expect(2);

  let counter = 0;
  let before = function before() {
    assert.equal(counter, 0);
    counter += 1;
  };
  let after = function before() {
    assert.equal(counter, 2);
  };
  let stepDefMock = {
    execute(stepAssert) {
      counter += 1;
      stepAssert.ok(true);
    },
  };
  let scenarioMock = {
    name: 'foo',
    stepNames: ['cool step',],
    stepDefs: {
      'cool step': stepDefMock,
    },
  };

  let stepSequence = new StepSequence(scenarioMock, before, after);

  stepSequence.run();
});
