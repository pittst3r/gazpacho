/* global QUnit */
import StepDefGroup from 'step-def-group';

QUnit.module('Unit | StepDefGroup');

QUnit.test('it exposes a `stepDefs` property', function(assert) {
  assert.expect(2);

  let group = new StepDefGroup((stepDef) => {
    stepDef('foo', 'bar');
  });
  let actualStepDefs = group.stepDefs;
  let expectedStepDefs = {
    'foo': {
      name: 'foo',
      definition: 'bar',
    },
  };

  assert.equal(actualStepDefs.foo.name, expectedStepDefs.foo.name);
  assert.equal(actualStepDefs.foo.definition, expectedStepDefs.foo.definition);
});
