/// <reference types="cypress" />

describe('Registration', () => {
  beforeEach(() => {
    cy.visit('/registration');
  });

  // E2E: Test for successful user Registration
  it('should successfully sign up a user', () => {
    cy.get('.Registration-input[name="fullName"]').type('John Doe');
    cy.get('.Registration-input[name="username"]').type('john.doe');
    cy.get('.Registration-input[name="password"]').type('securePassword');
    cy.get('.Registration-button').click();

    cy.get('.dialog.success').should('be.visible');
  });

  it('should handle Registration failure', () => {
    cy.get('.Registration-input[name="fullName"]').type('Invalid User');
    cy.get('.Registration-input[name="username"]').type('invalid.user');
    cy.get('.Registration-input[name="password"]').type('weakPassword');

    cy.get('.Registration-button').click();
    cy.get('.dialog.error').should('be.visible');
  });

  // Visual Regression: Test for matching the Registration page snapshot
  it('should match the Registration page snapshot', () => {
    cy.eyesOpen({
      appName: 'personalbudget', 
      testName: 'Registration Page Snapshot',
    });

    cy.eyesCheckWindow('Registration Page');
    cy.eyesClose();
  });
});
