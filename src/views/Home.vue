<template>
    <el-container>
        <el-aside width="200px" v-if="showSidebar"><Sidebar /></el-aside>
        <el-main>
            <router-view />
        </el-main>
    </el-container>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
    name: "Home",
    components: { Sidebar },
    setup() {
        const store = useStore();
        const screenWidth = computed(() => store.state.User.screenWidth);
        const showSidebar = computed(() => store.state.User.showSidebar);

        return {
            screenWidth,
            showSidebar,
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
}
</style>
