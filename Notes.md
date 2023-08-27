1- Dependences:
  * dev
    * typescirpt
    - sucrase 
      - JavaScript compiler 
        - Código JS que será gerado a partir do Typescript
      - Está em dependência de desenvolvimento, pois o que irá para
      produção é o código Javascript ( recomendado babel utilizar em produção).
      - Sucrase é mais rápido pois não faz checagem de tipos ao 
        compilar.( Essa checagem pode ser feita pelo eslint)
      - Configurado script para informar arquivo que será executado sucrase-node src/index.ts
      - Configurado script para realizar build
        - O argumento -d -> Informa basta para gerar arquivos javascript
        - O argumento --transforms -> typescript ( para javascript ) 
          e imports ( para converter para CommonsJS, se o node estiver em uma versão que não suporta)
    * nodemon
      - Criado arquivo de configuração nodemon.json
        - watch -> diretório que será observado
        - ext -> extenções que serão observadas
        - execMap -> Define o script para quando for atualizado o arquivo da extenção mencionada.
    * eslint
      - Para o vscode se usa a extenção do eslint
      - configurando eslint com comando -> npm init @eslint/config
        - configurado no .eslintrc -> adicionado *parser: '@typescript-eslint/parser',* e
          *plugins: ['@typescript-eslint'],*. ( Essa parte não foi necessário pois já vinha como padrão)
        - Se quiser no vscode posso aplicar essa configuração no settings.json 
            ```json
            // Configurar autosave do eslint
            "eslint.validate": [
                "javascript",
                "javascriptreact",
                "typescript",
                "typescriptreact"
            ],
            ```
      * @typescript-eslint/parser
      * @typescript-eslint/eslint-plugin
      * eslint-config-prettier 
      * eslint-plugin-prettier 
        - Adicionado no extends do arquivo .eslintrc.js com 
            ```js
            'extends': [
                    'eslint:recommended',
                    'plugin:@typescript-eslint/recommended',
                    'plugin:@typescript-eslint/stylistic'
                ],
            ```
          - Faz com que o eslint verifique regras do typescript e javascript
      
      * @types/express
      * @types/cors



  * main
    - express
    - cors
    - prisma


2- O que é lint?
  - Lint is a type of automated check.

3- O que é o simbolo *@* no início do pacote de instalação no npm
  - Indica de que organização será o pacote.
    - @typescript-eslint/parser


4 - Vscode e eslint
  - No settings.json a configuração abaixo, é para ao salvar, ajustar 
    regras do eslint, inclusive a do typescript
  ```json
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
  ```

5 - Instalação de Postgresql windows
  - Banco de Dados sql, open source 
  - Instalação 
    - https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
    - Configurado senha root para banco
    - pgAdmin4 para visualizar banco de dados.
    - Iniciar e parar serviço
      - net start postgresql-x64-15
      - net stop postgresql-x64-15

6 - Instalando prisma
  - https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql
    - npx prisma init
    - configurado .env para url do banco de dados
    - adicionado 1 model no schema.prisma 
      - Executado -> npx prisma migrate dev --name init 
        - Criado tabelas no banco de dados
        - Se alterar o schema utilar algum dos comandos:
          - prisma migrate dev or prisma db push
        - Se for pegar algum do banco de dados / fazer introspecção do banco de dados
          - npx prisma db pull



7 - What is an Scheema ??


8 - App.ts
  - Rota get com o express para enviar resposta contendo dados do banco
  - Adiquirindo Dados do banco com instancia do PrismaClient, variável -> prisma
  - Função databaseSelectAll criada para utilizar instancia do PrismaClient para 
    trazer todos os dados do banco.
    -- Instancia do PrismaClient retorna uma promisse, a função databaseSelectAll,
       foi criada como async.
    -- Por retornar uma promisse, a callback da função get() do express, terá a
       keyword -> async,e a chamada da função databaseSelectAll terá o await.
  - databaseDisconnect criada para fechar conexão quando databaseSelectAll, ( ou
    outra função chamada do PrismaClient) terminar.

9 - Prisma error: Invalid create() Unique constraint failed on the fields: (id)
  - Quando esse erro ocorre, é quando é adicionado manualmente o ID da tabela,
  Para isso é necessário rodar esse select para que consiga inserir registros
  na tabela com o prisma:
    - SELECT setval(pg_get_serial_sequence('"User"', 'id'), coalesce(max(id)+1, 1), false) FROM "User";

