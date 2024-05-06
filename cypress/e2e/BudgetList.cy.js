/// <reference types="cypress" />

describe('BudgetList', () => {
    // E2E: Test loading budgets for a specific month
    it('should load budgets for a specific month', () => {
     
      cy.visit('/dashboard'); 
      cy.intercept('GET', 'http://localhost:5000/api/budgets/getAllBudgets/2', { fixture: 'budgets.json' }).as('getAllBudgets');
      cy.get('.budget-list-container select').select('2'); 
      cy.wait('@getAllBudgets');
      cy.get('.budget-table').should('be.visible');

    });
  


    // Visual Regression: Test for matching the BudgetList component snapshot
    it('should match the BudgetList component snapshot', () => {
      
      cy.visit('/dashboard');     
      cy.intercept('GET', 'http://localhost:5000/api/budgets/getAllBudgets', { fixture: 'budgets.json' }).as('getAllBudgets');
      cy.eyesOpen({
        appName: 'personalbudget', 
        testName: 'BudgetList Component Snapshot',
      });
      cy.eyesCheckWindow('BudgetList Component');
      cy.eyesClose();
    });
  });
  