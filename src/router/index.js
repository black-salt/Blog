import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Article from '../views/article/Index.vue'
import AddOrEditArticle from '../views/article/AddOrEdit.vue'
import ArticleDetail from '../views/article/Detail.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/article/:category',
    name: 'Article',
    component: Article
  },
  {
    path: '/AddOrEditArticle/:id',
    name: 'AddOrEditArticle',
    component: AddOrEditArticle
  },
  {
    path: '/articleDetail',
    name: 'ArticleDetail',
    component: ArticleDetail
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
