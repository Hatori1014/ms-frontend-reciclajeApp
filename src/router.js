import { createRouter, createWebHistory } from "vue-router";
import App from './App.vue';
import LogIn from './components/LogIn.vue'
import Home from './components/Home.vue'
import SignUp from './components/SignUp.vue'
import SignupCitas from '@/components/SignupCitas'
import UpdateUsuario from './components/UpdateUsuario.vue'
import UpdateCitas from './components/UpdateCitas.vue'
import ListByCitas from '@/components/ListByCitas.vue'

const routes = [{
    path: '/',
    name: 'root',
    component: App
},
{
    path: '/user/logIn',
    name: "LogIn",
    component: LogIn
},
{
    path: '/user/home',
    name: "home",
    component: Home
},
{
    path: '/user/signUp',
    name: "signUp",
    component: SignUp
},
{
    path: '/citas',
    name: "signupCitas",
    component: SignupCitas
},
{
    path: '/updateUsuario',
    name: "UpdateUsuario",
    component: UpdateUsuario
},
{
    path:'/user/list',
    name:'listByCitas',
    component: ListByCitas
},
{
    path: '/updateCita/:id',
    name: "UpdateCita",
    component: UpdateCitas
},

];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
