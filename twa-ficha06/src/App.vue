<template>
  <main>
    <h1>Catálogo de jogos</h1>

    <nav>
      <RouterLink to="/">Catálogo</RouterLink>
      <RouterLink to="/items/new">Novo jogo</RouterLink>
      <RouterLink to="/pokemon">Pokémon</RouterLink>
    </nav>

    <RouterView />
  </main>
</template>

<style>
body {
  font-family: system-ui, sans-serif;
  margin: 0;
  background: #f6f6f8;
  color: #1c1c28;
}

main {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 16px;
}

input,
select,
button {
  font: inherit;
  padding: 8px 10px;
  border: 1px solid #c4c4d0;
  border-radius: 6px;
  background: #fff;
}

button {
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.status {
  margin: 0;
  padding: 10px 12px;
  color: #555;
}

.status.error {
  color: #9b1c1c;
}
</style>

<style scoped>
nav {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

nav a {
  padding: 6px 12px;
  border: 1px solid #dcdce6;
  border-radius: 6px;
  background: #fff;
  color: inherit;
  text-decoration: none;
}

nav a.router-link-exact-active {
  border-color: #6b1d2e;
  background: #f7eaed;
}
</style>