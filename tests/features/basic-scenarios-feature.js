import {
  and,
  feature,
  scenario,
  given,
  when,
  then,
} from 'gazpacho';
import FeatureSteps from 'tests/features/step-defs/feature-steps';

feature('Basic scenarios',
 `In order to have a smoke test
  As a developer 
  I want to be able to define a scenario that runs`);

scenario('Mixed success', FeatureSteps);
given`I have defined ${3} successful scenarios`;
and`I have defined ${2} failing scenarios`;
when`I run the suite`;
then`${3} scenarios should be successful`;
and`${2} scenarios should be unsuccessful`;

scenario('Background', FeatureSteps);
given`I have defined a scenario with a background`;
when`I run the suite`;
then`${1} scenarios should be successful`;
