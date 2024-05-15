## Introdução ao projeto

Após receber um projeto do Figma, desenvolvi um projeto de acordo com aquilo que julguei ser mais coerente com o teste que recebi, então criei um catálogo para uma loja de sneakers da Next.

## Primeiros passos

Primeiro inicie o servidor fake utilizando:

```bash
npx json-server --watch src/api/db.json
```

Isso irá iniciar um servidor e você pode acessá-lo na url: [http://localhost:3000](http://localhost:3000) no seu navegador, nessa url vocÇE pode observar as rotas disponíveis da API.

Após isso inicie o servidor de desenvolvimento utilizando:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

O projeto será aberto em [http://localhost:3001](http://localhost:3001) pois estamos utilizando a porta 3000 para rodar a API.

## Features

1. Logo quando abrimos o projeto podemos ver uma tabela com os itens que são carregados da API, podemos ver informações como o código e nome do produto, categoria, brand e collab.

2. A tabela possui uma função de paginação, no momento a tabela está limitada a 5 itens por página e para passar de página basta utilizar os icones no canto inferior direito.

3. No canto superior direito da tabela há uma barra de pesquisar que pode ser utilizada para encontrar produtos específicos de forma mais adequada.

4. No canto superior direito da tabela, o primeiro botão irá abrir uma modal que permite definir filtros para exibir informações de acordo com os mesmos.

5. O segundo botão, ordena de forma crescente e decrescente de acordo com o primeiro e segundo clique respectivamente.

6. O botão com reticências na coluna mais a direita da tabela permite ver uma modal com informações adicionais do produto em questão.
