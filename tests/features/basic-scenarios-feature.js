import {
  feature,
  scenario,
  given,
  when,
  then,
} from 'cornichon';
import FeatureSteps from 'tests/features/step-defs/feature-steps';

feature('Basic scenarios',
 `In order to have a smoke test
  As a developer 
  I want to be able to define a scenario that runs`);

scenario('With a passing scenario', FeatureSteps);
given`I have defined ${1} successful scenarios`;
when`I run the suite`;
then`the scenarios should be successful`;

scenario('With a failing scenario', FeatureSteps);
given`I have defined ${1} failing scenarios`;
when`I run the suite`;
then`the scenarios should be unsuccessful`;

scenario('With a background', FeatureSteps);
given`I have defined a scenario with a background`;
when`I run the suite`;
then`the scenarios should be successful`;
