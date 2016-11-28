import {
  feature,
  given,
  scenario,
  then,
  when,
} from 'cornichon';
import FeatureSteps from 'tests/features/step-defs/feature-steps';
import FilterSteps from 'tests/features/step-defs/filter-steps';

feature('Filtering',
 `In order to speed development
  As a developer 
  I want to be able to filter the suite`);

scenario('Filter with match', FilterSteps, FeatureSteps);
given('I have defined some scenarios');
when('I run the suite with a matching filter');
then('only matched scenarios should run');
