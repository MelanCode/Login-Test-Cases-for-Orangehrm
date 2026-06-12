class LoginPage {

  inputUsername() {
    return cy.get('input[name="username"]');
  }

  inputPassword() {
    return cy.get('input[name="password"]');
  }

  buttonSubmit() {
    return cy.get('button[type="submit"]');
  }

  linkForgotPassword() {
    return cy.get('.orangehrm-login-forgot-header');
  }

  labelLoginTitle() {
    return cy.get('.orangehrm-login-title');
  }

  alertErrorMessage() {
    return cy.get('.oxd-alert-content');
  }

  inputGroupMessage() {
    return cy.get('.oxd-input-group__message');
  }

  inputGroupContainer() {
    return cy.get('.oxd-input-group');
  }

  labelDashboardHeader() {
    return cy.get('.oxd-topbar-header-title');
  }

  labelForgotPasswordTitle() {
    return cy.get('.orangehrm-forgot-password-title');
  }

  visitPage() {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  }

  verifyLoginTitleVisible() {
    this.labelLoginTitle().should('be.visible');
  }

  enterUsername(username) {
    this.inputUsername().type(username);
  }

  enterPassword(password) {
    this.inputPassword().type(password);
  }

  clickSubmit() {
    this.buttonSubmit().click();
  }

  clickForgotPassword() {
    this.linkForgotPassword().click();
  }
}

export default LoginPage;