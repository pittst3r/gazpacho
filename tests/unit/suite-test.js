/* global QUnit */
import Suite from 'suite';

const {
  module,
  test,
} = QUnit;
class Feature {
  constructor(name) {
    this.name = name;
  }
}
class Background {
  constructor(name) {
    this.name = name;
  }
}
class Scenario {
  constructor(name) {
    this.name = name;
  }
  prependBackground(background) {
    this.name = `${this.name} with ${background.name}`;
  }
}

module('Unit | Suite');

test('#count', function(assert) {
  assert.expect(1);

  let suite = new Suite();

  suite.scenarios = [1, 2, 3];

  assert.equal(suite.count, 3);
});

test('#gherkin', function(assert) {
  assert.expect(0);
});

test('#processQueue', function(assert) {
  assert.expect(4);

  let suite = new Suite();
  let featureMock = new Feature('cool feature');
  let backgroundMock = new Background('sweet background');
  let firstScenarioMock = new Scenario('foo scenario');
  let secondScenarioMock = new Scenario('bar scenario');
  let queue = [
    featureMock,
    backgroundMock,
    firstScenarioMock,
    secondScenarioMock,
  ];

  suite.processQueue(queue);

  assert.deepEqual(firstScenarioMock.feature, featureMock);
  assert.deepEqual(firstScenarioMock.name, 'foo scenario with sweet background');
  assert.deepEqual(secondScenarioMock.feature, featureMock);
  assert.deepEqual(secondScenarioMock.name, 'bar scenario with sweet background');
});
