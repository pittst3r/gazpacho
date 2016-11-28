import {
  feature,
  scenario,
  given,
  when,
  then,
} from 'cornichon';
import FeatureSteps from 'tests/features/step-defs/feature-steps';
import PrintSteps from 'tests/features/step-defs/print-steps';

feature('Print',
 `In order to easily view features
  As a developer 
  I want to see the gherkin of the whole suite`);

scenario('Without a background', FeatureSteps, PrintSteps);
given`I have defined ${1} successful scenarios`;
when`I call the gherkin prop on the suite`;
then`it should return the gherkin string`;

scenario('With a background', FeatureSteps, PrintSteps);
given`I have defined a scenario with a background`;
when`I call the gherkin prop on the suite`;
then`it should return the gherkin string with the background`;
