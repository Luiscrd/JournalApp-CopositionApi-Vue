export default {
    
    name: 'ahut',
    component: () => import(/* webpackChunkName: "auth" */ '@/modules/auth/layouts/AuthLayout.vue'),
    children: [
        {
            path: '',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ '@/modules/auth/views/Login.vue'),
        },
        {
            path: 'registro',
            name: 'registro',
            component: () => import(/* webpackChunkName: "registro" */ '@/modules/auth/views/Registro.vue'),
        },
    ]
}