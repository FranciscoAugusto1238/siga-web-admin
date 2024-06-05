<template>
  <div class="app">
    <div class="app-bar">
      <!-- Conteúdo da AppBar, como título e botões de ação -->
      <h1>Meu App</h1>
    </div>
    <div class="app-content">
      <div class="options-column">
        <!-- Coluna de opções -->
        <ul>
          <li><a href="#">Opção 1</a></li>
          <li><a href="#">Opção 2</a></li>
          <li><a href="#">Opção 3</a></li>
        </ul>
      </div>
      <div class="content">
        <!-- Conteúdo principal do aplicativo -->
        <h1>{{ msg }}</h1>
        <!-- O restante do seu conteúdo aqui -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.app {
  background-color: red; /* Cor de fundo vermelha */
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.app-bar {
  padding: 16px;
  background-color: #333; /* Cor da barra de aplicativo */
  color: white; /* Cor do texto na barra de aplicativo */
}

.app-content {
  display: flex;
  flex: 1;
}

.options-column {
  flex: 1;
  background-color: #555; /* Cor de fundo da coluna de opções */
  padding: 16px;
  color: white; /* Cor do texto na coluna de opções */
}

.options-column ul {
  list-style-type: none;
  padding: 0;
}

.options-column li {
  margin-bottom: 10px;
}

.content {
  flex: 3;
  padding: 16px;
  /* Estilos de conteúdo principal aqui */
}
</style>
