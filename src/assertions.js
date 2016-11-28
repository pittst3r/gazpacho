import * as assert from 'assert';

export default class Assertions {
  constructor(test) {
    this.test = test;
    this.test.assertionCount = 0;
  }

  ok(expression, message) {
    assert.ok(expression, message);
    this.test.assertionCount += 1;
  }

  notOk(expression, message) {
    assert.ok(!expression, message);
    this.test.assertionCount += 1;
  }

  equal(actual, expected, message) {
    assert.equal(actual, expected, message);
    this.test.assertionCount += 1;
  }

  expect(count) {
    this.test.expectedAssertions = count;
  }
}
