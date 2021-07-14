<template>
    <el-row type="flex" justify="center" class="title">
        Our chefs
    </el-row>

    <el-menu>
        <el-menu-item index="1" v-for="recipe in state.recipes" :key="recipe.id">
            <router-link :to="`/${recipe.userID}`" class="chefLink">
                {{ recipe.user }}
            </router-link>
        </el-menu-item>
    </el-menu>
</template>

<script>
import { recipesList } from "../mock_data/mock_db";
import { reactive } from "vue";
export default {
    setup() {
        const state = reactive({
            recipes: recipesList,
        });

        return {
            state,
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
