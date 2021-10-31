Feature: Addproject
  Como um cliente da api do abborah
  Quero poder adicionar um novo projeto através da rota /projects

Cenário: Adicionar um novo projeto
  Dado que o cliente informe o nome do projeto, a data de início e a data de término
  Quando solicitar a criação do projeto
  Então a api deve retornar status 200 e um json com os dados do projeto criado

Cenário: Adicionar um novo projeto sem data de início
  Dado que o cliente informe o nome do projeto e somenete a data de término
  Quando solicitar a criação do projeto
  Então a api deve retornar status 200 e um json com os dados do projeto criado e a data de início igual a data atual

Cenário: Adicionar um novo projeto com status finalizado
  Dado que o cliente informe o nome do projeto, a data de início(opcional) e a data de término e o status de finalizado
  Quando solicitar a criação do projeto
  Então a api deve retornar status 200 e um json com os dados do projeto criado incluindo o status finalizado

Cenário: Adicionar um novo projeto com status não finalizado
  Dado que o cliente informe o nome do projeto, a data de início(opcional) e a data de término e o status de não finalizado
  Quando solicitar a criação do projeto
  Então a api deve retornar status 200 e um json com os dados do projeto criado incluindo o status finalizado como não finalizado

Cenário: Adicionar um novo projeto que não possua no nome, data de início ou data de término no corpo da requisição
  Dado que o cliente informe apenas um ou nenhum destes campos acima
  Quando solicitar a criação do projeto com estas tarefas vinculadas
  Então a api deve retornar status 400 e uma mensagem informando que o campo não pode ser vazio

Cenário: Adicionar um novo projeto que contenha uma data inválida
  Dado que o cliente informe uma data de início ou término que não seja uma data válida
  Quando solicitar a criação do projeto com estas tarefas vinculadas
  Então a api deve retornar status 400 e uma mensagem informando que a data deve ser válida