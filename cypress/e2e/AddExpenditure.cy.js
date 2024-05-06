/// <reference types="cypress" />

describe('AddExpenditure', () => {
  // E2E: Test adding a budget
  it('should add a budget successfully and display a success notification', () => {
    cy.visit('/dashboard'); 

    cy.intercept('POST', `${BASE_URL}/api/budgets`, {
      statusCode: 200,
      body: { message: 'Budget added successfully' },
    }).as('AddExpenditure');

    cy.get('.add-budget-form input[type="text"]').type('Groceries');
    cy.get('.add-budget-form input[type="number"]').type('100');

    cy.clock(new Date(2023, 0, 15).getTime());
    cy.get('.add-budget-form button').click();

    cy.wait('@AddExpenditure');

    cy.get('.Toastify__toast--success').should('be.visible');
  });

  // Visual Regression: Test for matching the AddExpenditure component snapshot
  it('should match the AddExpenditure component snapshot', () => {
    cy.visit('/dashboard'); 

    cy.eyesOpen({
      appName: 'personalbudget', 
      testName: 'AddExpenditure Component Snapshot',
    });
    cy.eyesCheckWindow('AddExpenditure Component');
    cy.eyesClose();
  });
});
