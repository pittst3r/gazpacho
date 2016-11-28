/* global QUnit */
import Suite from 'suite';

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
const queue = {
  _data: [],
  push(object) {
    this._data.push(object);
  },

  shift() {
    return this._data.shift();
  },

  count() {
    return this._data.length;
  },

  flush() {
    this._data = [];
  }
};

QUnit.module('Unit | Suite');

QUnit.test('get count', function(assert) {
  assert.expect(1);

  let suite = new Suite({});
  let featureMock = new Feature('cool feature');
  let firstScenarioMock = new Scenario('foo scenario');
  let secondScenarioMock = new Scenario('bar scenario');

  queue.flush();
  queue.push(featureMock);
  queue.push(firstScenarioMock);
  queue.push(secondScenarioMock);
  suite.processQueue(queue);

  assert.equal(suite.count, 2);
});

QUnit.test('get gherkin', function(assert) {
  assert.expect(0);
});

QUnit.test('#processQueue', function(assert) {
  assert.expect(4);

  let suite = new Suite({});
  let featureMock = new Feature('cool feature');
  let backgroundMock = new Background('sweet background');
  let firstScenarioMock = new Scenario('foo scenario');
  let secondScenarioMock = new Scenario('bar scenario');

  queue.flush();
  queue.push(featureMock);
  queue.push(backgroundMock);
  queue.push(firstScenarioMock);
  queue.push(secondScenarioMock);
  suite.processQueue(queue);

  assert.deepEqual(firstScenarioMock.feature, featureMock);
  assert.deepEqual(firstScenarioMock.name, 'foo scenario with sweet background');
  assert.deepEqual(secondScenarioMock.feature, featureMock);
  assert.deepEqual(secondScenarioMock.name, 'bar scenario with sweet background');
});
