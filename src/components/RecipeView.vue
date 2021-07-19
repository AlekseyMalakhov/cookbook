<template>
    <div class="background">
        <el-row justify="center">
            <el-col :span="24">
                <h2>{{ selectedRecipe.recipeName }}</h2>
            </el-col>
        </el-row>

        <el-row justify="center" style="text-align: start">
            <el-col :span="12" style="padding-left: 20px">
                <h4 style="padding-left: 30px">Ingredients:</h4>
                <el-row>
                    <ul v-if="selectedRecipe">
                        <li v-for="ingredient in selectedRecipe.recipeIngredients" :key="ingredient.id" style="margin-top: 10px">
                            {{ `${ingredient.name} - ${ingredient.amount} ${ingredient.unit};` }}
                        </li>
                    </ul>
                </el-row>
            </el-col>
            <el-col :span="12" class="imageContainer">
                <img :src="mockImg" class="image" />
            </el-col>
        </el-row>
        <el-row justify="start" style="text-align: start; padding: 20px 20px 20px 20px">
            {{ selectedRecipe.recipeText }}
        </el-row>
    </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import mockImg from "../mockImg";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
    setup() {
        const store = useStore();
        const recipes = computed(() => store.state.User.recipes);
        const route = useRoute();
        const selectedRecipe = computed(() => {
            return recipes.value.find((res) => res._id === route.params.recipe_id);
        });
        return {
            selectedRecipe,
            mockImg,
        };
    },
};
</script>

<style lang="scss" scoped>
.background {
    background-color: white;
    height: 100%;
    border-radius: 3px;
}
.imageContainer {
    display: flex;
    justify-content: center;
    padding-right: 20px;
}
.image {
    max-width: 300px;
}
</style>
