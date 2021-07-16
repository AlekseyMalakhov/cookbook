<template>
    <el-container>
        <el-aside width="200px"><Sidebar /></el-aside>
        <el-main>
            <router-view />
            <el-tooltip effect="light" content="Add recipe" placement="top" v-if="user">
                <el-button type="primary" icon="el-icon-plus" circle class="addRecipe" @click="createRecipe()"></el-button>
            </el-tooltip>
        </el-main>
    </el-container>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
    name: "Home",
    components: { Sidebar },
    setup() {
        const router = useRouter();
        const store = useStore();
        const user = computed(() => store.state.User.user);
        const createRecipe = () => {
            router.push("/create_recipe");
        };
        return {
            user,
            createRecipe,
        };
    },
};
</script>

<style lang="scss" scoped>
.el-aside {
    background-color: #d3dce6;
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
}

.addRecipe {
    position: fixed;
    bottom: 100px;
    right: 50px;
    font-size: 25px;
}
</style>
