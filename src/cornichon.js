import Background from 'background';
import Feature from 'feature';
import Scenario from 'scenario';
import StepDefGroup from 'step-def-group';
import Step from 'step';
import Suite from 'suite';
import queue from 'queue';
import { matcher, } from 'step-def';

// Organization
const feature = queue.pusher(Feature);
const background = queue.pusher(Background);
const scenario = queue.pusher(Scenario);

// Steps
const given = queue.pusher(Step, 'Given');
const when = queue.pusher(Step, 'When');
const then = queue.pusher(Step, 'Then');
const and = queue.pusher(Step, 'And');

export {
  StepDefGroup,
  Suite,
  and,
  background,
  feature,
  given,
  matcher,
  queue,
  scenario,
  then,
  when,
};
