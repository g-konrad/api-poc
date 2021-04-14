# API MVP

A ideia aqui é utilizar uma estrutura absurdamente simples:
- Rotas são só objetos
    ```
      const route = ({ url: '/', method: 'GET', handler: (req, res) => "hello world!" })
    ```
- Views são funções que recebem dependências utilizadas pelo handler da rota
      ```
        const view = (db) => ({ url: '/', method: 'GET', handler: (req, res) => db.insert("hello world!") })
      ```
- Interações com efeitos (geralmente I/O) são implementadas em camadas (providers)
- Cada tipo de provider deve ter uma interface canônica (ie. IDatabase, IStorage, IEmail)
- Provider específicos (ie. interações com Postgres via pg-promise) devem implementar a interface canônica
- Rotas e providers devem fornecer apenas funções puras; apenas `main.ts` pode ser impuro (ter efeitos AKA retornar `()`)
