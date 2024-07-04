# Todo List App

## Descrição
Aplicativo de lista de tarefas desenvolvido em React utilizando Material UI. Inclui funcionalidades de login e CRUD (criar, ler, atualizar, excluir) para tarefas.

## Estrutura de Pastas

```plaintext
src/
  components/
    /test
      Login.test.js
      LoginPage.test.js
      TaskList.test.js
      TaskForm.test.js
    /Login
      Login.jsx
    /TaskList
      TaskList.jsx
    /TaskForm
      TaskForm.jsx
  context/
    AuthContext.jsx
  pages/
    LoginPage.jsx
    TaskPage.jsx
  services/
    authService.js
    taskService.js
  App.js
  index.js
  setupTests.js
```
## Instalação

### Clone o repositório:
```
git clone https://github.com/rafaelteodosio/wevy-test.git
cd todo-list
```

### Instale as dependências:

```
 npm install 
```

### Inicie o servidor de desenvolvimento:
```
 npm start 
```

## Testes
Para executar os testes unitários, utilize o comando:
```
 npm test 
```
## Estrutura do Projeto
* src/components: Contém os componentes React (Login, TaskList, TaskForm).
* src/components/test: Contém os testes dos componentes React.
* src/pages: Contém as páginas do aplicativo (LoginPage, TaskPage).
* src/services: Contém os serviços para autenticação e manipulação de tarefas.
* src/context: Contexto da autenticação do User.
* src/App.js: Configuração das rotas e autenticação.
* src/index.js: Ponto de entrada do aplicativo.
* src/setupTests.js: Configurações do Jest para testes.

## Funcionalidades
* Tela de Login
* CRUD de Tarefas
* Testes Unitários com Jest

## Tecnologias Utilizadas
* React
* Material UI
* Jest

## Autenticação
Para fazer login, use as credenciais:

* Email: user@example.com
* Senha: password