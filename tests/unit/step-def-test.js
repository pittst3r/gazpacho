/* global QUnit */
import { default as StepDef, matcher, } from 'step-def';

const NOOP = function() {};

QUnit.module('Unit | StepDef');

QUnit.test('#execute', function(assert) {
  assert.expect(3);

  let stepDef;

  stepDef = new StepDef('cool step', (stepAssert) => {
    assert.equal(typeof stepAssert.ok, 'function');
    assert.ok(true);
  });

  stepDef.execute();

  stepDef = new StepDef(matcher`really ${'adj'} step`, (_assert, adj) => {
    assert.equal(adj, 'cool');
  });

  stepDef.execute(transformTemplate`really ${'cool'} step`);
});

QUnit.test('#matchesTemplate', function(assert) {
  assert.expect(2);

  let stepDef;

  stepDef = new StepDef(matcher`really ${'adj'} step`, NOOP);

  assert.ok(stepDef.matchesTemplate(transformTemplate`really ${'cool'} step`));

  stepDef = new StepDef('really cool step', NOOP);

  assert.ok(stepDef.matchesTemplate(transformTemplate`really cool step`));
});

QUnit.test('matcher()', function(assert) {
  assert.expect(1);

  let actual = matcher`really ${'adj'} step`;
  let expected = 'really  step';

  assert.equal(actual, expected);
});

function transformTemplate(...taggedTemplate) {
  return taggedTemplate;
}
