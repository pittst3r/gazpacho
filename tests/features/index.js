import Suite from 'suite';
import BasicFeature from 'tests/features/basic-feature';
import PrintFeature from 'tests/features/print-feature';
import MissingStepDefFeature from 'tests/features/missing-step-def-feature';

export default new Suite([
  BasicFeature,
  PrintFeature,
  MissingStepDefFeature,
]);
