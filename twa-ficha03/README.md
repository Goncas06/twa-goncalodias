# Ficha 03 — Página do catálogo

Tecnologias Web Avançadas · ISLA Gaia · 2026/27

Página (Vite vanilla) que mostra o catálogo de jogos de tabuleiro da Ficha 02, com
pesquisa, filtro por categoria, ordenação por preço e detalhe do item.

## Como correr

    npm install
    npm run dev      # abre a página em http://localhost:5173
    node check.js    # não imprime nada se tudo passar

## O que está feito

- `load()` com `fetch` + `async/await`, `res.ok` e os estados loading / error / ready
- `render(state)` com `createElement` + `textContent` (nunca `innerHTML` com dados)
- Eventos (pesquisa, categoria, ordenação, clique num item) que só mudam o `state`
- `sortByPrice(list, dir)` em `src/catalog.js`, com asserções em `check.js`
- Bónus: delegação de eventos em `#list` e botão "Tentar de novo" no estado de erro

## Declaração de uso de IA

Esta ficha foi feita em casa com apoio de uma ferramenta de IA (Claude, da Anthropic),
que me guiou passo a passo e gerou o código. Li e testei o código e percebo o que cada
parte faz.