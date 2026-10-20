Cypress.on('uncaught:exception', (err, runnable) => {
  // Retornar false impede que o Cypress fale o teste por causa de erros internos da página (DemoQA)
  return false;
});

describe('Desafio QA - Practice Form (Frontend)', () => {
  it('Deve preencher o formulário, fazer upload do arquivo e validar o pop-up', () => {
    // Seu código de teste continua aqui...
    cy.visit('https://demoqa.com/automation-practice-form');
    // ...
  });
});


describe('Desafio QA - Practice Form (Frontend)', () => {
  it('Deve preencher o formulário de cadastro de estudante com sucesso', () => {
    // 1. Acessar a página do Practice Form
    cy.visit('https://demoqa.com/automation-practice-form');

    // 2. Preencher dados pessoais básicos
    cy.get('#firstName').type('Robert');
    cy.get('#lastName').type('Teste Accenture');
    cy.get('#userEmail').type('robert.teste@accenture.com');
    
    // Selecionar Gênero (Female)
    cy.get('label[for="gender-radio-2"]').click();
    
    // Telefone (exatamente 10 dígitos exigidos pelo campo)
    cy.get('#userNumber').type('1199994499');

    // 3. Preencher Endereço
    cy.get('#currentAddress').type('Rua dos Testes, 123 - São Paulo/SP');

    // 4. Fazer o upload do arquivo .txt exigido no desafio
    cy.get('#uploadPicture').selectFile('cypress/fixtures/exemplo.txt');

    // 5. Enviar o formulário (scroll necessário às vezes para evitar que o rodapé encubra o botão)
    cy.get('#submit').scrollIntoView().click({ force: true });

    // 6. Validar que o popup/modal de confirmação apareceu
    cy.get('.modal-content').should('be.visible');
    cy.get('#example-modal-sizes-title-lg').should('have.text', 'Thanks for submitting the form');

    // 7. Fechar o modal
    cy.get('#closeLargeModal').click();
    
    cy.log('Formulário preenchido, enviado e validado com sucesso!');
  });
});