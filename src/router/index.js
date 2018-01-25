import Vue from 'vue';
import Router from 'vue-router';
import SortVue from '@/components/sort_vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: SortVue,
    },
  ],
});
