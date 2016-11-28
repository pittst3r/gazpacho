/* global QUnit */
import StepDefGroup from 'step-def-group';

QUnit.module('Unit | StepDefGroup');

QUnit.test('it exposes a `stepDefs` property', function(assert) {
  assert.expect(2);

  let group = new StepDefGroup((stepDef) => {
    stepDef('foo', 'bar');
  });
  let actualStepDefs = group.stepDefs;
  let expectedStepDefs = [
    {
      name: 'foo',
      definition: 'bar',
    },
  ];

  assert.equal(actualStepDefs[0].name, expectedStepDefs[0].name);
  assert.equal(actualStepDefs[0].definition, expectedStepDefs[0].definition);
});
