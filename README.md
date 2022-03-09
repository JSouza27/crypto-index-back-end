# Projeto - Crypto Index

## Boas vindas ao repositório do Projeto - Crypto Index

Esse é um projeto full-stack onde o usuário poderá ter acesso
ao preços do Bitcoin em diferentes moedas.
Essa é a parte do back-end ou seja a API e você pode acessar a Documentação
dela por aqui: [Crypto Index - Doc](https://crypto-index-back-end.herokuapp.com/api/docs/).

Você pode acessar o repositório do front-end por aqui: [crypto-index-front-end](https://github.com/JSouza27/crypto-index-front-end)
ou se desejar ver a aplicação rodando no seu navegador ou smartphone
acesse esse link: [Crypto Index](https://crypto-index-front-end.vercel.app/login).

**O deploy dessa API foi feita no Heroku então que ela demore um pouco a responder ou retorne um erro quando acessada
a primeira vez. Se isso aconter, basta acessar a aplicação novamente.

**A versão do Node utilizada nesse projeto foi a 14.19.0, então verifique a versão do Node antes de executar na sua maquina
com o comando no terminal `node -v`

### Stack utilizada

- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Express](https://expressjs.com/pt-br/)
- [Node](https://nodejs.dev/)
- [Mocha Js](https://mochajs.org/)
- [Chai js](https://www.chaijs.com/)
- [Chai-Http](https://www.chaijs.com/plugins/chai-http/)
- [ESLint](https://eslint.org/)
- [Heroku](https://www.heroku.com)


---




## Funcionalidades

A API faz a conversão dos valores do BitCoin em outras moedas
usando a base da API [CoinDesk](https://www.coindesk.com/).

Abaixo estão as premissas e os requisitos técnicos que a solução
deve possuir:

### Premissas

- [x] A API deve atender a um front-end
- [x] A API deve ser capaz de entregar os valores convertido do BitCoin
- [x] O acesso as rotas da API deve ser permitido apenas por requisição
que utilizem um token válido.

### Requisitos técnicos

- [x] A URL base da API deve ser `/api`
- [x] A API deve ter uma rota para autenticação do usuário através de email e senha
sem a necessidade de estar na base de dados
- [x] A API deve gerar um token para usuário autenticado
- [x] A API deve ter um endpoint que retornar a cotação de câmbio das moedas `USD`,
`BRL`, `EUR`, `CAD` e `BTC`
- [x] A API deve um endpoint para atualizar o valor da cotação das moedas
`BRL`, `EUR` e `CAD`
- [x] Uma requisição para um endpoint que não exista deve retornar um código 404
## Rodando localmente

Os comandos abaixo são para serem utilizados no terminal 
do Ubunto, caso utilize outro sistema operacional 

### Clonando o repositório

1. Abra o terminal e digite o comando abaixo

```bash
  git clone git@github.com:JSouza27/crypto-index-back-end.git
```

2. Ainda no terminal entre no diretório em que você clonou

```bash
  cd crypto-index-back-end
```

3. Instale as dependências

```bash
  npm install
```

4. Inicie o servidor

```bash
  npm run dev
```

5. Para a geração de token é necessário usar uma váriável de ambiente
seguindo os passos a seguir:

- Dentro da pasta clonada crie um arquivo `.env`
- Abra o arquivo `.env` e acrescente a váriavel abaixo

```bash
  SECRET=**valor qualquer**
```
- Agora você está pronto para usar a API

### Usando a API

6. Você pode acessar as rotas pelo [Postaman](https://www.postman.com/)
ou [Insomnia](https://insomnia.rest/download)

A url base é `http://localhost:[PORTA]/api/`

7. Você pode vizualizar ou testar as rotas através da documentação:[Crypto Index - Doc](https://crypto-index-back-end.herokuapp.com/api/docs/)
## Rodando os testes

Para rodar os testes não é necessário iniciar a aplição.
você deve entrar na pasta `test` e escolher um dos arquivos de testes
e no terminal digitar o comando abaixo.


```bash
  NAME=**nome do arquivo** npm test
```
ou

```bash
  npm test
```

8. Caso queira rodar os teste de integração

```bash
  npm run test:coverage
```

## Autores

- [@JSouza27](https://github.com/JSouza27)


## Deploy

Deploy feito no [Heroku](https://www.heroku.com)
