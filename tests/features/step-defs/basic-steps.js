import StepDefGroup from 'step-def-group';

let thing;

export default new StepDefGroup((StepDef) => {
  StepDef('I am successful', (assert) => {
    assert.ok(true);
  });

  StepDef('I am not successful', (assert) => {
    assert.ok(false);
  });

  StepDef('I do a thing common to all scenarios', () => {
    thing = true;
  });

  StepDef('that thing should have been done', (assert) => {
    assert.ok(thing);
  });
});
