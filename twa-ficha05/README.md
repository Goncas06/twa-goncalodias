# Ficha 05 — Componentes e formulários

Tecnologias Web Avançadas · ISLA Gaia · 2026/27

O catálogo de jogos de tabuleiro da Ficha 04, agora dividido em componentes Vue, com um
formulário para adicionar itens e um composable para o carregamento.

## Como correr

    npm install
    npm run dev      # abre a página em http://localhost:5173
    node check.js    # não imprime nada se tudo passar

## O que está feito

- `components/ItemList.vue` (props `items`, `selectedId`; emite `select`)
- `components/ItemDetail.vue` (prop `item`)
- `components/ItemForm.vue`: rascunho `reactive`, `v-model.trim` / `.number`, categorias por
  prop, `@submit.prevent`, `errors` + `isValid` como `computed`, emite `save` e faz reset
- `App.vue` fica com o estado, os `computed` e os controlos; `addItem` com `nextId`
- `composables/useLoad.js` (os três estados, com `onMounted`) e `api/getJSON.js`
- `watch(query, ...)` limpa a seleção ao pesquisar

## Declaração de uso de IA

Esta ficha foi feita em casa com apoio de uma ferramenta de IA (Claude, da Anthropic),
que me guiou passo a passo e gerou o código. Li e testei o código e percebo o que cada
parte faz.