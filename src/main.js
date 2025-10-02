import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import CharacterList from './components/CharacterList.vue'
import CharacterDetail from './components/CharacterDetail.vue'
import './style.scss'

// Create router
const routes = [
  { 
    path: '/', 
    name: 'CharacterList',
    component: CharacterList
  },
  { 
    path: '/character/:id', 
    name: 'CharacterDetail',
    component: CharacterDetail, 
    props: true 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create app
const app = createApp(App)
app.use(router)
app.mount('#app')
