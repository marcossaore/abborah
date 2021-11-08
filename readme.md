[![Coverage Status](https://coveralls.io/repos/github/marcossaore/abborah/badge.svg)](https://coveralls.io/github/marcossaore/abborah)

# **Abborah API**

---
Essa API auxilia na criação e manutenção de projetos e tarefas vinculadas, é possível criar um projeto e ficar de olho 👀  
nos prazos estabelecidos e fiscalizar se será entregue em tempo hábil.

O nome é Abborah(Ábora) porque pensei em uma abóbora na hora das definições de escopo. 😅


## [**Link para a documentação da API**](https://abborah.herokuapp.com/api-docs)

### Documentação Gherkin

1. [Criar Projeto](./requirements/add-project.feature)
2. [Criar Tarefa](./requirements/add-task.feature)

### Documentação Técnica

1. [Criar Projeto](./requirements/add-project.readme)
2. [Criar Tarefa](./requirements/add-task.readme)


### Diagrama 
1. [project](https://drive.google.com/file/d/1-ZhUhbUPQYWUgkLh58_fLP3w326Bt1Wx/view?usp=sharing)
2. [Task](https://drive.google.com/file/d/1i7xxAPHZcGSM9IcIuYTsUquWh9zXcbo7/view?usp=sharing)

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

1. Crie dentro pasta `prisma` um arquivo `.env` com as credenciais do banco de dados do docker-compose.test.yml (isto é configurado para rodar os testes fora do container, bem mais rápido).

        DB_CONNECTION=mysql://root:abb0r0h@127.0.0.1:3307/abborah_test

2. Rode o comando `yarn up` para rodar localmente o projeto.

3. Se for necessário fazer alguma alteração nos arquivos e isso ser refletido no container, rode o comando `yarn build` ou `yarn build:watch`.

4. Use o postman ou qualquer cliente de requisições HTTP. (O Thunder client do VS Studio Code é bem bacana)

5 . Crie um projeto e logo em seguida uma tarefa.

```json
{
    "name": "personal project",
    "description": "A brief description",
    "endDate": "2021-11-08 13:34",
    "startDate": "2021-11-30 18:35:00", 
    "finished": false
}
```

```json
{
    "projectId": 50,
    "name": "personal task",
    "description": "A brief description of a task",
    "endDate": "2021-11-15",
    "startDate": "2021-11-20 12:00",
    "finished": true
}
```

> ## Como rodar os testes

  ### Teste unitários

      yarn test:unit

  ### Teste de integração

      yarn test:integration

  ### Testes no container

      yarn test:on-container <test>
      Exemplo: yarn test:on-container test:ci

  ### Todos

      yarn test