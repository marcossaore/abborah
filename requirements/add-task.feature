Feature: AddTask
  Como um cliente da api do abborah
  Quero poder adicionar uma nova tarefa ao projeto já criado através da rota /tasks (POST)

Cenário: Adicionar uma nova tarefa
  Dado que o cliente informe o nome da tarefa, a data de início e a data de término
  Quando solicitar a criação da tarefa
  Então a api deve retornar status 200 e um json com os dados do tarefa criada

Cenário: Adicionar uma nova tarefa sem data de início
  Dado que o cliente informe o nome da tarefa e somenete a data de término
  Quando solicitar a criação do tarefa
  Então a api deve retornar status 200 e um json com os dados da tarefa criada e a data de início igual a data atual

Cenário: Adicionar uma nova tarefa com status finalizado
  Dado que o cliente informe o nome do tarefa, a data de início(opcional) e a data de término e o status de finalizado
  Quando solicitar a criação do tarefa
  Então a api deve retornar status 200 e um json com os dados do tarefa criada incluindo o status finalizado

Cenário: Adicionar uma nova tarefa com status não finalizado
  Dado que o cliente informe o nome do tarefa, a data de início(opcional) e a data de término e o status de não finalizado
  Quando solicitar a criação do tarefa
  Então a api deve retornar status 200 e um json com os dados do tarefa criada incluindo o status finalizado como não finalizado

Cenário: Adicionar uma nova tarefa que não possua nome, data de início ou data de término no corpo da requisição
  Dado que o cliente informe apenas um ou nenhum destes campos acima
  Quando solicitar a criação do tarefa com estas tarefas vinculadas
  Então a api deve retornar status 400 e uma mensagem informando que o campo não pode ser vazio

Cenário: Adicionar uma nova tarefa que contenha uma data inválida
  Dado que o cliente informe uma data de início ou término que não seja uma data válida
  Quando solicitar a criação do tarefa com estas tarefas vinculadas
  Então a api deve retornar status 400 e uma mensagem informando que a data deve ser válida