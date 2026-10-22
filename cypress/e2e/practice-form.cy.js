
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Desafio QA - Practice Form (Frontend)', () => {
  it('Deve preencher o formulário, fazer upload do arquivo e validar a confirmação', () => {
    const email = `robert.teste.${Date.now()}@example.com`;

    
    cy.visit('https://demoqa.com/automation-practice-form');

    
    cy.get('#firstName').type('Robert');
    cy.get('#lastName').type('Lourenco');
    cy.get('#userEmail').type(email);

    
    cy.get('label[for="gender-radio-1"]').click();

    
    cy.get('#userNumber').type('1199994499');

    
    cy.get('#subjectsInput').type('Math');
    cy.get('#subjectsInput').type('{enter}');

    
    cy.get('label[for="hobbies-checkbox-1"]').click();

    
    cy.get('#uploadPicture')
      .selectFile('cypress/fixtures/exemplo.txt');

   
    cy.get('#currentAddress')
      .type('Rua dos Testes, 123 - Sao Paulo/SP');

   
    cy.get('#state').click();
    cy.get('#react-select-3-option-0').click();

    cy.get('#city').click();
    cy.get('#react-select-4-option-0').click();

  
    cy.get('#submit').scrollIntoView().click({ force: true });

    
    cy.get('.modal-content').should('be.visible');

    cy.get('#example-modal-sizes-title-lg')
      .should('have.text', 'Thanks for submitting the form');

    cy.get('.modal-content').should('contain.text', 'Robert Lourenco');
    cy.get('.modal-content').should('contain.text', email);
    cy.get('.modal-content').should('contain.text', 'Male');
    cy.get('.modal-content').should('contain.text', '1199994499');
    cy.get('.modal-content').should('contain.text', 'Maths');
    cy.get('.modal-content').should('contain.text', 'Sports');
    cy.get('.modal-content').should('contain.text', 'exemplo.txt');
    cy.get('.modal-content').should('contain.text', 'NCR');
    cy.get('.modal-content').should('contain.text', 'Delhi');

    
    cy.get('#closeLargeModal').click();

    cy.log('Practice Form preenchido e validado com sucesso!');
  });
});
