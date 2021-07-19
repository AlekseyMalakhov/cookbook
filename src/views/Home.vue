<template>
    <el-container>
        <el-aside width="200px"><Sidebar /></el-aside>
        <el-main>
            <router-view />
        </el-main>
    </el-container>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";

export default {
    name: "Home",
    components: { Sidebar },
    setup() {
        return {};
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
}
</style>
