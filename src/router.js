import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: () => import('@/pages/welcome/index.vue')
    },
    {
        path: '/accounts',
        name: 'Accounts',
        component: () => import('@/pages/accounts/index.vue')
    },
    {
        path: '/reports',
        name: 'Reports',
        component: () => import('@/pages/reports/index.vue')
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('@/pages/settings/index.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;