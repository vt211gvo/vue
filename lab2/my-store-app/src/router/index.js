import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: DefaultLayout,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => import('../views/Home.vue')
                },
                {
                    path: 'product/:id',
                    name: 'product-detail',
                    component: () => import('../views/ProductDetail.vue'),
                    props: true
                },
                {
                    path: 'cart',
                    name: 'cart',
                    component: () => import('../views/Cart.vue')
                },
                {
                    path: 'checkout',
                    name: 'checkout',
                    component: () => import('../views/Checkout.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('../views/Login.vue')
                }
            ]
        }
    ]
})

// Middleware для захисту маршрутів
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('user') !== null;

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'login', query: { redirect: to.fullPath } });
    } else {
        next();
    }
});

export default router