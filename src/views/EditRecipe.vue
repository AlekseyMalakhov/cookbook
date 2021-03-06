<template>
    <div v-if="selectedRecipe" style="margin: auto 20px">
        <el-row type="flex" justify="center" align="middle">
            <h2>Edit recipe {{ selectedRecipe.recipeName }}</h2>
        </el-row>
        <el-row type="flex" justify="center" align="middle">
            <el-form :model="state.recipe" :rules="state.rules" ref="recipeForm" label-width="120px" label-position="top">
                <el-form-item label="Recipe name" prop="recipeName" class="labelRecipe1 labelRecipe2">
                    <el-input v-model="state.recipe.recipeName"></el-input>
                </el-form-item>
                <div style="font-size: 14px; color: #606266; margin-bottom: 15px">Ingredients:</div>
                <AddIngredientField
                    v-for="(ing, i) in state.recipe.recipeIngredients"
                    :i="i"
                    :key="ing.id"
                    :id="ing.id"
                    :units="units"
                    :editedIngr="ing"
                    @change-ingredient="changeIng"
                    @delete-ingredient="deleteIng"
                />

                <el-row type="flex" justify="center" align="middle">
                    <el-tooltip effect="light" content="Add ingredient" placement="left">
                        <el-button type="success" icon="el-icon-plus" circle @click="addIng()"></el-button>
                    </el-tooltip>
                </el-row>

                <el-form-item label="Text:">
                    <el-input type="textarea" :autosize="{ minRows: 4 }" placeholder="Please input" v-model="state.recipe.recipeText"> </el-input>
                </el-form-item>

                <div class="imageLable">Image:</div>
                <el-row type="flex" justify="center" align="middle" style="margin-bottom: 30px; flex-direction: row" v-if="imgURL">
                    <el-image style="height: 100px" :src="imgURL" fit="contain" class="preview"></el-image>
                    <el-button type="danger" icon="el-icon-delete" circle style="margin-left: 20px" @click="deleteImg()"></el-button>
                </el-row>

                <el-row type="flex" justify="center" align="middle" style="margin-bottom: 20px" v-if="!imgURL">
                    <el-form-item style="width: 100%">
                        <el-upload class="imgUpload1 imgUpload2" drag action="" :on-change="handleImgUpload" multiple :auto-upload="false">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                            <template #tip>
                                <div class="el-upload__tip">
                                    jpg/png files with a size less than 500kb
                                </div>
                            </template>
                        </el-upload>
                    </el-form-item>
                </el-row>

                <el-row type="flex" justify="space-around" align="middle" style="margin-bottom: 50px">
                    <el-button type="primary" @click="submitForm()">Save</el-button>
                    <el-button @click="cancel()">Cancel</el-button>
                </el-row>
            </el-form>
        </el-row>
    </div>
</template>

<script>
import { ref, reactive, computed } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { showError, showSuccess } from "../utilities";
import AddIngredientField from "../components/AddIngredientField.vue";
import { onMounted, onUpdated } from "@vue/runtime-core";
import baseURL from "../baseURL";

const getID = (recipeIngredients) => {
    const idList = [];
    for (let i = 0; i < recipeIngredients.length; i++) {
        idList.push(recipeIngredients[i].id);
    }
    let largestNumber;
    if (idList.length !== 0) {
        largestNumber = Math.max(...idList);
    } else {
        largestNumber = 0;
    }
    const id = largestNumber + 1;
    return id;
};

