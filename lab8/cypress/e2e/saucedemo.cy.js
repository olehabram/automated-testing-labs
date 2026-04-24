describe('SauceDemo UI tests with Cypress', () => {
  const loginPageUrl = 'https://www.saucedemo.com/';

  beforeEach(() => {
    cy.visit(loginPageUrl);
  });

  it('opens the SauceDemo login page', () => {
    cy.url().should('include', 'saucedemo.com');
    cy.get('.login_logo').should('be.visible').and('contain.text', 'Swag Labs');
  });

  it('shows username, password fields and Login button', () => {
    cy.get('[data-test="username"]').should('be.visible');
    cy.get('[data-test="password"]').should('be.visible');
    cy.get('[data-test="login-button"]').should('be.visible').and('have.value', 'Login');
  });

  it('logs in as standard_user and shows Products page', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    cy.url().should('include', '/inventory.html');
    cy.get('[data-test="title"]').should('be.visible').and('have.text', 'Products');
  });
});
