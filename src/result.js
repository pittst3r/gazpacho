export default class {
  constructor(feature, scenarioResult, testIndex) {
    this._feature = feature;
    this._scenarioResult = scenarioResult;
    this._testIndex = testIndex;
  }

  get tap() {
    return [
      this._tapStatus,
      this._tapIndex,
      this._tapDescription,
      this._tapDiagnostic,
    ].filter(t => t).join(' ');
  }

  get testNumber() {
    return this._testIndex + 1;
  }

  get error() {
    return this._scenarioResult.error;
  }

  get didPass() {
    return this._scenarioResult.didPass;
  }

  get name() {
    return `${this.featureName}: ${this._scenarioResult.name}`;
  }

  get _tapStatus() {
    return this._scenarioResult.didPass ? 'ok' : 'not ok';
  }

  get _tapIndex() {
    return this._testIndex + 1;
  }

  get _tapDescription() {
    return `${this._feature.name}: ${this._scenarioResult.name}`;
  }

  get _tapDiagnostic() {
    if (!this._scenarioResult.error) {
      return;
    }
    return `\n# Failed step: "${this._scenarioResult.error.stepName}"`;
  }
}
