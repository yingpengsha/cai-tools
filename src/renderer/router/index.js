import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/terminals',
    },
    {
      path: '/terminals',
      name: 'Terminals',
      component: require('@/views/Terminals').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
