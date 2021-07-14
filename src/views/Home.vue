<template>
    <el-container>
        <el-aside width="200px"><Sidebar /></el-aside>
        <el-main><CardList :userID="$route.params.id"/></el-main>
    </el-container>
</template>

<script>
import CardList from "../components/CardList.vue";
import Sidebar from "../components/Sidebar.vue";
import { useRoute } from "vue-router";
import { watch } from "vue";

export default {
    name: "Home",
    components: { CardList, Sidebar },
    setup() {
        const route = useRoute();

        // fetch the user information when params change
        watch(
            () => route.params.id,
            () => {
                console.log(route.params.id);
            }
        );
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
</style>
