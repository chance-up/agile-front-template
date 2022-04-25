import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const SYSTEM = '/system';
const SERVICE = '/service';
const API = '/api';
const MONITORING = '/monitoring';
const MANAGEMENT = '/management';
const MY = '/my';

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'index',
    //component: () => import('@/pages/LoginPage.vue'),
    component: () => import('@/pages/main/MainPage.vue'),
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/pages/LoginPage.vue'),
  // },

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
        path: SYSTEM,
        name: 'system',
        component: () => import('@/pages/main/system/SystemPage.vue'),
      },
      {
        path: SYSTEM + '/register',
        name: 'system-register',
        component: () => import('@/pages/main/system/register/SystemRegisterPage.vue'),
      },
      {
        path: SYSTEM + '/detail/:id',
        name: 'system-detail',
        component: () => import('@/pages/main/system/detail/SystemDetailPage.vue'),
      },
      {
        path: SYSTEM + '/edit/:id',
        name: 'system-edit',
        component: () => import('@/pages/main/system/edit/SystemEditPage.vue'),
      },
      // Api
      {
        path: API,
        name: 'api',
        component: () => import('@/pages/main/api/ApiPage.vue'),
      },
      {
        path: API + '/register',
        name: 'api-register',
        component: () => import('@/pages/main/api/register/ApiRegisterPage.vue'),
      },
      {
        path: API + '/detail/:id',
        name: 'api-detail',
        component: () => import('@/pages/main/api/detail/ApiDetailPage.vue'),
      },
      {
        path: API + '/edit/:id',
        name: 'api-edit',
        component: () => import('@/pages/main/api/edit/ApiEditPage.vue'),
      },
      // Service
      {
        path: SERVICE,
        name: 'service',
        component: () => import('@/pages/main/service/ServicePage.vue'),
      },
      {
        path: SERVICE + '/register',
        name: 'service-register',
        component: () => import('@/pages/main/service/register/ServiceRegisterPage.vue'),
      },
      {
        path: SERVICE + '/detail/:id',
        name: 'service-detail',
        component: () => import('@/pages/main/service/detail/ServiceDetailPage.vue'),
      },
      {
        path: SERVICE + '/edit/:id',
        name: 'service-edit',
        component: () => import('@/pages/main/service/edit/ServiceEditPage.vue'),
      },
      {
        path: MONITORING,
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
        path: MANAGEMENT,
        name: 'management',
        component: () => import('@/pages/main/management/ManagementPage.vue'),
      },
      {
        path: MY,
        name: 'my',
        component: () => import('@/pages/main/my/MyPage.vue'),
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
