[![Build Status](https://github.com/marcossaore/abborah.svg?branch=master)](https://github.com/marcossaore/abborah)
[![Coverage Status](https://coveralls.io/repos/github/marcossaore/abborah/badge.svg)](https://coveralls.io/github/marcossaore/abborah)

# **Abborah API**

---
Essa API auxilia na criação e manutenção de projetos e tarefas vinculadas, é possível criar um projeto e ficar de olho 👀  
nos prazos estabelecidos e ficsalizar se será entregue em tempo hábil.

O nome é Abborah(Aborá) porque pensei em uma abóbora na hora das definições de escopo. 😅


## [**Link para a documentação da API**](https://abborah.herokuapp.com/api-docs)

### Documentação Gherkin

1. [Criar Projeto](./requirements/add-project.feature)

### Documentação Técnica

1. [Criar Projeto](./requirements/add-project.readme)


> ## Stack de desenvolvimento

* Node
* Typescript
* Jest
* MySQL
* Docker
* Github Actions


> ## Infra e Ferramentas

* Documentação de API com Swagger
* API Rest com Express
* Deploy no Heroku


> ## Como rodar o projeto

1. Crie dentro pasta `prisma` um arquivo `.env` com as credenciais do banco de dados do docker-compose.

        DB_CONNECTION=mysql://root:abb0r0h@127.0.0.1:3306/abborah_test

2. Rode o comando `yarn up` para rodar localmente o projeto.

3. Use o postman ou qualquer cliente de requisições HTTP. (O Thunder client do VS Studio Code é bem bacana)

4 . Crie um projeto.

```json
{
    "name": "personal project",
    "description": "A brief description",
    "endDate": "2021-11-07 13:34",
    "startDate": "2021-10-08 18:35:00", 
    "finished": false
}
```

> ## Como rodar os testes

  ### Teste unitários

      yarn test:unit

  ### Teste de integração

      yarn test:integration

  ### Todos

      yarn test
