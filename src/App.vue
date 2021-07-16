<template>
    <el-container id="main_container">
        <el-header>
            <Header />
        </el-header>

        <router-view />

        <el-footer><Footer /></el-footer>
    </el-container>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { onMounted } from "vue";
import { useStore } from "vuex";

export default {
    name: "App",
    components: { Header, Footer },
    setup() {
        const store = useStore();
        const getAllUsers = () => {
            fetch("http://localhost:3000/users")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    store.dispatch("User/setUsers", data);
                });
        };
        getAllUsers();

        const getAllRecipes = () => {
            fetch("http://localhost:3000/recipes")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    store.dispatch("User/setRecipes", data);
                });
        };
        getAllRecipes();

        onMounted(() => {
            const existingUser = localStorage.getItem("user");
            if (existingUser) {
                const data = JSON.parse(existingUser);
                store.dispatch("User/setUser", data);
            }
        });
    },
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#main_container {
    min-height: 100vh;
}

.el-header,
.el-footer {
    background-color: #409eff;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-footer {
    margin-top: auto;
}
</style>
