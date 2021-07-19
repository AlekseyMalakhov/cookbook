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
        <el-row type="flex" justify="end" style="margin-right: 30px; margin-top: 20px" v-if="user && user._id === selectedRecipe.userID">
            <el-button type="primary" round>Edit</el-button>
            <el-button type="danger" round @click="centerDialogVisible = true">Delete</el-button>
        </el-row>
    </div>

    <el-dialog title="Warning" v-model="centerDialogVisible" width="25%" center>
        <div style="display: flex; justify-content: center">
            <span>Do you realy want to delete this recipe?</span>
        </div>
        <template #footer>
            <div style="display: flex; justify-content: space-evenly">
                <el-button @click="centerDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="deleteRecipe()">Confirm</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script>
import { computed } from "@vue/runtime-core";
import mockImg from "../mockImg";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { showError, showSuccess } from "../utilities";
export default {
    setup() {
        const store = useStore();
        const user = computed(() => store.state.User.user);
        const recipes = computed(() => store.state.User.recipes);
        const router = useRouter();
        const route = useRoute();
        const selectedRecipe = computed(() => {
            return recipes.value.find((res) => res._id === route.params.recipe_id);
        });
        const centerDialogVisible = ref(false);

        const deleteRecipe = () => {
            fetch(`http://localhost:3000/delete_recipe/${selectedRecipe.value._id}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (response.status === 200) {
                        showSuccess("Recipe has been successfully deleted.");
                        centerDialogVisible.value = false;
                        store.dispatch("User/getAllRecipes");
                        router.push("/");
                    } else {
                        showError("Something went wrong :( Please contact administrator");
                        centerDialogVisible.value = false;
                        router.push("/");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    showError("Something went wrong :( Please contact administrator");
                });
        };
        return {
            selectedRecipe,
            mockImg,
            centerDialogVisible,
            user,
            deleteRecipe,
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
