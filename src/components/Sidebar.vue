<template>
    <el-row type="flex" justify="center" class="title">
        Our chefs
    </el-row>

    <el-menu>
        <el-menu-item index="1" v-for="user in users" :key="user._id">
            <router-link :to="`/${user._id}`" class="chefLink">
                {{ user.name }}
            </router-link>
        </el-menu-item>
    </el-menu>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
    setup() {
        const store = useStore();
        const users = computed(() => store.state.User.users);
        // const state = reactive({
        //     recipes: recipesList,
        // });

        return {
            users,
        };
    },
};
</script>

<style lang="scss" scoped>
.title {
    font-size: 20px;
    padding-top: 20px;
}

.el-menu {
    margin-top: 20px;
}

.chefLink {
    text-decoration: none;
}
</style>
