import Background from 'background';
import Feature from 'feature';
import Scenario from 'scenario';
import StepDefGroup from 'step-def-group';
import Suite from 'suite';
import queue from 'queue';

const feature = queue.pusher(Feature);
const background = queue.pusher(Background);
const scenario = queue.pusher(Scenario);

export {
  StepDefGroup,
  Suite,
  background,
  feature,
  queue,
  scenario,
};
