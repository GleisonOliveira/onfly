# Onfly Full Stack Test
Esse repositório faz parte do teste para desenvolvedor full stack senior na empresa Onfly.

## Como rodar o projeto
1. Clone o projeto na sua maquina (e garanta que o docker esteja devidamente instalado e funcionando [https://docs.docker.com/get-started/get-docker/](https://docs.docker.com/get-started/get-docker/))
2. Abra a pasta `api` e crie uma cópia do arquivo `.env.example` e altere seu nome para `.env`
3. Na raiz do projeto, abra um terminal e utilize o seguinte comando `docker compose up -d` (irá iniciar os containers necessários para a aplicação)
4. Aguarde alguns segundos até que as dependencias tenham sido instaladas (agurade até que o container `onfly.container` seja encerrado)