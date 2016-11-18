/* global QUnit */
import Result from 'result';

QUnit.module('Unit | Result');

QUnit.test('it exposes a `tap` property', function(assert) {
  assert.expect(1);

  let feature = {
    name: 'feature name',
  };
  let scenarioResult = {
    name: 'scenario name',
    didPass: true,
  };
  let testIndex = 0;
  let result = new Result(feature, scenarioResult, testIndex);

  assert.equal(result.tap, 'ok 1 feature name: scenario name');
});
