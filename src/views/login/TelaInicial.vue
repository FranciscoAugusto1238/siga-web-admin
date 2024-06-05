<template>
    <div class="welcome-screen">
      <h1>Bem-vindo ao sistema administrativo da AOM</h1>
      <p class="development-message">Estamos em desenvolvimento...</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "TelaInicial",
  };
  </script>
 <style scoped>
 .welcome-screen {
    display: block;
   align-items: center;
   justify-content: center;
   height: 100vh;
 }
 
 .content {
   text-align: center;
 }
 
 .development-message {
  color: red;
  font-size: 18px;
  margin-top: 10px;
  margin-left: 10px; /* Adiciona um espaço à esquerda para separar os textos */
}

 </style>
  