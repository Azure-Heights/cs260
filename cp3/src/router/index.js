import Vue from 'vue'
import VueRouter from 'vue-router'
import PeopleView from '../views/PeopleView.vue'
import PlanetsView from '../views/PlanetsView.vue'
import FilmsView from '../views/FilmsView.vue'
import SpeciesView from '../views/SpeciesView.vue'
import VehiclesView from '../views/VehiclesView.vue'
import StarshipsView from '../views/StarshipsView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        props: {
            current: 0
        },
        component: PeopleView
    },
    {
        path: '/people/:current',
        name: 'people',
        props: function (route) {
            return {
                current: route.params.current
            }
        },
        component: PeopleView
    },
    {
        path: '/planets/:current',
        name: 'planets',
        props: function (route) {
            return {
                current: route.params.current
            }
        },
        component: PlanetsView
    },
    {
        path: '/films/:current',
        name: 'films',
        props: function (route) {
            return {
                current: route.params.current
            }
        },
        component: FilmsView
    },
    {
        path: '/species/:current',
        name: 'species',
        props: function (route) {
            return {
                current: route.params.current
            }
        },
        component: SpeciesView
    },
    {
        path: '/vehicles/:current',
        name: 'Vehicles',
        props: function (route) {
            return {
                current: route.params.current
            }
        },
        component: VehiclesView
    },
    {
        path: '/starships/:current',
        name: 'starships',
        props: function (route) {
            return {
                current: route.params.current
            }
        },
        component: StarshipsView
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
