<template>
    <div class="background" v-if="selectedRecipe">
        <el-row type="flex" justify="center" style="margin: auto 20px">
            <h2>{{ selectedRecipe.recipeName }}</h2>
        </el-row>
        <el-row type="flex" justify="space-between">
            <el-row type="flex" justify="start" style="flex-direction: column">
                <el-row style="margin-left: 40px" type="flex" justify="start">
                    <div>
                        <el-avatar :size="50" :src="`http://localhost:3000/images/avatars/${recipeCreatorImg}`" class="avatar">
                            <i class="el-icon-s-custom" />
                        </el-avatar>
                    </div>
                    <div style="margin-left: 10px; min-width: 300 mm">
                        <div class="userAndDate">{{ selectedRecipe.user }}</div>
                        <div class="userAndDate">{{ selectedRecipe.date }}</div>
                    </div>
                </el-row>
                <el-row type="flex" justify="start">
                    <el-col style="padding-left: 20px">
                        <h4 style="padding-left: 30px; margin-top: 30px; margin-bottom: 5px">Ingredients:</h4>
                        <el-row>
                            <ul v-if="selectedRecipe" style="margin: 0 auto">
                                <li v-for="ingredient in selectedRecipe.recipeIngredients" :key="ingredient.id" style="margin-top: 10px">
                                    {{ `${ingredient.name} - ${ingredient.amount} ${ingredient.unit};` }}
                                </li>
                            </ul>
                        </el-row>
                    </el-col>
                </el-row>
            </el-row>
            <el-row type="flex" justify="center" style="margin: 20px 20px">
                <el-col :span="12" class="imageContainer">
                    <img :src="`http://localhost:3000/images/${selectedRecipe.img}`" class="image" />
                </el-col>
            </el-row>
        </el-row>
        <el-row justify="start" style="padding: 40px 20px 20px 20px">
            {{ selectedRecipe.recipeText }}
        </el-row>
        <el-row
            type="flex"
            justify="end"
            style="margin-right: 30px; margin-top: 20px; padding-bottom: 30px"
            v-if="user && user._id === selectedRecipe.userID"
        >
            <el-button type="primary" round @click="editRecipe()">Edit</el-button>
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
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { showError, showSuccess } from "../utilities";
export default {
    setup() {
        const store = useStore();
        const user = computed(() => store.state.User.user);
        const users = computed(() => store.state.User.users);
        const recipes = computed(() => store.state.User.recipes);
        const router = useRouter();
        const route = useRoute();
        const selectedRecipe = computed(() => {
            return recipes.value.find((res) => res._id === route.params.recipe_id);
        });
        const centerDialogVisible = ref(false);

        const recipeCreatorImg = computed(() => {
            const creator = users.value.find((u) => u.name === selectedRecipe.value.user);
            return creator.img;
        });

        const deleteRecipe = () => {
            fetch(`http://localhost:3000/delete_recipe/${selectedRecipe.value._id}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (response.status === 200) {
                        showSuccess("Recipe has been successfully deleted.");
                        centerDialogVisible.value = false;
                        store.dispatch("User/getAllRecipes");
                        router.push(`/list/${selectedRecipe.value.userID}`);
                    } else {
                        showError("Something went wrong :( Please contact administrator");
                        centerDialogVisible.value = false;
                        router.push(`/list/${selectedRecipe.value.userID}`);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    showError("Something went wrong :( Please contact administrator");
                });
        };
        const editRecipe = () => {
            router.push(`/edit_recipe/${selectedRecipe.value._id}`);
        };
        return {
            selectedRecipe,
            centerDialogVisible,
            user,
            deleteRecipe,
            editRecipe,
            recipeCreatorImg,
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
