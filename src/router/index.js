import { createRouter, createWebHistory } from 'vue-router';
import batchManagementComponent from "../elixir-control/winemaking-process/pages/batch-management.component.vue";
import fermentationManagementComponent from "../elixir-control/winemaking-process/pages/fermentation-management.component.vue";
import agingManagementComponent from "../elixir-control/winemaking-process/pages/aging-management.component.vue";
import BottlingManagementComponent from "../elixir-control/winemaking-process/pages/bottling-management.component.vue";
import ClarificationManagementComponent from "../elixir-control/winemaking-process/pages/clarification-management.component.vue";
import PressingManagementComponent from "../elixir-control/winemaking-process/pages/pressing-management.component.vue";
import WinemakingProcessManagementComponent from "../elixir-control/winemaking-process/pages/winemaking-process-management.component.vue";
import InventoryManagementComponent from "../elixir-control/inventory-management/pages/inventory-management.vue";
import InventoryDetailComponent from "../elixir-control/inventory-management/pages/inventory-details.vue";
import ProducerHomeComponent from "../public/pages/producer-home.component.vue";
import HomeContentComponent from "../public/pages/home-content.component.vue";
import SignInComponent from "../iam/pages/sign-in.component.vue";
import SignUpComponent from "../iam/pages/sign-up.component.vue";
import InventoryDetails from "../elixir-control/inventory-management/pages/inventory-details.vue";
import PageNotFoundComponent from "../public/pages/page-not-found.component.vue";

import {authenticationGuard} from "../iam/services/authentication.guard.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [

        /*=========================== Public Routes ===========================*/
        { path: '/home',             name: 'Home',      component: HomeContentComponent,     meta: { title: 'Home' } },
        { path: '/home/sign-in',     name: 'sign-in',   component: SignInComponent,          meta: { title: 'Sign In' } },
        { path: '/home/sign-up',     name: 'sign-up',   component: SignUpComponent,          meta: { title: 'Sign Up' } },
        { path: '/notfound',         name: 'notfound',  component: PageNotFoundComponent,    meta: { title: 'Página no encontrada' } },
        { path: '/:pathMatch(.*)*',  redirect: '/notfound' },


        /*=========================== Winemaking Process Routes ===========================*/
        {path: '/vinicultor/winemaking-process/batches',       name: 'Batches',             component: batchManagementComponent,            meta: { title: 'Batches'}},
        {path: '/vinicultor/winemaking-process/fermentation',  name: 'Fermentation',        component: fermentationManagementComponent,     meta: { title: 'Fermentation'}},
        {path: '/vinicultor/winemaking-process/aging',         name: 'Aging',               component: agingManagementComponent,            meta: { title: 'Aging'}},
        {path: '/vinicultor/winemaking-process/bottling',      name: 'Bottling',            component: BottlingManagementComponent,         meta: { title: 'Bottling'}},
        {path: '/vinicultor/winemaking-process/clarification', name: 'Clarification',       component: ClarificationManagementComponent,    meta: { title: 'Clarification'}},
        {path: '/vinicultor/winemaking-process/pressing',      name: 'Pressing',            component: PressingManagementComponent,         meta: { title: 'Pressing'}},
        {path: '/vinicultor/winemaking-process',               name: 'Winemaking-Process',  component: WinemakingProcessManagementComponent,meta: { title: 'Winemaking Process'}},

        /*=========================== Inventory Management Routes ===========================*/
        {path: '/vinicultor/inventory',                        name: 'Inventory-Management',component: InventoryManagementComponent,        meta: { title: 'Inventory Management' }},

        {
            path: '/vinicultor/inventory/:id/details',
            name: 'InventoryDetails',
            component: InventoryDetails,
            props: true,
            meta: { title: 'Inventory Item Details' }
        },

        { path: '/home/sign-in',                 name: 'sign-in',    component: SignInComponent,             meta: { title: 'Sign In'}},
        { path: '/home/sign-up',                 name: 'sign-up',    component: SignUpComponent,             meta: { title: 'Sign Up'}},

        /*=========================== Producer Home Routes ===========================*/

        {path: '/vinicultor/home', name: 'Producer-Home', component: ProducerHomeComponent, meta: { title: 'Producer Home'}}

    ]
});


router.beforeEach((to, from, next) => {
    // Set the page title
    let baseTitle = 'Elixir Control';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    // Call the authentication guard
    authenticationGuard(to, from, next);
})




export default router;