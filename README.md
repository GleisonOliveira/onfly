# Onfly Full Stack Test
Esse repositório faz parte do teste para desenvolvedor full stack senior na empresa Onfly.

## Como rodar o projeto
1. Clone o projeto na sua maquina (e garanta que o docker esteja devidamente instalado e funcionando [https://docs.docker.com/get-started/get-docker/](https://docs.docker.com/get-started/get-docker/))
2. Abra a pasta `api` e crie uma cópia do arquivo `.env.example` e altere seu nome para `.env`
3. Na raiz do projeto, abra um terminal e utilize o seguinte comando `docker compose up -d` (irá iniciar os containers necessários para a aplicação)
4. Aguarde até que as dependencias tenham sido instaladas (aguarde até que os containers `onfly-onfly.node-1`, `onfly-onfly.consumer-1` e `onfly-onfly.fpm-1` sejam iniciados, esse processo pode demorar e irá instalar de forma automática as dependencias do php, do node e rodará as migrations e seeds)

### Rotas
- [http://localhost:8080/up](http://localhost:8080/up) - Tela inicial para verificar se aplicação em laravel está rodando
- [http://localhost:8080/horizon](http://localhost:8080/horizon) - Tela go orquestrador de filas e processos do laravel
- [http://localhost:3000/](http://localhost:3000/) - Rota principal do site