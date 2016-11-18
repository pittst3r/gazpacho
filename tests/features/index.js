import Suite from 'suite';
import BasicFeature from 'tests/features/basic-feature';
import MissingStepDefFeature from 'tests/features/missing-step-def-feature';
import SetupFeature from 'tests/features/setup-feature';

export default new Suite([
  BasicFeature,
  MissingStepDefFeature,
  SetupFeature,
]);
