# Ficha 06 — Rotas e paginação

Tecnologias Web Avançadas · ISLA Gaia · 2026/27

O catálogo de jogos de tabuleiro da Ficha 05, agora com Vue Router: um URL por ecrã, o
detalhe de um item pelo URL e uma página paginada de Pokémon.

## Como correr

    npm install
    npm run dev      # abre a página em http://localhost:5173
    node check.js    # não imprime nada se tudo passar

## Rotas

| Caminho        | Ecrã                                   |
| -------------- | -------------------------------------- |
| `/`            | Catálogo (pesquisa, categoria, ordem)  |
| `/items/new`   | Formulário; ao guardar vai para o item |
| `/items/:id`   | Detalhe do item (id lido do URL)       |
| `/pokemon`     | Lista paginada da PokéAPI (`?page=`)   |
| qualquer outro | 404                                    |

## O que está feito

- `router.js` com `createWebHistory`, `main.js` com `.use(router)`, `App.vue` com
  `<nav>` + `<RouterView>` e `<RouterLink>` (nenhum `<a href>` para ecrãs internos)
- `store.js` com o estado partilhado (`items`, `status`, `error`, `load`, `addItem`);
  cada página faz `onMounted(() => { if (!items.value) load() })`
- Páginas em `src/pages/`: `CatalogPage`, `ItemPage`, `NewItemPage`, `PokemonPage`, `NotFound`
- Detalhe pelo URL: `Number(route.params.id)` num `computed` sobre o store; "não encontrado"
  com link de volta
- `/pokemon`: `src/api/pokeapi.js` (`list(page)`, `get(name)`, `PAGE = 20`); a página vem de
  `route.query`, `useLoad` + `watch(page, load)`, botões Anterior / Seguinte com
  `router.push({ query })`, desativados nas pontas, "página x de y"

## Declaração de uso de IA

Esta ficha foi feita em casa com apoio de uma ferramenta de IA (Claude, da Anthropic),
que me guiou passo a passo e gerou o código. Li e testei o código e percebo o que cada
parte faz.