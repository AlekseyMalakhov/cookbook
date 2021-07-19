export const UserModule = {
    namespaced: true,

    state: {
        user: null,
        selectedUser: null,
        users: [],
        recipes: [],
    },

    //Mutations are functions that effect the State
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        SET_SELECTED_USER(state, selectedUser) {
            state.selectedUser = selectedUser;
        },
        SET_USERS(state, users) {
            state.users = users;
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
        setSelectedUser({ commit }, selectedUser) {
            commit("SET_SELECTED_USER", selectedUser);
        },
        getAllUsers({ commit }) {
            fetch("http://localhost:3000/users")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    commit("SET_USERS", data);
                });
        },
        getAllRecipes({ commit }) {
            fetch("http://localhost:3000/recipes")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    commit("SET_RECIPES", data);
                });
        },
    },
};
