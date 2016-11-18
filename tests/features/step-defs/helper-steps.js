import StepDefGroup from 'step-def-group';
import { setupDOM, teardownDOM, } from 'helpers/dom';

export default new StepDefGroup((StepDef) => {
  StepDef('I use the `setupDOM` helper', () => {
    setupDOM();
  });
  StepDef('there should be a global `document` object', (assert) => {
    assert.ok(document);
    assert.equal('function', typeof document.getElementById);
  });
  StepDef('there should be a global `window` object', (assert) => {
    assert.ok(window);
    assert.equal('function', typeof window.addEventListener);
  });
  StepDef('I use the `teardownDOM` helper', () => {
    teardownDOM();
  });
  StepDef('there should no longer be a global `document` object', (assert) => {
    assert.ok(!document);
  });
  StepDef('there should no longer be a global `window` object', (assert) => {
    assert.ok(!window);
  });
});
