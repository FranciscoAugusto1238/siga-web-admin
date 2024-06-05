<template>
  <a-container>
      <v-form class="login" @submit.prevent="login">
        <v-img :src="logoBranca" contain height="200" max-width="250px" class="mx-auto my-auto" />
        <p class="logo-text">AOM sistema administrativo</p>
        <div class="input-container">
          <input 
            type="email" 
            placeholder="Digite seu email"
            v-model="login_form.email" 
            class="email-input"/>
          <input 
            type="password" 
            placeholder="Digite sua senha" 
            v-model="login_form.password" />
          <input 
            type="submit" 
            value="Login" />
        </div>
      </v-form>
  </a-container>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import logoBranca  from "@/assets/associacao.jpg";

export default {
	setup () {
		const login_form = ref({});
		const register_form = ref({});
		const store = useStore();

		const login = () => {
			store.dispatch('login', login_form.value);
		}

		const register = () => {
			store.dispatch('register', register_form.value);
		}

		return {
			logoBranca,
			login_form,
			register_form,
			login,
			register
		}
	}
}
</script>

<style scoped>
.email-input {
  margin-top: 1.5rem;
}

.logo-text {
  text-align: center;
  font-size: 2.2rem;
  color: #2c3e50; /* ou a cor desejada */
  margin-top: 2rem; /* ou o espaçamento desejado */
}
input {
	appearance: none;
	border: none;
	outline: none;
	background: none;

	display: block;
	width: 100%;
	max-width: 400px;
	margin: 0 auto;
	font-size: 1.5rem;
	margin-bottom: 2rem;
	padding: 0.5rem 0rem;
}


form.register input:not([type="submit"]) {
	color: #0f0a0a;
	border-bottom: 2px solid #ffffff00;
}

form.login input:not([type="submit"]) {
	color: #2c3e50;
	border-bottom: 2px solid #2c3e50;
}

form.login input[type="submit"] {
	background-color: rgb(180, 173, 173);
	color: #141111;
	font-weight: 700;
	padding: 1rem 2rem;
	border-radius: 0.5rem;
	cursor: pointer;
	text-transform: uppercase;
}

</style>