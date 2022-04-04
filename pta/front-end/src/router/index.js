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
        path: '/abilities/:current',
        name: 'abilities focused',
        component: AbilitiesView,
        props: function (route) {
            return {
                current: route.params.current
            }
        }
    },
    {
        path: '/moves',
        name: 'moves',
        component: MovesView,
        props: function (route) {
            return {
                current: route.params.current
            }
        }
    },
    {
        path: '/moves/:current',
        name: 'moves focused',
        component: MovesView,
        props: function (route) {
            return {
                current: route.params.current
            }
        }
    },
    {
        path: '/species',
        name: 'species',
        component: SpeciesView,
        props: function (route) {
            return {
                current: route.params.current
            }
        }
    },
    {
        path: '/species/:current',
        name: 'species focused',
        component: SpeciesView,
        props: function (route) {
            return {
                current: route.params.current
            }
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
