import Vue from 'vue';
import Router from 'vue-router';
import goods from '../pages/goods.vue';
import ratings from '../pages/ratings.vue';
import seller from '../pages/seller.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: goods
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ]
});
