import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import PostView from '../views/PostView.vue'
import Dashboard from '../views/Dashboard.vue'
import UsersPost from '../views/UsersPost.vue'
import { auth } from '../firebase/index.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta:{
        requiresAuth:true
      }
    },
    
    {
     path: '/register',
     name:'register',
     component:RegisterView 
    },

    {
      path:'/login',
      name:'login',
      component:LoginView
    },
    {
      path:'/post',
      name:'post',
      component:PostView,
      meta:{
        requiresAuth:true
      }
    },
    {
      path:'/dashboard',
      name:'dashboard',
      component:Dashboard,
      meta:{
        requiresAuth:true
      }
    },

    {
      path: '/:uid/UsersPost',
      name: 'UsersPost',
      component: UsersPost,
      
    }

  ]
})
router.beforeEach((to, from,next)=>{
  if(to.path ==='/login' && auth.currentUser){
    if(auth.currentUser.emailVerified){
      next('/home')
      return;
    }
  }

  if(to.matched.some(record=>record.meta.requiresAuth)&& !auth.currentUser){
    next('login')
    return;
  }
  next();
})


export default router
