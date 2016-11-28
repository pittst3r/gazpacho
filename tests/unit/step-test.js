/* global QUnit */
import Step from 'step';

QUnit.module('Unit | Step');

QUnit.test('get name', function(assert) {
  assert.expect(2);

  let simpleStep = new Step('Given', ...transformTemplate`foo`);
  let complexStep = new Step('Given', ...transformTemplate`foo ${'bar'} baz`);

  assert.equal(simpleStep.name, 'foo');
  assert.equal(complexStep.name, 'foo bar baz');
});

QUnit.test('get template', function(assert) {
  assert.expect(2);

  let simpleStep = new Step('Given', ...transformTemplate`foo`);
  let complexStep = new Step('Given', ...transformTemplate`foo ${'bar'} baz`);

  assert.deepEqual(simpleStep.template, [['foo',],]);
  assert.deepEqual(complexStep.template, [['foo ', ' baz',], 'bar',]);
});

QUnit.test('get gherkin', function(assert) {
  assert.expect(1);

  let step = new Step('Given', transformTemplate`foo`);

  assert.equal(step.gherkin, '    Given foo\n');
});

function transformTemplate(...template) {
  return template;
}
