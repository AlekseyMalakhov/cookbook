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
        store.dispatch("User/getAllUsers");
        store.dispatch("User/getAllRecipes");

        onMounted(() => {
            const existingUser = localStorage.getItem("user");
            if (existingUser) {
                const data = JSON.parse(existingUser);
                store.dispatch("User/setUser", data);
            }

            const getScreenWidth = () => {
                let width;
                if (window.screen.width < window.innerWidth) {
                    // for moble browsers
                    width = window.screen.width;
                } else {
                    width = window.innerWidth;
                }
                return width;
            };
            store.dispatch("User/setScreenWidth", getScreenWidth());
            window.onresize = () => {
                const width = getScreenWidth();
                if (width < 650) {
                    store.dispatch("User/setShowSidebar", false);
                } else {
                    store.dispatch("User/setShowSidebar", true);
                }
                store.dispatch("User/setScreenWidth", getScreenWidth());
            };
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
