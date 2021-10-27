Feature: Addproject
  Como um cliente da api do abborah
  Quero poder adicionar um novo projeto através da rota /projects

Cenário: Adicionar um novo projeto sem tarefas vinculadas
  Dado que o cliente informe o nome do projeto, a data de início e a data de término
  Quando solicitar a criação do projeto
  Então a api deve retornar status 200 e um json com os dados do projeto criado

Cenário: Adicionar um novo projeto com uma tarefa vinculada
  Dado que o cliente informe o nome do projeto, a data de início e a data de término e também informe
  uma tarefa que contenha o nome, descrição (opcional), data de início e data de término
  Quando solicitar a criação do projeto com esta tarefa vinculada
  Então a api deve retornar status 200 e um json com os dados do projeto criado incluindo a tarefa vinculada

Cenário: Adicionar um novo projeto com várias tarefas vinculadas
  Dado que o cliente informe o nome do projeto, a data de início e a data de término e também informe
  tarefas que contenham o nome, descrição (opcional), data de início e data de término
  Quando solicitar a criação do projeto com estas tarefas vinculadas
  Então a api deve retornar status 200 e um json com os dados do projeto criado e todas as tarefas vinculadas

Cenário: Adicionar um novo projeto que não possua no nome, data de início ou data de término no corpo da requisição
  Dado que o cliente informe apenas um ou nenhum destes campos acima
  Quando solicitar a criação do projeto com estas tarefas vinculadas
  Então a api deve retornar status 400 e uma mensagem informando que o campo não pode ser vazio

Cenário: Adicionar um novo projeto que não possua em sua(s) tarefa(s) nome, data de início e ou data de término
  Dado que o cliente informe apenas um ou nenhum destes campos acima
  Quando solicitar a criação do projeto com estas tarefas vinculadas
  Então a api deve retornar status 400 e uma mensagem informando que o campo da tarefa "X" não pode ser vazio

Cenário: Adicionar um novo projeto que contenha uma data inválida
  Dado que o cliente informe uma data de início ou término que não seja uma data válida
  Quando solicitar a criação do projeto com estas tarefas vinculadas
  Então a api deve retornar status 400 e uma mensagem informando que a data deve ser válida

Cenário: Adicionar um novo projeto que contenha em sua tarefa vinculada uma data inválida
  Dado que o cliente informe na tafefa do projeto uma data de início ou término que não seja uma data válida
  Quando solicitar a criação do projeto com estas tarefas vinculadas
  Então a api deve retornar status 400 e uma mensagem informando que a data da tarefa "X" deve ser válida