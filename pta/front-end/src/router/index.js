import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import AbilitiesView from '../views/AbilitiesView.vue'
import MovesView from '../views/MovesView.vue'
import SpeciesView from '../views/SpeciesView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/abilities',
        name: 'abilities',
        component: AbilitiesView
    },
    {
        path: '/moves',
        name: 'moves',
        component: MovesView
    },
    {
        path: '/species',
        name: 'species',
        component: SpeciesView
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
