
describe('Desafio QA - Web Tables', () => {
  it('Deve cadastrar, editar e excluir um registro', () => {
    const email = `robert.teste.${Date.now()}@example.com`;

    // 1. Acessar a página e confirmar que a tabela carregou
    cy.visit('https://demoqa.com/webtables');

    cy.get('table tbody tr').should('have.length.at.least', 1);
    cy.get('#addNewRecordButton').should('be.visible');

    // 2. Abrir o formulário
    cy.get('#addNewRecordButton').click();

    // 3. Preencher os campos
    cy.get('#firstName').should('be.visible').type('Robert');
    cy.get('#lastName').type('Lourenco');
    cy.get('#userEmail').type(email);
    cy.get('#age').type('30');
    cy.get('#salary').type('7000');
    cy.get('#department').type('Engenharia');

    // 4. Salvar o registro
    cy.get('#submit').click();

    // 5. Confirmar que o registro foi cadastrado
    cy.contains('table tbody tr', email).should('be.visible');

    // 6. Editar o registro cadastrado
    cy.contains('table tbody tr', email).within(() => {
      cy.get('[title="Edit"]').click();
    });

    cy.get('#firstName').clear().type('Robert Editado');
    cy.get('#submit').click();

    // 7. Confirmar a edição
    cy.contains('table tbody tr', email)
      .should('contain.text', 'Robert Editado');

    // 8. Excluir o registro
    cy.contains('table tbody tr', email).within(() => {
      cy.get('[title="Delete"]').click();
    });

    // 9. Confirmar a exclusão
    cy.contains('table tbody tr', email).should('not.exist');
  });
});
