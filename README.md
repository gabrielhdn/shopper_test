# Shopper - Projeto de teste prático

Este é um projeto full-stack. Siga os passos abaixo para executar a aplicação da forma correta, rodando, localmente, o banco de dados e os servidores front-end e back-end.

É recomendado utilizar o docker-compose para criação do banco de dados. Caso queira utilizar apenas o Docker, siga os passos descritos no final deste arquivo.

## Criando o banco de dados

Após clonar o repositório para a sua máquina, navegue para a pasta backend. Lá, utilize o docker-compose para criar e popular o banco de dados MySQL automaticamente. Basta executar o comando:

```
docker-compose up -d (ou docker compose up -d, caso esteja utilizando o docker-compose plugin)
```

**:warning: Seu docker-compose precisa estar na versão 1.29 ou superior. Dê preferência para versões mais atualizadas. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está `1.26.0` por `1.29.2`.**

## Executando o back-end

Aqui, você deve estar com um contêiner "mysql_shopper" devidamente rodando na porta 3306. Agora, para de fato rodar a API, execute as dependências e inicie o servidor:

```
yarn (ou npm install)
yarn dev (ou npm run dev)
```

## Executando o front-end

O servidor back-end deve estar rodando sem problemas. Agora, navegue para a pasta frontend e execute os seguintes comandos:

```
yarn (ou npm install)
yarn dev (ou npm run dev)
```

Depois disso, você poderá acessar a aplicação pela rota "http://localhost:5173".

## Criando e populando o banco de dados com Docker

Navegue até a pasta backend. Lá, execute o seguinte comando Docker para a criação de um contêiner com a imagem do MySQL na versão 8:

```
docker run -d --name mysql_shopper -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8
```

Agora, é preciso executar o arquivo database.sql, localizado na raiz deste diretório, dentro do contèiner. Para isso, rode os seguintes comandos:

```
docker cp database.sql mysql_shopper:/database.sql
docker exec -it mysql_shopper mysql -u root -p
source /database.sql;
exit;
```
Dessa forma, o banco de dados estará devidamente populado e pronto para ser utilizado pela aplicação.
