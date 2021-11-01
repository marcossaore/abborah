import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.2',
  info: {
    title: 'Api Abborah',
    description: 'Primeira versão de Documentacão',
    version: '1.0.0'
  },
  servers: [
    {
      url: '/api',
      description: 'Servidor Principal'
    }
  ],
  tags: [
    {
      name: 'AddProject',
      description: 'API de cadastro de projetos'
    }
  ],
  paths,
  schemas,
  components
}
