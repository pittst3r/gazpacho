/* global QUnit */
import StepDef from 'step-def';

QUnit.module('Unit | StepDef');

QUnit.test('it runs the callback', function(assert) {
  assert.expect(1);

  let stepDef = new StepDef('cool step', function(stepAssert) {
    stepAssert.ok(true);
  });

  let assertMock = {
    ok(exp) {
      assert.ok(exp);
    },
  };

  stepDef.execute(assertMock);
});
