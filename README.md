# Onfly Full Stack Test
Esse repositório faz parte do teste para desenvolvedor full stack senior na empresa Onfly.

## Como rodar o projeto
1. Clone o projeto na sua maquina (e garanta que o docker esteja devidamente instalado e funcionando [https://docs.docker.com/get-started/get-docker/](https://docs.docker.com/get-started/get-docker/))
2. Abra a pasta `api` e crie uma cópia do arquivo `.env.example` e altere seu nome para `.env`
3. Na raiz do projeto, abra um terminal e utilize o seguinte comando `docker compose -f docker-compose-deps.yml up -d` (irá iniciar os containers necessários para a instaação de dependencias)
4. Na raiz do projeto, abra um terminal e utilize o seguinte comando `docker compose -f docker-compose-deps.yml up -d` (irá iniciar os containers necessários para a instaação de dependencias), aguarde ate que os containers `onfly-composer-1` e `onfly-node-1` sejam encerrados
5. Aguarde até que as dependencias tenham sido instaladas (aguarde até que os containers `onfly-composer-1` e `onfly-node-1` sejam encerrados,
6. Na raiz do projeto, utilize o seguinte comando `docker compose up -d` esse processo pode demorar e irá iniciar os containers das aplicações

> Obs.: Ambas as aplicações estão configuradas para funcionar no modo dev, isso significa que otimizações de velocidade não serão aplciadas, alem de que ferramentas instrumentadas para desenvolvimento, continuarão rodando, como o caso de debuggers, linters, opcache, e etc...

### Docker Windows + WSL
Caso o sistema operacional da maquina seja Windows com WSL2, o recomendado (recomendação oficial Microsoft) é que o projeto seja clonado e rodado dentro do WSL2, isso se deve ao fato da forma com que o docker funciona.
Rodar o projeto diretamente no ambiente windows, causará duas situações:

1. Desempenho reduzido - Ao rodar um projeto Docker diretamente no Windows, fará com que o sistema operacional tenha, sincronizar a escrita  e leitura dos dados para o container, isso significa que quando o container precisa acessar o arquivo, de fato, ele não estará lá, mas sim será um volume montado no qual a cada arquivo lido, o sistema tenha que solicitar ao windows uma sincronização do arquivo, isso fará com que a performance da aplicação se degrade em mais de 10x ((clique aqui para saber mais)[https://learn.microsoft.com/pt-br/windows/wsl/setup/environment])

2. Hot reload não funcionará - Outra restrição do WSL2, é que ao salvar um arquivo no Windows, o arquivo e os dados em si serão sincronizados, entretanto as notificações de modificações de arquivo, não são repassadas ao sistema linux e ao container, na pratica, aplicações em node, utilizam essas notificações para saber se um arquivo foi ou não modificado, como essas notificações nunca chegarão, o node nunca atualizará e fará o Hot reload.

### Rotas
- [http://localhost:8080/up](http://localhost:8080/up) - Tela inicial para verificar se aplicação em laravel está rodando
- [http://localhost:8080/horizon](http://localhost:8080/horizon) - Tela do orquestrador de filas e processos do laravel
- [http://localhost:8080/docs/api](http://localhost:8080/docs/api) - Documentação dos endpoints
- [http://localhost:3000/](http://localhost:3000/) - Rota principal do site


### Rodando testes
Para rodar os testes da aplicação de backend, acesse um terminal e digite os seguintes comandos:
```bash
docker exec -it onfly-onfly.fpm-1 sh
php artisan migrate --env=testing
./vendor/bin/pest
```
php artisan migrate --env=testing