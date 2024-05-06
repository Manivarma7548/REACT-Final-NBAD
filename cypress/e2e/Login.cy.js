/// <reference types="cypress" />
import '@applitools/eyes-cypress/commands';


Cypress.eyesOpen('personalbudget', 'Login Tests');

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/logingin'); 
  });

  it('should login successfully (E2E)', () => {
    cy.get('.login-input').first().type('your_username');
    cy.get('.login-input').last().type('your_password');
    cy.get('.login-button').click();

   
    cy.url().should('include', '/dashboard');


    cy.eyesCheckWindow('Successful Login');
  });

  it('should display login failure message (E2E)', () => {

    cy.get('.login-input').first().type('invalid_username');
    cy.get('.login-input').last().type('invalid_password');
    cy.get('.login-button').click();

    cy.get('.login-modal').should('be.visible');
    cy.get('.login-modal h2').should('contain.text', 'Login failed');

    // Capture visual checkpoint for login failure (Visual Regression)
    cy.eyesCheckWindow('Login Failure');
  });

  it('should look correct (Visual Regression)', () => {
    
    cy.eyesCheckWindow('Login Page');
  });
});

Cypress.eyesClose();
