import { createRouter, createWebHistory } from 'vue-router';
import LayoutPadraoo from "../components/layouts/LayoutPadrao.vue";
import { auth } from '../firebase';

const routesPadrao = [
  {
    path: '',
    name: 'cadastroAssociado',
    meta: { requiresAuth: false },
    component: LayoutPadraoo,
    children: [
      {
        path: '/home', 
        name: "TelaInicial",
        component: () => import('../views/login/TelaInicial.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/cadastro-reaja/:id?', 
        name: "CadastroReaja",
        component: () => import('../views/reaja/CadastroReaja.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/cadastro-professor/:id?', 
        name: "CadastroProfessor",
        component: () => import('../views/professor/CadastroProfessor.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/cadastro-alunos/:id?', 
        name: "CadastroAlunos",
        component: () => import('../views/alunos/CadastroAlunos.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/cadastro-disciplina/:id?', 
        name: "CadastroDisciplina",
        component: () => import('../views/disciplina/CadastroDisciplina.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/cadastro-sala-aula/:id?', 
        name: "CadastroSala",
        component: () => import('../views/sala/CadastroSala.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/cadastro-presenca/:id?', 
        name: "CadastroPresenca",
        component: () => import('../views/presenca/CadastroPresenca.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/cadastro-aula/:id?', 
        name: "CadastroAula",
        component: () => import('../views/aulas/CadastroAula.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/cadastro-matricula/:id?', 
        name: "CadastroMatricula",
        component: () => import('../views/matriculas/CadastroMatricula.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/cadastro-notas/:id?', 
        name: "CadastroNotas",
        component: () => import('../views/notas/CadastroNotas.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/cadastro-atividade/:id?', 
        name: "CadastroAtividades",
        component: () => import('../views/atividades/CadastroAtividades.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/cadastro-entrega/:id?', 
        name: "CadastroEntrega",
        component: () => import('../views/entrega/CadastroEntrega.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/cadastro-mensagem/:id?', 
        name: "CadastroMensagem",
        component: () => import('../views/mensagem/CadastroMensagem.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/listar-reaja/:id?',
        name: "ListarReaja", 
        component: () => import('../views/reaja/ListarReaja.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/listar-aluno/:id?',
        name: "ListarAlunos", 
        component: () => import('../views/alunos/ListarAlunos.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/listar-aulas/:id?',
        name: "ListarAulas", 
        component: () => import('../views/aulas/ListarAulas.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/listar-professores/:id?',
        name: "ListarProfessores", 
        component: () => import('../views/professor/ListarProfessores.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/listar-salas/:id?',
        name: "ListarSalas", 
        component: () => import('../views/sala/ListarSalas.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/listar-disciplinas/:id?',
        name: "ListarDisciplinas", 
        component: () => import('../views/disciplina/ListarDisciplinas.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/listar-matriculas/:id?',
        name: "ListarMatriculas", 
        component: () => import('../views/matriculas/ListarMatriculas.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/listar-presencas/:id?',
        name: "ListarPresencas", 
        component: () => import('../views/presenca/ListarPresencas.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/listar-entregas/:id?',
        name: "ListarEntregas", 
        component: () => import('../views/entrega/ListarEntregas.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/listar-atividades/:id?',
        name: "ListarAtividades", 
        component: () => import('../views/atividades/ListarAtividades.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/listar-mensagens/:id?',
        name: "ListarMensagens", 
        component: () => import('../views/mensagem/ListarMensagens.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/listar-notas/:id?',
        name: "ListarNotas", 
        component: () => import('../views/notas/ListarNotas.vue'),
        meta: { requiresAuth: false },
      },
    ]

  }
];
const routesSemFundo = [
	{
		path: "/login",
    name: 'telaLogin',
		children: [
			{
				path: '/login',
        name: "LoginUsuario",
				component: () => import('../views/login/TelaLogin.vue'),
			}
		],
	},
];

const routes = routesPadrao.concat(routesSemFundo);

const router = createRouter({
  history: createWebHistory("/siga-web"),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  if (requiresAuth && !auth.currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;
