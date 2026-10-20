
describe('Desafio QA - Web Tables', () => {
  it('Deve cadastrar, editar e excluir um registro', () => {
    const email = `robert.teste.${Date.now()}@example.com`;

    // 1. Acessar a página e confirmar que a tabela carregou
    cy.visit('https://demoqa.com/webtables');

    cy.get('table tbody tr').should('have.length.at.least', 1);
    cy.get('#addNewRecordButton').should('be.visible');

    // 2. Remover iframes de publicidade que possam cobrir os controles
    cy.get('body').then(($body) => {
      $body
        .find(
          'iframe[id*="google_ads_iframe"], iframe[data-is-safeframe="true"]'
        )
        .remove();
    });

    // 3. Abrir o formulário
    cy.get('#addNewRecordButton').click();

    // 4. Preencher os campos
    cy.get('#firstName').should('be.visible').type('Robert');
    cy.get('#lastName').type('Lourenco');
    cy.get('#userEmail').type(email);
    cy.get('#age').type('30');
    cy.get('#salary').type('7000');
    cy.get('#department').type('Engenharia');

    // 5. Salvar o registro
    cy.get('#submit').click();

    // 6. Confirmar o cadastro
    cy.contains('table tbody tr', email).should('be.visible');

    // 7. Editar o registro
    cy.contains('table tbody tr', email).within(() => {
      cy.get('[title="Edit"]')
        .should('be.visible')
        .scrollIntoView()
        .click();
    });

    cy.get('#firstName').clear().type('Robert Editado');
    cy.get('#submit').click();

    // 8. Confirmar a edição
    cy.contains('table tbody tr', email)
      .should('be.visible')
      .and('contain.text', 'Robert Editado');

    // 9. Excluir o registro
    cy.contains('table tbody tr', email).within(() => {
      cy.get('[title="Delete"]')
        .should('be.visible')
        .scrollIntoView()
        .click();
    });

    // 10. Confirmar a exclusão
    cy.contains('table tbody tr', email).should('not.exist');
  });
});
