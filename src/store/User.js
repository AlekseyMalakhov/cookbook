import baseURL from "../baseURL";
console.log(baseURL);
export const UserModule = {
    namespaced: true,

    state: {
        user: null,
        selectedUser: null,
        users: [],
        recipes: [],
        screenWidth: 0,
        showSidebar: true,
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
        SET_SCREEN_WIDTH(state, screenWidth) {
            state.screenWidth = screenWidth;
        },
        SET_SHOW_SIDEBAR(state, showSidebar) {
            state.showSidebar = showSidebar;
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
            fetch(baseURL + "/get_users", {
                method: "POST",
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    commit("SET_USERS", data);
                });
        },
        getAllRecipes({ commit }) {
            fetch(baseURL + "/get_recipes", {
                method: "POST",
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    commit("SET_RECIPES", data);
                });
        },
        setScreenWidth({ commit }, screenWidth) {
            commit("SET_SCREEN_WIDTH", screenWidth);
        },
        setShowSidebar({ commit }, showSidebar) {
            commit("SET_SHOW_SIDEBAR", showSidebar);
        },
    },
};
