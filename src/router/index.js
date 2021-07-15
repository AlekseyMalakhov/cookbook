import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import CreateAccount from "../views/CreateAccount.vue";
import CreateRecipe from "../views/CreateRecipe.vue";

const routes = [
    {
        path: "/:id?",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/create_account",
        name: "CreateAccount",
        component: CreateAccount,
    },
    {
        path: "/create_recipe",
        name: "CreateRecipe",
        component: CreateRecipe,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
