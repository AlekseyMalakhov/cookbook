export const UserModule = {
    namespaced: true,

    state: {
        user: null,
        recipes: [],
    },

    //Mutations are functions that effect the State
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        SET_RECIPES(state, recipes) {
            state.recipes = recipes;
        },
    },

    //Actions are functions that you call throughout your application that call mutations
    actions: {
        setUser({ commit }, user) {
            commit("SET_USER", user);
        },
        setRecipes({ commit }, recipes) {
            commit("SET_RECIPES", recipes);
        },
    },
};
