describe('Desafio QA - API Book Store (Fluxo Completo)', () => {
  let userId;
  let token;
  let isbnLivros = [];

  it('Deve executar todo o fluxo da API de ponta a ponta em uma única execução', () => {
    const credenciais = {
      userName: `qa_user_${Date.now()}`,
      password: 'Teste@12345'
    };

    // PASSO 1: Criar Usuário
    cy.request({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/User',
      body: credenciais
    }).then((respostaCriacao) => {
      expect(respostaCriacao.status).to.eq(201);
      userId = respostaCriacao.body.userID;
      cy.log(`1. Usuário criado com ID: ${userId}`);

      // PASSO 2: Gerar Token de Acesso
      return cy.request({
        method: 'POST',
        url: 'https://demoqa.com/Account/v1/GenerateToken',
        body: credenciais
      });
    }).then((respostaToken) => {
      expect(respostaToken.status).to.eq(200);
      expect(respostaToken.body.status).to.eq('Success');
      token = respostaToken.body.token;
      cy.log('2. Token gerado com sucesso');

      // PASSO 3: Confirmar Autorização
      return cy.request({
        method: 'POST',
        url: 'https://demoqa.com/Account/v1/Authorized',
        body: credenciais
      });
    }).then((respostaAuth) => {
      expect(respostaAuth.status).to.eq(200);
      expect(respostaAuth.body).to.be.true;
      cy.log('3. Usuário autorizado com sucesso');

      // PASSO 4: Listar os Livros Disponíveis
      return cy.request({
        method: 'GET',
        url: 'https://demoqa.com/BookStore/v1/Books'
      });
    }).then((respostaLivros) => {
      expect(respostaLivros.status).to.eq(200);
      
      // Captura o ISBN dos dois primeiros livros da vitrine
      isbnLivros = [
        respostaLivros.body.books[0].isbn,
        respostaLivros.body.books[1].isbn
      ];
      cy.log(`4. Livros selecionados (ISBN): ${isbnLivros[0]} e ${isbnLivros[1]}`);

      // PASSO 5: Alugar os dois livros escolhidos
      return cy.request({
        method: 'POST',
        url: 'https://demoqa.com/BookStore/v1/Books',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          userId: userId,
          collectionOfIsbns: [
            { isbn: isbnLivros[0] },
            { isbn: isbnLivros[1] }
          ]
        }
      });
    }).then((respostaAluguel) => {
      expect(respostaAluguel.status).to.eq(201);
      cy.log('5. Livros alugados com sucesso');

      // PASSO 6: Consultar os detalhes do usuário e validar os livros reservados
      return cy.request({
        method: 'GET',
        url: `https://demoqa.com/Account/v1/User/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }).then((respostaConsulta) => {
      expect(respostaConsulta.status).to.eq(200);
      // Valida se a conta possui exatamente 2 livros alugados
      expect(respostaConsulta.body.books).to.have.lengthOf(2);
      cy.log('6. Sucesso! O usuário possui exatamente 2 livros reservados em sua conta.');
    });
  });
});
