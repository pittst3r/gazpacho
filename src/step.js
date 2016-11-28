export default class Step {
  constructor(type, templateStrings, ...templateValues) {
    this.type = type;
    this.templateStrings = templateStrings;
    this.templateValues = templateValues;
  }

  get template() {
    if (this.templateValues.length === 0) {
      return [this.templateStrings,];
    }
    return [this.templateStrings,].concat(this.templateValues);
  }

  get name() {
    if (this.templateValues.length === 0) {
      return this.templateStrings[0];
    }

    return this.templateStrings.reduce((name, part, i) => {
      let tempValue = this.templateValues[i] || '';
      return name + part + tempValue;
    }, '');
  }

  get gherkin() {
    return `    ${this.type} ${this.name}\n`;
  }
}
