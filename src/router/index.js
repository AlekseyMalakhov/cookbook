import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import CreateAccount from "../views/CreateAccount.vue";
import CreateRecipe from "../views/CreateRecipe.vue";
import CardList from "../components/CardList.vue";
import RecipeView from "../components/RecipeView.vue";
import EditRecipe from "../views/EditRecipe.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/",
                component: CardList,
            },
            {
                path: "/recipe/:recipe_id",
                component: RecipeView,
            },
        ],
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
    {
        path: "/edit_recipe/:recipe_id",
        name: "EditRecipe",
        component: EditRecipe,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
