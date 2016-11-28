import StepDefGroup from 'step-def-group';

export default new StepDefGroup((stepDef) => {
  let thing;

  stepDef('I am successful', (assert) => {
    assert.ok(true);
  });

  stepDef('I am not successful', (assert) => {
    assert.ok(false);
  });

  stepDef('I do a thing common to all scenarios', () => {
    thing = true;
  });

  stepDef('that thing should have been done', (assert) => {
    assert.ok(thing);
  });
});
