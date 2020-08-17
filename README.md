<p align="center">
  <img src="./public/assets/logo_light.svg" alt="Cataloguei" width="64">
</p>
<br />
<p align="center">
  <img src="https://img.shields.io/github/package-json/v/marcosvaz/cataloguei?style=for-the-badge" alt="GitHub package.json version" />
  <img src="https://img.shields.io/github/last-commit/marcosvaz/cataloguei?style=for-the-badge" alt="GitHub last commit">
  <img src="https://img.shields.io/github/deployments/marcosvaz/cataloguei/production?style=for-the-badge" alt="GitHub deployments">
  <br />
  <img src="https://img.shields.io/github/license/marcosvaz/cataloguei?style=for-the-badge" alt="License" />
</p>

## Cataloguei
<b>Cataloguei</b> é uma aplicação onde o usuário pode ver os filmes populares do momento, em tendência, os melhores avaliados, adicionar filmes aos seus favoritos e pesquisar informações e detalhes de um filme específico.

#### Você pode encontrar o projeto no ar em:
[https://cataloguei.vercel.app](https://cataloguei.vercel.app)

---
<br />

### Rodando o projeto na sua máquina

#### Requisitos:
- [NPM](https://nodejs.org/en/) (versão LTS) ou [Yarn](https://classic.yarnpkg.com/pt-BR/docs/install/) instalados
- [GIT](https://git-scm.com/downloads) (se for utilizar o comandos do git)

#### Instruções:
Para instalar o projeto na sua máquina através do Github, baixe, ou clone esse repositório através do botão ```Code``` e ```Download ZIP``` em [Github](https://github.com/marcosvaz/cataloguei) ou utilize o seguinte comando no terminal:
```bash
git clone https://github.com/marcosvaz/cataloguei.git && cd cataloguei
```

Caso já tenha os arquivos, ou após terminar de baixar, instale as depêndencias utilizando:
```bash
npm install
# ou
yarn
```

Antes de rodar o projeto, você precisará criar um arquivo com variáveis de ambiente chamado ```.env.local```, seguindo o exemplo do arquivo ```.env.example```:
```text
NEXT_PUBLIC_API_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_API_KEY=
```
> A API utilizada no projeto é a da plataforma [TMDB](https://www.themoviedb.org/).
>
> Para solicitar a chave:
> - Crie uma conta;
> - Clique na sua foto e em ```Configurações```;
> - Acesse a aba ```API```;
> - Copie o campo ```Chave da API (v3 auth)``` e cole em frente ao ```NEXT_PUBLIC_API_KEY``` no seu arquivo ```.env.local```, assim ele se parecerá com o seguinte:
```text
NEXT_PUBLIC_API_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_API_KEY=a78125r98a00dbjqw1217652q283t01j
```
> <b>IMPORTANTE:</b> A KEY utilizada no exemplo é fictícia, provavelmente não irá funcionar para realizar as requisições da API.

Com tudo configurado, você deve conseguir rodar o projeto na sua máquina, utilizando o comando:

```bash
npm run dev
# ou
yarn dev
```

#### Acessando:
Após realizar o comando, acesse [http://localhost:3000](http://localhost:3000) em um navegador de sua preferência.

---
<br />

### Testes
Para rodar os testes (Jest & Enzyme), utilize o seguinte comando:
```bash
npm run test
# ou
yarn test
```
> Para a opção de ```coverage```, pode-se utilizar os seguintes comandos:
```bash
npm run coverage
# ou
yarn coverage
```

---
> <b>Obs:</b> Infelizmente, para realizar deploy do projeto, não é possível que tenha os arquivos de teste. Para baixar o projeto sem esses arquivos, é só acessar a branch ```prod``` do projeto no repositório.

<br />

### Licença
Acesse o arquivo da licença em [LICENSE.md](./LICENSE.md) para mais informações.
