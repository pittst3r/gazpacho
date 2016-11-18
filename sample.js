import Feature from "cukes/feature";

import {
  forms,
  billpay: {
    singlepayPage,
  },
} from "pages";

export default new Feature("User pays a bill from singlepay", `
  In order to pay a bill
  As a user with billpay
  I want to click on a payee to pay a bill through singlepay
  `,
  BasicSteps, SinglepaySteps, (Scenario) => {
    Scenario('User is enrolled in iPay', IpaySteps, ({ Given, And, When, Then }) => {
      Given("My environment is configured with iPay");
      And("I visit a singlepay page");
      And("fill out the form");
      And("click submit");
      Then("I should be taken to a payment confirmation page");
      And("I should see accurate details of my payment");
    });
  }
);

const BasicSteps = new StepDefGroup((StepDef) => {
  StepDef("click submit", function() {
    forms.clickSubmit();
  });
}

const IpaySteps = new StepDefGroup((StepDef) => {
  StepDef("environment is configured with iPay", function() {
    // ...
  });
}

const SinglepaySteps = new StepDefGroup((StepDef) => {
  StepDef("visit a singlepay page", function() {
    singlepayPage.visit();
  });

  stepDef("fill out the form", function() {
    singlepayPage.fillInAmount();
    singlepayPage.selectAccount();
    singlepayPage.selectFreeDeliveryMethod();
    singlepayPage.selectFirstValidDate();
  });
}
