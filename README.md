# PGEmail

## Sobre o projeto
Este projeto, denominado PGEmail, foi desenvolvido por José Dhonatas Alves Sales. Ele consiste em uma aplicação web para gerenciamento de processos jurídicos.

## Tecnologias:
- Front-end:
  - React (Javascript)
  - Material ui
- Back-end:
  - Node.js (TypeScript)
  - Express
- Banco de dados:
  - MySQL  

## Link do projeto
O projeto está disponível online no seguinte endereço: [PGEmail](https://pge.josedhonatas.ninja)

## Requisitos
Para executar este projeto, certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

- Docker (opcional)
- Node.js
- npm (Node Package Manager)

## Configuração do Banco de Dados
As credenciais para o banco de dados, contendo dados fictícios, podem ser encontradas no arquivo **ormconfig.json** localizado na pasta **back** do projeto.

| Email  | Senha | Cargo
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

## Como executar

### Opção 1: Usando Docker

1. Certifique-se de ter o Docker instalado e configurado em sua máquina.
2. Navegue até o diretório raiz do projeto no terminal.
3. Execute o seguinte comando para construir e iniciar os contêineres Docker para o projeto:
```shell script
docker-compose up -d
```
4. Aguarde até que todos os contêineres sejam criados e iniciados. Após a conclusão, você poderá acessar o aplicativo no seu navegador em http://localhost:3000.

### Opção 2: Sem Docker

1. Certifique-se de ter o Node.js e o npm instalados em sua máquina.
2. Navegue até o diretório "back" do projeto no terminal.
3. Execute o seguinte comando para instalar as dependências do projeto:
```shell script
npm install
```
4. Após a conclusão da instalação das dependências, execute o seguinte comando para iniciar o aplicativo:
```shell script
npm start
```
5. Navegue até o diretório "front" do projeto no terminal.
6. Execute os comandos listados no passo 3 e 4 respectivamente.
7. Aguarde até que o aplicativo seja compilado e iniciado. Após a conclusão, você poderá acessá-lo no seu navegador em http://localhost:3000.

## Diagrama de entidade relacionamento
![Logo](https://drive.google.com/uc?export=view&id=1GGziIrrbY5IHhsBQfB-ZlrM6_8Hd03_y)


