/// <reference types="cypress" />

describe('Dashboard', () => {
  // E2E: Test navigating to Budget List and adding a budget
  it('should navigate to Budget List and add a budget', () => {
    cy.visit('/dashboard'); 

    cy.get('.dashboard button').contains('View Budget in List').click(); // Changed 'Budget List' to 'View Budget in List'

    cy.url().should('include', '/budget-list'); 
    cy.get('.dashboard button').contains('Add Expenditure').click(); // Changed 'Add Budget' to 'Add Expenditure'

    cy.get('.add-budget-form select').select('1'); // Changed '.add-budget-container' to '.add-budget-form'
    cy.get('.add-budget-form input[type="text"]').eq(0).type('Test Budget');
    cy.get('.add-budget-form input[type="number"]').eq(0).type('1000'); // Changed 'input[type="text"]' to 'input[type="number"]'
    cy.get('.add-budget-form button').click(); // Changed '.add-budget-container' to '.add-budget-form'

    cy.get('.modal h2').should('contain', 'Expenditure added successfully'); // Changed 'Budget added successfully' to 'Expenditure added successfully'
   
  });

  // Visual Regression: Test for matching the Dashboard component snapshot
  it('should match the Dashboard component snapshot', () => {
   
    cy.visit('/dashboard'); 
    cy.eyesOpen({
      appName: 'personalbudget', 
      testName: 'Dashboard Component Snapshot',
    });

    cy.eyesCheckWindow('Dashboard Component');

    cy.eyesClose();
  });

  it('should log out successfully', () => {

    cy.visit('/dashboard'); 

    cy.get('.logout-button').click();
    cy.url().should('include', '/logingin'); 
  });
});
