import {
  Suite,
  queue,
  StepDefGroup,
} from 'cornichon';

export default new StepDefGroup((stepDef) => {
  let results;

  stepDef('I run the suite with a matching filter', () => {
    results = [];
    let filter = 'successful feature bar';
    let suite = new Suite({ filter, });
    suite.processQueue(queue);
    suite.run((result) => {
      results.push(result);
    });
  });

  stepDef('only matched scenarios should run', (assert) => {
    assert.equal(results.length, 1);
    assert.equal(results[0].name, 'successful feature: bar');
  });
});
