import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { SYSTEM, SERVICE, API, MANAGEMENT, MONITORING, MY } from '@/router/Names';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/main/MainPage.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/LoginPage.vue'),
  },
  {
    path: '/signUp',
    name: 'signUp',
    redirect: '/signUp/stipulation',
    component: () => import('@/pages/login/sign-up/SignUpPage.vue'),
    children: [
      {
        path: '/signUp/stipulation',
        name: 'signUpStipulation',
        component: () => import('@/pages/login/sign-up/stipulation/SignUpStipulationPage.vue'),
      },
      {
        path: '/signUp/register',
        name: 'signUpRegister',
        component: () => import('@/pages/login/sign-up/register/SignUpRegisterPage.vue'),
      },
      {
        path: '/signUp/complete',
        name: 'signUpComplete',
        component: () => import('@/pages/login/sign-up/complete/SignUpCompletePage.vue'),
      },
    ],
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/pages/main/MainPage.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashBoard',
        component: () => import('@/pages/main/dash-board/DashBoardPage.vue'),
      },
      // System
      {
        path: SYSTEM,
        name: 'system',
        component: () => import('@/pages/main/system-mngt/SystemPage.vue'),
      },
      {
        path: SYSTEM + '/register',
        name: 'system-register',
        component: () => import('@/pages/main/system-mngt/register/SystemRegisterPage.vue'),
      },
      {
        path: SYSTEM + '/detail/:id',
        name: 'system-detail',
        component: () => import('@/pages/main/system-mngt/detail/SystemDetailPage.vue'),
      },
      {
        path: SYSTEM + '/edit/:id',
        name: 'system-edit',
        component: () => import('@/pages/main/system-mngt/edit/SystemEditPage.vue'),
      },
      // Api
      {
        path: API,
        name: 'api',
        component: () => import('@/pages/main/api-mngt/ApiPage.vue'),
      },
      {
        path: API + '/register',
        name: 'api-register',
        component: () => import('@/pages/main/api-mngt/register/ApiRegisterPage.vue'),
      },
      {
        path: API + '/detail',
        name: 'api-detail',
        component: () => import('@/pages/main/api-mngt/detail/ApiDetailPage.vue'),
      },
      {
        path: API + '/edit',
        name: 'api-edit',
        component: () => import('@/pages/main/api-mngt/edit/ApiEditPage.vue'),
      },
      // Service
      {
        path: SERVICE,
        name: 'service',
        component: () => import('@/pages/main/service-mngt/ServicePage.vue'),
      },
      {
        path: SERVICE + '/register',
        name: 'service-register',
        component: () => import('@/pages/main/service-mngt/register/ServiceRegisterPage.vue'),
      },
      {
        path: SERVICE + '/detail/:id',
        name: 'service-detail',
        component: () => import('@/pages/main/service-mngt/detail/ServiceDetailPage.vue'),
      },
      {
        path: SERVICE + '/edit/:id',
        name: 'service-edit',
        component: () => import('@/pages/main/service-mngt/edit/ServiceEditPage.vue'),
      },
      {
        path: MONITORING + '/control',
        name: 'control',
        component: () => import('@/pages/main/monitoring/children/ControlPage.vue'),
        redirect: MONITORING + '/control/service',
        children: [
          {
            path: 'service',
            name: 'controll-service',
            component: () => import('@/pages/main/monitoring/children/controll-children/ControllServicePage.vue'),
          },
          {
            path: 'api',
            name: 'controll-api',
            component: () => import('@/pages/main/monitoring/children/controll-children/ControllAPIPage.vue'),
          },
        ],
      },
      {
        path: MONITORING + '/statistic',
        name: 'statistic',
        component: () => import('@/pages/main/monitoring/children/StatisticPage.vue'),
      },
      {
        path: MONITORING + '/traffic',
        name: 'traffic',
        component: () => import('@/pages/main/monitoring/children/TrafficPage.vue'),
      },
      {
        path: MANAGEMENT,
        name: 'management',
        component: () => import('@/pages/main/management/ManagementPage.vue'),
      },
      {
        path: MY + '/:id',
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
