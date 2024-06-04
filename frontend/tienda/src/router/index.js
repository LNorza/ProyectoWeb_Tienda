import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClientesView from '../views/ClientesView.vue';
import ProveedoresView from '@/views/ProveedoresView.vue';

import clientesCreateView from '@/views/ClientesCreateView.vue';
import ClientesEditarView from '@/views/ClientesEditarView.vue';
import RegistroView from '@/views/RegistroView.vue'
import EntradaView from '@/views/EntradaView.vue'

import NoAutorizaView from '@/views/NoAutorizaView.vue'

import { getAuth } from "firebase/auth";

// 
// Proyecto fonal
import vendedores from '@/views/Vendedores/vendedores.vue';
import vendedoresCreateView from '@/views/Vendedores/vendedoresCreateView.vue';
import vendedoresEditarView from '@/views/Vendedores/vendedoresEditarView.vue';
import VentasView from '@/views/Ventas/VentasView.vue'






const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/clientes',
            name: 'clientes',
            component: () => import('../views/ClientesView.vue'),
            meta: {
                requireAuth: true,
            }
        },
        {
            path: '/proveedores',
            name: 'proveedores',
            component: () => import('../views/ProveedoresView.vue')
        }
        ,
        {
            path: '/ventas',
            name: 'ventas',
            component: VentasView,
        }
        ,
        {
            path: '//clientes/create',
            name: 'clientesCreate',
            component: clientesCreateView
        },
        {
            path: '/clientes/:id/edit',
            name: 'clientesEditar',
            component: ClientesEditarView
        }
        ,
        {
            path: '/clientes/registro',
            name: 'Registro',
            component: RegistroView
        }
        ,
        {
            path: '/clientes/entrada',
            name: 'entrada',
            component: EntradaView
        }
        ,
        {
            path: '/clientes/noautorizar',
            name: 'noautorizar',
            component: NoAutorizaView
        }
        ,
        {
            path: '/vendedores',
            name: 'vendedores',
            component: vendedores
        }
        ,
        {
            path: '/vendedores/create',
            name: 'vendedoresCreate',
            component: vendedoresCreateView
        }
        ,
        {
            path: '/vendedores/:id/edit',
            name: 'vendedoresEditar',
            component: vendedoresEditarView
        }
        ,
    ]
})

// //analizamos todas las rutas antes de que se ejecute
// router.beforeEach((to,from,next)=>{
//   //si alguna ruta tiene meta.requiereAuth
//   if(to.matched.some((record) => record.meta.requireAuth)){
//     //si existe un usario registrado
//     if(getAuth().currentUser){
//       next();//continuar sin problema
//     }else{
//       // alert("Acceso no autorizado")
//       next("/clientes/noautorizar")
//     }
//   }else{
//     next();
//   }
// })

export default router