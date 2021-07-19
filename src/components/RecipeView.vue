<template>
    <div class="background" v-if="selectedRecipe">
        <el-row type="flex" justify="center">
            <h2>{{ selectedRecipe.recipeName }}</h2>
        </el-row>
        <el-row class="userAndDateContainer" type="flex" justify="start" direction="horizontal">
            <el-col :push="8" :span="8" style="display: flex">
                <div>
                    <el-avatar :size="50" :src="''" class="avatar">
                        <i class="el-icon-s-custom" />
                    </el-avatar>
                </div>
                <div style="margin-left: 10px; min-width: 300 mm">
                    <div class="userAndDate">{{ selectedRecipe.user }}</div>
                    <div class="userAndDate">{{ selectedRecipe.date }}</div>
                </div>
            </el-col>
            <el-col :span="8"></el-col>
        </el-row>

        <el-row type="flex" justify="center">
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
        <el-row justify="start" style="padding: 40px 20px 20px 20px">
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
.userAndDateContainer {
    margin-bottom: 20px;
}
.avatar {
    font-size: 30px;
}
.avatar:hover {
    background-color: #aaaeb5;
}
.userAndDate {
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>
