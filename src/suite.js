import Result from 'result';

const NOOP = function() {};

export default class {
  constructor(optionsOrFeatures, features) {
    let options = {};

    if (features) {
      options = optionsOrFeatures;
    } else {
      features = optionsOrFeatures;
    }

    this._options = options;
    this._features = features;
  }

  get count() {
    return this._features.reduce((memo, f) => memo + f.scenarioCount, 0);
  }

  get string() {
    return this._features.map(f => f.string).join('\n\n');
  }

  get features() {
    return this._features;
  }

  run(...args) {
    let callback = args.pop();
    let filter = args[0];
    let testIndex = 0;
    let features = this._features;

    if (filter) {
      features = features.filter((feature) => {
        return feature.name.includes(filter);
      });
    }

    features.forEach((feature) => {
      feature.beforeEachScenario = this._options.beforeEachScenario || NOOP;
      feature.afterEachScenario = this._options.afterEachScenario || NOOP;
      feature.run((scenarioResult) => {
        callback(new Result(feature, scenarioResult, testIndex));
        testIndex += 1;
      });
    });
  }
}
