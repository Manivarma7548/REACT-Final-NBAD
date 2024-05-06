/// <reference types="cypress" />

describe('AuthCxt', () => {
    // E2E: Test login functionality
    it('should log in a user and update AuthCxt state', () => {
      
      cy.visit('/logingin');
      cy.get('.login-input[name="username"]').type('testuser');
      cy.get('.login-input[name="password"]').type('testpassword');
      cy.get('.login-button').click();

      cy.window().its('AuthCxt').should('deep.include', { isLoggedIn: true, token: Cypress.any(String) });
    });

    it('should log out a user and update AuthCxt state', () => {
      cy.get('.logout-button').click(); 
      cy.window().its('AuthCxt').should('deep.include', { isLoggedIn: false, token: null });
    });
  

    // Visual Regression: Test for matching the AuthCxt state snapshot
    it('should match the AuthCxt state snapshot', () => {
      
      cy.visit('/dashboard'); 
      cy.eyesOpen({
        appName: 'personalbudget', 
        testName: 'AuthCxt State Snapshot',
      });
      cy.eyesCheckWindow('AuthCxt State');
      cy.eyesClose();
    });
  });
  