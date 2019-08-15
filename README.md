<img src="icon.png" align="right" />

# INFO BANK

Através da API do Nubank, essa aplicação permitir um usuário autenticar em sua conta do Nubank e visualizar seu saldo do cartão de crédito, seus dados pessoais e suas compras.
Os dados visualizados serão persistidos no MongoDB.


### Ferramentas Necessários para executar

- Docker
- Docker Compose

### Ferramentas utilizadas no desenvolvimento

- Express
- Mongoose
- Consign
- MongoDB
- Docker

### Instruções para executar

- Faça o clone ou baixe esse repositório no local que desejar(De preferência na partição principal) em seu computador.
- Após ter baixado, abra a pasta do projeto no terminal e execute o seguinte comando:
- <strong>docker-compose build</strong> (Irá buildar a imagem do Docker para este projeto).
- Após concluído, execute o seguinte comando:
- <strong>docker-compose up</strong> (Irá subir o container do node para rodar a aplicação e do MongoDB para persistência dos dados).
- Aguarde e fique atento ao log do Docker(Caso dê algum erro, digite <strong>docker-compose down -v</strong> e tente novamente).
- Para acessar a aplicação, abra <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.
- Pronto! A aplicação será executada em seu navegador.
- Para finalizar os containeres da aplicação, basta executar <strong>docker-compose down</strong>

### Instruçõs de uso da aplicação

- Para visualizar as informações da sua conta.
- Digite o seu CPF no campo devido.
- Digite a sua senha no campo devido.
- Clique no botão ao lado do campo da senha.
- Será aberto um modal, siga as instruções contidos neles para realizar a autenticação através do aplicativo do Nubank.
- Clique em OK e aguarde seus dados serem apresentados na tela.
