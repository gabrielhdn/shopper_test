![](https://user-images.githubusercontent.com/100055011/266756913-79e17d0e-25fd-456d-9e00-7a63e805b168.png)

# Shopper - Projeto de teste prático

Este é um projeto full-stack. Siga os passos abaixo para executar a aplicação da forma correta, rodando, localmente, o banco de dados e os servidores front-end e back-end.

Há um arquivo docker-compose.yml na raiz da pasta backend, mas que, se executado, não funciona corretamente por conta de caracteres especiais presentes no arquivo .sql enviado pela Shopper. Portanto, faremos a criação do contêiner MySQL com Docker simples, e manualmente executaremos o arquivo para populá-lo. Optei por não utilizar ORMs no projeto.

## Criando o banco de dados

Após clonar o repositório para a sua máquina, navegue para a pasta backend. Lá, execute o seguinte comando Docker para a criação de um contêiner com a imagem do MySQL na versão 8:

```
docker run --name mysql_shopper -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8
```

Agora, é preciso executar o arquivo database.sql, localizado na raiz deste diretório, dentro do contêiner. Para isso, rode os seguintes comandos:

```
docker cp database.sql mysql_shopper:/database.sql
docker exec -it mysql_shopper mysql -u root -p
```

Insira a senha (root) e pressione enter. Continue:

```
source /database.sql;
exit;
```

Dessa forma, o banco de dados estará devidamente populado e pronto para ser utilizado pela aplicação.

## Executando o back-end

Aqui, você deve estar com um contêiner "mysql_shopper" devidamente rodando na porta 3306. Agora, ainda na raiz da pasta backend, execute as dependências e inicie o servidor:

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
