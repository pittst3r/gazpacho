import StepDefGroup from 'step-def-group';

export default new StepDefGroup((StepDef) => {
  StepDef('I am successful', (assert) => {
    assert.ok(true);
  });

  StepDef('I am not successful', (assert) => {
    assert.ok(false);
  });
});
