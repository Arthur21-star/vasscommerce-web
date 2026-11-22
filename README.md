# VassCommerce Web

Painel em React que consome a **VassCommerce API** (Spring Boot) para gerenciar o catálogo de produtos e categorias.
Projeto da disciplina **Laboratório de Programação FullStack**, Prof.Tássio Auad.

## O que o projeto faz

- **Vitrine:** lista os produtos em cartões, com preço riscado quando há promoção e aviso "Esgotado" quando o estoque acaba.
- **Filtros:** por categoria (nova requisição à API) e busca pelo nome (calculada no front, sem requisição).
- **Cadastro e edição:** o mesmo formulário serve para criar (POST) e editar (PUT) um produto.
- **Exclusão:** com confirmação (DELETE); o cartão sai da lista sem nova busca.
- **Erros da API:** mensagens de validação (HTTP 400) aparecem embaixo de cada campo; erros de regra de negócio (HTTP 422) aparecem no topo do formulário.

## Tecnologias

- React 19 + Vite
- CSS puro (variáveis CSS) e CSS Modules
- `fetch` com `AbortController`
- oxlint (lint)

## Pré-requisitos

- Node.js LTS (22 ou 24) e npm
- JDK 17 ou mais novo (apenas para rodar a API)

```bash
node -v
npm -v
java -version
```

## Como rodar

### 1. Subir a API

Baixe o `vasscommerce-api.jar` (disponibilizado pelo professor no AVA), abra um terminal na pasta dele e rode:

```bash
java -jar vasscommerce-api.jar
```

Espere aparecer `Started VassCommerceApiApplication`. A API fica em `http://localhost:8080`
(Swagger em `http://localhost:8080/swagger-ui.html`).

> A API guarda os dados em memória: ao reiniciar, tudo volta aos dados de exemplo (5 categorias e 10 produtos).

### 2. Subir o front

Em outro terminal, dentro da pasta do projeto:

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`.

### 3. Versão de produção (opcional)

```bash
npm run lint      # verifica o código
npm run build     # gera a pasta dist/
npm run preview   # serve o dist/ em http://localhost:4173
```

O `preview` também usa o proxy, então a API precisa estar rodando.

## Como o front fala com a API

O front roda na porta 5173 e a API na 8080. Para evitar CORS, o `vite.config.js` configura um **proxy**:
tudo que começa com `/api` é repassado para `http://localhost:8080`. O código chama apenas `/api/...`.

O alias `@` aponta para a pasta `src/` (por exemplo, `@/shared/api/http`).

## Telas

| Tela | O que tem |
| --- | --- |
| Vitrine | Cartões de produtos, filtro por categoria, busca por nome, botões Editar e Excluir, botão "+ Novo produto" |
| Formulário de produto | Cadastro e edição, validação mínima no front e mensagens da API sob cada campo |

A navegação entre telas é feita por estado no `App.jsx` (sem biblioteca de rotas).

## Organização das pastas

```text
src/
  App.jsx                      torre de controle: tela atual, produto em edição e aviso
  main.jsx
  index.css                    variáveis de cor e estilos globais
  shared/                      o que qualquer feature pode usar
    api/http.js                request(): única função que chama fetch
    components/                Aviso, Cabecalho, Campo
    utils/formatarMoeda.js     brl()
  features/
    catalogo/                  tudo sobre produtos e categorias
      index.js                 páginas exportadas pela feature
      services/                chamadas HTTP (produtos e categorias)
      hooks/                   useProdutos, useProduto, useCategorias
      components/              ProdutoCard, ListaProdutos, FiltroProdutos, ProdutoForm
      pages/                   CatalogoPage, ProdutoFormPage
      utils/                   conversão formulário <-> DTO e validação
```

## Endpoints usados

| Método | URI | Uso |
| --- | --- | --- |
| GET | `/api/categorias` | preencher o filtro e o select do formulário |
| GET | `/api/produtos` e `/api/produtos?categoriaId=2` | vitrine |
| GET | `/api/produtos/{id}` | carregar o produto na edição |
| POST | `/api/produtos` | cadastrar |
| PUT | `/api/produtos/{id}` | editar |
| DELETE | `/api/produtos/{id}` | excluir |

## Problemas comuns

- **`Unable to access jarfile`:** o terminal não está na pasta do `.jar`.
- **Porta 8080 ou 5173 ocupada:** feche a cópia antiga da API ou do Vite.
- **`/api` devolve HTML ou 404:** o proxy não foi aplicado; confira o `vite.config.js` e reinicie o `npm run dev`.
- **Erro "A API não respondeu":** a API não está rodando na porta 8080.
- **Produtos cadastrados sumiram:** a API foi reiniciada (dados em memória).

## Autor

Arthur do Nascimento Soares: [github.com/Arthur21-star](https://github.com/Arthur21-star)
