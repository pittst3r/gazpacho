export default class Feature {
  constructor(name, description) {
    this._name = name;
    this._description = description;
    this._scenarios = [];
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description
      .trim()
      .split('\n')
      .map(l => l.trim())
      .join('\n');
  }

  get gherkin() {
    let gherkin = [];

    gherkin.push(`Feature: ${this.name}`);
    if (this._descriptionLines.length > 0) {
      let description = this._descriptionLines.map(line => `  ${line}`).join('\n');
      gherkin.push(description);
    }

    return gherkin.join('\n');
  }

  get _descriptionLines() {
    return this.description.split('\n').map(line => line.trim());
  }
}
