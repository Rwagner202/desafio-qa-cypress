# Desafio Técnico QA

Projeto criado para automação de testes utilizando Cypress e JavaScript, com base nos exercícios propostos no desafio técnico.

## Tecnologias utilizadas

- JavaScript
- Cypress
- Node.js
- Git e GitHub

## Testes realizados

### API
- Criar usuário
- Gerar token
- Verificar autorização
- Consultar livros
- Adicionar livros ao usuário
- Validar os dados do usuário

### Interface Web

- **Practice Form:** preencher o formulário, enviar os dados e validar a mensagem de confirmação.
- **Browser Windows:** testar a abertura de uma nova janela e validar o texto exibido.
- **Web Tables:** cadastrar, editar e excluir um registro.
- **Progress Bar:** testar os botões de iniciar e parar o progresso.
- **Sortable:** praticar o arraste dos itens da lista.

## Como executar o projeto

Primeiro, é necessário ter o Node.js instalado.

Baixe o projeto e entre na pasta pelo terminal. Depois, execute:

```bash
npm install
```

Para executar os testes pelo terminal:

```bash
npx cypress run
```

Para abrir o Cypress e executar os testes pela interface:

```bash
npx cypress open
```

Para executar apenas um teste:

```bash
npx cypress run --spec "cypress/e2e/web-tables.cy.js"
```

## Estrutura do projeto

- `cypress/e2e`: arquivos com os testes automatizados.
- `cypress/fixtures`: arquivos utilizados nos testes.
- `cypress.config.js`: configurações do Cypress.

## Objetivo do projeto

Este projeto foi desenvolvido como parte de um desafio técnico para a área de QA, com o objetivo de demonstrar a aplicação de testes automatizados em cenários de API e interface web utilizando Cypress e JavaScript.

Os testes foram organizados de acordo com os cenários propostos no desafio, buscando validar os principais comportamentos das funcionalidades testadas.

