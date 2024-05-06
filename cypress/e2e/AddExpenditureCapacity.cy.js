/// <reference types="cypress" />
import 'cypress-eyes';

describe('AddExpenditureCapacity', () => {
  // E2E: Test adding budget capacity
  it('should add budget capacity', () => {
    cy.visit('/dashboard'); 

    cy.intercept('POST', 'http://localhost:5000/api/budgets/capacity', { fixture: 'add_budget_capacity_response.json' }).as('addBudgetCapacity');

    cy.get('.add-budget-container select').select('1'); 
    cy.get('.add-budget-container input[type="text"]').eq(0).type('Test Budget');
    cy.get('.add-budget-container input[type="text"]').eq(1).type('1000');
    cy.get('.add-budget-container button.add-budget-button').click();

    cy.wait('@addBudgetCapacity');

    cy.get('.modal h2').should('contain', 'Budget capacity added successfully');

  });

  // Visual Regression: Test for matching the AddExpenditureCapacity component snapshot
  it('should match the AddExpenditureCapacity component snapshot', () => {
   
    cy.visit('/dashboard'); 

    cy.intercept('GET', 'http://localhost:5000/api/budgets/capacity', { fixture: 'capacity.json' }).as('getCapacity');

    cy.eyesOpen({
      appName: 'personalbudget', 
      testName: 'AddExpenditureCapacity Component Snapshot',
    });

    cy.wait('@getCapacity');

    cy.eyesCheckWindow('AddExpenditureCapacity Component');
    cy.eyesClose();
  });
});
