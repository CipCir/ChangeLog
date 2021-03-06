import Vue from "vue";
import Router from "vue-router";
import Tree from "./views/Tree.vue";
import AddNew from "./views/AddNew.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Tree",
      component: Tree
    },
    {
      path: "/AddNew",
      name: "AddNew",
      component: AddNew
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
