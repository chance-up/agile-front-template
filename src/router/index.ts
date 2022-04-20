import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/e',
    component: () => import('@/pages/ExamplePage.vue'),
  },
  {
    path: '/',
    name: 'index',
    //component: () => import('@/pages/LoginPage.vue'),
    component: () => import('@/pages/main/MainPage.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/LoginPage.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/AboutPage.vue'),
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/pages/main/MainPage.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/main/home/HomePage.vue'),
      },

      // System
      {
        path: '/system_list',
        name: 'system_list',
        component: () => import('@/pages/main/system/SystemListPage.vue'),
      },
      {
        path: '/system_edit',
        name: 'system_register',
        component: () => import('@/pages/main/system/children/SystemEditPage.vue'),
      },
      {
        path: '/system_register',
        name: 'system_register',
        component: () => import('@/pages/main/system/children/SystemRegisterPage.vue'),
      },
      {
        path: '/system_view',
        name: 'system_view',
        component: () => import('@/pages/main/system/children/SystemViewPage.vue'),
      },

      {
        path: '/api',
        name: 'api',
        component: () => import('@/pages/main/api/ApiPage.vue'),
      },
      {
        path: '/service',
        name: 'service',
        component: () => import('@/pages/main/serviceManagement/ServiceManagementPage.vue'),
      },
      {
        path: '/monitoring',
        name: 'monitoring',
        component: () => import('@/pages/main/monitoring/Monitoring.vue'),
        children: [
          {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('@/pages/main/monitoring/children/DashboardPage.vue'),
          },
          {
            path: '/log',
            name: 'log',
            component: () => import('@/pages/main/monitoring/children/LogPage.vue'),
          },
          {
            path: '/statistic',
            name: 'statistic',
            component: () => import('@/pages/main/monitoring/children/StatisticPage.vue'),
          },
          {
            path: '/traffic',
            name: 'traffic',
            component: () => import('@/pages/main/monitoring/children/TrafficPage.vue'),
          },
        ],
      },
      {
        path: '/management',
        name: 'management',
        component: () => import('@/pages/main/management/Management.vue'),
      },
      {
        path: '/mypage',
        name: 'mypage',
        component: () => import('@/pages/main/myPage/MyPage.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