export default {
    components: { AddIngredientField },
    setup() {
        const store = useStore();
        const user = computed(() => store.state.User.user);
        const recipes = computed(() => store.state.User.recipes);
        const router = useRouter();
        const route = useRoute();
        const units = ["none", "g", "kg", "L", "ml", "tea sp.", "table sp."];
        const selectedRecipe = computed(() => {
            return recipes.value.find((res) => res._id === route.params.recipe_id);
        });
        const state = reactive({
            recipe: {
                recipeName: "",
                recipeIngredients: [],
                recipeText: "",
                img: "",
            },
            rules: {
                recipeName: [{ required: true, message: "Please, enter username", trigger: "change" }],
            },
        });

        const imgURL = ref("");
        const getCurrentValues = () => {
            state.recipe.recipeName = selectedRecipe.value.recipeName;
            state.recipe.recipeText = selectedRecipe.value.recipeText;
            state.recipe.recipeIngredients = selectedRecipe.value.recipeIngredients;
            state.recipe.img = selectedRecipe.value.img;
            imgURL.value = selectedRecipe.value.img;
        };

        onMounted(() => {
            //coming from hyperling
            if (selectedRecipe.value) {
                getCurrentValues();
            }
        });

        onUpdated(() => {
            //reload page
            if (selectedRecipe.value) {
                getCurrentValues();
            }
        });

        const img = ref("");
        const recipeForm = ref(null);

        const send = (recipeObj) => {
            const obj = { ...recipeObj };
            //delete obj.img;
            obj.userID = user.value._id;
            const date = new Date(Date.now());
            const dateString = date.toLocaleDateString("en-GB");
            obj.date = dateString;
            obj.user = user.value.name;
            const JSONObj = JSON.stringify(obj);
            const recipe = {
                text: JSONObj,
                img: img.value,
            };
            const formData = new FormData();
            for (let x in recipe) {
                formData.append(x, recipe[x]);
            }

            fetch(`${baseURL}/edit_recipe/${selectedRecipe.value._id}`, {
                method: "PUT",
                body: formData,
            })
                .then((response) => {
                    if (response.status === 200) {
                        showSuccess("Recipe successfully updated");
                        URL.revokeObjectURL(imgURL.value);
                        store.dispatch("User/getAllRecipes");
                        router.push(`/list/${user.value._id}`);
                    } else {
                        showError("Error! Recipe has not been updated!");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    showError("Something went wrong :( Please contact administrator");
                });
        };

        const changeIng = (ingr) => {
            const index = state.recipe.recipeIngredients.findIndex((el) => el.id === ingr.id);
            state.recipe.recipeIngredients[index] = ingr;
        };

        const addIng = () => {
            const ing = {
                id: getID(state.recipe.recipeIngredients),
                name: "",
                amount: "",
                unit: "",
            };
            state.recipe.recipeIngredients.push(ing);
        };

        const deleteIng = (id) => {
            const arr = state.recipe.recipeIngredients.filter((el) => el.id !== id);
            state.recipe.recipeIngredients = arr;
        };

        function submitForm() {
            this.recipeForm.validate((valid) => {
                if (valid) {
                    send(this.state.recipe);
                }
            });
        }

        function cancel() {
            router.push("/");
        }

        const handleImgUpload = (file) => {
            img.value = file.raw;
            imgURL.value = URL.createObjectURL(file.raw);
        };

        const deleteImg = () => {
            img.value = "";
            state.recipe.img = "";
            URL.revokeObjectURL(imgURL.value);
            imgURL.value = "";
        };

        return {
            state,
            units,
            submitForm,
            recipeForm,
            cancel,
            changeIng,
            addIng,
            deleteIng,
            handleImgUpload,
            selectedRecipe,
            deleteImg,
            imgURL,
        };
    },
};
</script>

<style lang="scss" scoped>
.labelRecipe1.labelRecipe2 {
    display: flex;
    flex-direction: column;
}

.labelRecipe1.labelRecipe2::v-deep .el-form-item__content {
    display: flex;
}

.labelRecipe1.labelRecipe2::v-deep label {
    padding-bottom: 0;
}

.signUp {
    margin-top: 25px;
}

.imageLable {
    font-size: 14px;
    color: #606266;
    margin-bottom: 20px;
}

.imgUpload1.imgUpload2::v-deep .el-upload__tip {
    line-height: 10px;
    margin-top: 0;
}

.imgUpload1.imgUpload2::v-deep .el-upload {
    width: 100%;
}

.imgUpload1.imgUpload2::v-deep .el-upload-dragger {
    width: auto;
}

.preview::v-deep img {
    width: auto;
}
</style>
