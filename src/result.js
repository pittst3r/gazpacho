export default class Result {
  constructor(scenarioResult, testIndex, feature) {
    this._scenarioResult = scenarioResult;
    this._testIndex = testIndex;
    this._feature = feature;
  }

  get tap() {
    return [
      this._tapStatus,
      this._tapIndex,
      this._tapDescription,
      this._tapDiagnostic,
    ].filter(t => t.length > 0).join(' ');
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
    return `${this._feature.name}: ${this._scenarioResult.name}`;
  }

  get _tapStatus() {
    return this._scenarioResult.didPass ? 'ok' : 'not ok';
  }

  get _tapIndex() {
    return (this._testIndex + 1).toString();
  }

  get _tapDescription() {
    return this.name;
  }

  get _tapDiagnostic() {
    let error = this._scenarioResult.error;

    if (!error) {
      return '';
    }

    return [
      null,
      `# Failed step: "${error.stepName}"`,
      `# ${error.name}: ${error.message}`,
    ].join('\n');
  }
}
