<template>
    <el-container>
        <el-aside width="200px"><Sidebar /></el-aside>
        <el-main>
            <CardList :userID="$route.params.id" />
            <el-tooltip effect="light" content="Add recipe" placement="top" v-if="user">
                <el-button type="primary" icon="el-icon-plus" circle class="addRecipe"></el-button>
            </el-tooltip>
        </el-main>
    </el-container>
</template>

<script>
import CardList from "../components/CardList.vue";
import Sidebar from "../components/Sidebar.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { watch, computed } from "vue";

export default {
    name: "Home",
    components: { CardList, Sidebar },
    setup() {
        const route = useRoute();
        const store = useStore();
        const user = computed(() => store.state.User.user);
        watch(
            () => route.params.id,
            () => {
                console.log(route.params.id);
            }
        );
        return {
            user,
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
