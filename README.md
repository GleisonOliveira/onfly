# Onfly Full Stack Test
Esse repositório faz parte do teste para desenvolvedor full stack senior na empresa Onfly.

## Como rodar o projeto
1. Clone o projeto na sua maquina (e garanta que o docker esteja devidamente instalado e funcionando [https://docs.docker.com/get-started/get-docker/](https://docs.docker.com/get-started/get-docker/))
2. Abra a pasta `api` e crie uma cópia do arquivo `.env.example` e altere seu nome para `.env`
3. Acesse o site [https://mailtrap.io/](https://mailtrap.io/), acesse ou crie uma conta para o enbvio de e-mails de teste
4. Na tela principal do mailtrap, desça até encontrar PHP, clique e escolha **Laravel 9+**, copie as credenciais e cole as no arquivo `.env` (nas variáveis **MAIL_HOST**, **MAIL_PORT**, **MAIL_USERNAME**, **MAIL_PASSWORD**)
5. Na pasta raiz do proejto, abra a pasta `site` e crie uma cópia do arquivo `.env.example` e altere seu nome para `.env`
6. Na raiz do projeto, abra um terminal e utilize o seguinte comando `docker compose -f docker-compose-deps.yml up -d` (irá iniciar os containers necessários para a instaação de dependencias), aguarde ate que os containers `onfly-composer-1` e `onfly-node-1` sejam encerrados
7. Aguarde até que as dependencias tenham sido instaladas (aguarde até que os containers `onfly-composer-1` e `onfly-node-1` sejam encerrados,
8. Na raiz do projeto, utilize o seguinte comando `docker compose up -d` esse processo pode demorar e irá iniciar os containers das aplicações

> Obs.: Ambas as aplicações estão configuradas para funcionar no modo dev, isso significa que otimizações de velocidade não serão aplciadas, alem de que ferramentas instrumentadas para desenvolvimento, continuarão rodando, como o caso de debuggers, linters, opcache, e etc...
> Caso ocorra algum problema no build, favor, rodar novamente (problemas de conectividade com a internet podem causar problemas no build) 

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
- [http://localhost:3000/#/login-admin](http://localhost:3000/#/login-admin) - Rota administrativa

#### Fazendo uma reserva
1. Acesse a rota [http://localhost:3000/](http://localhost:3000/) você terá acesso a página principal, sendo que para efetuar uma reserva, clique no botão **Minha Conta** na parte superior
2. Na página de login, digite seus dados de acesso, ou caso ainda não tenha uma conta, clique no botão **Cadastre-se** e preencha com seus dados
3. Na tela principal, clique em **Nova reserva**, escolha a data de partida, de chegada e o local e clique em **Salvar pedido**

#### Administrando reservas
1. Acesse a rota [http://localhost:3000/#/login-admin](http://localhost:3000/#/login-admin)
2. Na página de login, digite `admin@onfly.com.br` como e-mail e `password` como senha

#### Verificando os e-mails enviados
1. Ao atualizar uma reserva, o sistema enviará um e-mail para o e-mail do usuário da reserva, como essa ação pode ser demorada, o sistema fará o envio de forma assincrona, portanto existe a possibilidade do e-mail levar alguns segundos para ser disparado.
2. Você receberá os e-mails a cada atualização de status na sua caixa do **MailTrap**
3. Os jobs executados podem ser acompanhados através do link [http://localhost:8080/horizon/jobs/completed](http://localhost:8080/horizon/jobs/completed)

### Rodando testes
Para rodar os testes da aplicação de backend, acesse um terminal e digite os seguintes comandos:
```bash
docker exec -it onfly-onfly.fpm-1 sh
php artisan migrate --env=testing
composer test
```