/* global QUnit */
import Suite from 'suite';

QUnit.module('Unit | Suite');

QUnit.test('it runs each given feature', function(assert) {
  assert.expect(2);

  let FeatureMockOne = {
    run() {
      assert.ok(true);
    },
  };
  let FeatureMockTwo = {
    run() {
      assert.ok(true);
    },
  };
  let suite = new Suite([
    FeatureMockOne,
    FeatureMockTwo,
  ]);

  suite.run(() => {});
});

QUnit.test('it provides tap result data every time a scenario is run', function(assert) {
  assert.expect(1);

  let FeatureMockOne = {
    name: 'Feature one',
    run(callback) {
      callback({
        didPass: true,
        name: 'scenario name',
      });
    },
  };
  let FeatureMockTwo = {
    name: 'Feature two',
    run(callback) {
      callback({
        didPass: false,
        name: 'scenario name',
      });
    },
  };
  let suite = new Suite([
    FeatureMockOne,
    FeatureMockTwo,
  ]);
  let actualResults = [];
  let expectedResults = [
    'ok 1 Feature one: scenario name',
    'not ok 2 Feature two: scenario name',
  ];

  suite.run(({ tap, }) => {
    actualResults.push(tap);
  });

  assert.deepEqual(actualResults, expectedResults);
});

QUnit.test('it can filter which features to run by feature name', function(assert) {
  assert.expect(1);

  let FeatureMockOne = {
    name: 'Feature one',
    run(callback) {
      callback({
        didPass: true,
        name: 'scenario name',
      });
    },
  };
  let FeatureMockTwo = {
    name: 'Feature two',
    run(callback) {
      callback({
        didPass: true,
        name: 'scenario name',
      });
    },
  };
  let suite = new Suite([
    FeatureMockOne,
    FeatureMockTwo,
  ]);
  let actualResults = [];
  let expectedResults = [
    'ok 1 Feature one: scenario name',
  ];

  suite.run('Feature one', ({ tap, }) => {
    actualResults.push(tap);
  });

  assert.deepEqual(actualResults, expectedResults);
});

QUnit.test('it has a beforeEachScenario hook', function(assert) {
  assert.expect(1);

  let beforeEachScenario = function beforeEachScenario() {};
  let options = { beforeEachScenario, };
  let FeatureMock = {
    name: 'Feature one',
    run() {
      assert.equal(this.beforeEachScenario, beforeEachScenario);
    },
  };
  let suite = new Suite(options, [
    FeatureMock,
  ]);

  suite.run();
});

QUnit.test('it has an afterEachScenario hook', function(assert) {
  assert.expect(1);

  let afterEachScenario = function afterEachScenario() {};
  let options = { afterEachScenario, };
  let FeatureMock = {
    name: 'Feature one',
    run() {
      assert.equal(this.afterEachScenario, afterEachScenario);
    },
  };
  let suite = new Suite(options, [
    FeatureMock,
  ]);

  suite.run();
});
