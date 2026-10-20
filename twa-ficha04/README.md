# Ficha 04 — Catálogo em Vue

Tecnologias Web Avançadas · ISLA Gaia · 2026/27

O catálogo de jogos de tabuleiro da Ficha 03, agora feito em Vue 3 (Composition API,
`<script setup>`), sem `render()` e sem `document.querySelector`.

## Como correr

    npm install
    npm run dev      # abre a página em http://localhost:5173
    node check.js    # não imprime nada se tudo passar

## O que está feito

- Estado em `ref`s (`status`, `error`, `items`, `query`, `category`, `sortDir`, `selectedId`)
- `load()` com `fetch` + `res.ok` + `try/catch`, a escrever nos refs
- Três `computed`: `visible` (pesquisa → categoria → ordenação), `cats` e `selected`
- Template com `v-model`, `@click`, `v-if` / `v-else-if` / `v-else`, `v-for` + `:key`
  e `:class`; o detalhe mostra nome, preço, tags e o objeto aninhado (autor)
- Estilos em `<style scoped>`
- Botão "Tentar de novo" no estado de erro

## Declaração de uso de IA

Esta ficha foi feita em casa com apoio de uma ferramenta de IA (Claude, da Anthropic),
que me guiou passo a passo e gerou o código. Li e testei o código e percebo o que cada
parte faz.