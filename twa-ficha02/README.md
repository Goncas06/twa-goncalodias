# Ficha 02 — Módulo de catálogo

Tecnologias Web Avançadas · ISLA Gaia · 2026/27

Catálogo de jogos de tabuleiro em JavaScript moderno (ES modules, estilo funcional).

## Ficheiros

- `data.js` — 9 itens com `id`, `name`, `category`, `price`, `tags` e `designer` (objeto aninhado)
- `catalog.js` — funções puras: `byCategory`, `search`, `total`, `top`, `categories`, `withDiscount` (+ `groupByCategory`)
- `app.js` — único ficheiro que imprime; lê os argumentos da linha de comandos
- `check.js` — asserções com `node:assert/strict`
- `report.json` — relatório gerado por `node app.js report`

## Como usar

    node app.js                  # lista tudo
    node app.js família          # só essa categoria
    node app.js search clássico  # pesquisa
    node app.js top 3            # os 3 mais caros
    node app.js groups           # agrupado por categoria
    node app.js report           # escreve report.json
    node check.js                # não imprime nada se tudo passar

## Declaração de uso de IA

Esta ficha foi feita em casa com apoio de uma ferramenta de IA (Claude, da Anthropic),
que me guiou passo a passo e gerou o código. Li e testei o código e percebo o que cada
função faz.