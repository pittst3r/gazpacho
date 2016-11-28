import {
  feature,
  scenario,
  given,
  when,
  then,
} from 'cornichon';
import FeatureSteps from 'tests/features/step-defs/feature-steps';

feature('Missing step defs',
 `In order to work efficiently
  As a developer 
  I want to get an informative error when there is a missing step def`);

scenario('Using undefined step def', FeatureSteps);
given`I have defined a scenario using an undefined step def`;
when`I run the suite`;
then`an undefined step def error should be raised`;
