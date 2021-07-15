<template>
    <el-row type="flex" justify="center" align="middle">
        <h2>Create a new recipe</h2>
    </el-row>
    <el-row type="flex" justify="center" align="middle">
        <el-form :model="state.recipe" :rules="state.rules" ref="recipeForm" label-width="120px" label-position="top">
            <el-form-item label="Recipe name" prop="recipeName" class="labelRecipe1 labelRecipe2">
                <el-input v-model="state.recipe.recipeName" class="recipeInput" @keyup.enter="() => submitForm()"></el-input>
            </el-form-item>

            <AddIngredientField
                v-for="ing in state.recipe.recipeIngredients"
                :key="ing.id"
                :id="ing.id"
                :units="units"
                @change-ingredient="changeIngredient"
            />

            <el-row type="flex" justify="center" align="middle">
                <el-tooltip effect="light" content="Add ingredient" placement="left">
                    <el-button type="success" icon="el-icon-plus" circle @click="addIng()"></el-button>
                </el-tooltip>
            </el-row>

            <el-row type="flex" justify="space-around" align="middle">
                <el-button type="primary" @click="submitForm()">Create</el-button>
                <el-button @click="cancel()">Cancel</el-button>
            </el-row>
        </el-form>
    </el-row>
</template>

<script>
import { ref, reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
//import { useStore } from "vuex";
import { ElNotification } from "element-plus";
import AddIngredientField from "../components/AddIngredientField.vue";

// let largestNumber;
// if (idList.length !== 0) {
//     largestNumber = Math.max(...idList);
// } else {
//     largestNumber = 0;
// }
// const id = largestNumber + 1;

let ingID = 2;

export default {
    components: { AddIngredientField },
    setup() {
        const router = useRouter();
        const units = ["none", "g", "kg", "L", "ml", "tea sp.", "table sp."];
        //const store = useStore();
        const state = reactive({
            recipe: {
                recipeName: "",
                recipeIngredients: [
                    {
                        id: 1,
                        name: "",
                        amount: "",
                        unit: "",
                    },
                ],
                recipeText: "",
                img: "",
            },
            rules: {
                recipeName: [{ required: true, message: "Please, enter username", trigger: "change" }],
            },
        });

        const recipeForm = ref(null);

        const send = (recipeObj) => {
            fetch("http://localhost:3000/create_recipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(recipeObj),
            })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        showError("Recipe successfully created");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    showError("Something went wrong :( Please contact administrator");
                });
        };

        const changeIngredient = (ingredient) => {
            console.log(ingredient);
        };

        const addIng = () => {
            const ing = {
                id: ingID,
                name: "",
                amount: "",
                unit: "",
            };
            state.recipe.recipeIngredients.push(ing);
            ingID++;
        };

        function submitForm() {
            this.recipeForm.validate((valid) => {
                if (valid) {
                    send(this.state.recipe);
                }
            });
        }

        function cancel() {
            this.recipeForm.resetFields();
            router.push("/");
        }

        function showError(text) {
            ElNotification.error({
                title: "Error",
                message: text,
            });
        }

        return {
            state,
            units,
            submitForm,
            recipeForm,
            cancel,
            changeIngredient,
            addIng,
        };
    },
};
</script>

<style lang="scss">
.labelRecipe1.labelRecipe2 {
    display: flex;
    flex-direction: column;
}

.labelRecipe1.labelRecipe2 .el-form-item__content {
    display: flex;
}

.labelRecipe1.labelRecipe2 label {
    padding-bottom: 0;
}

.amount {
    width: 200px;
    margin-left: 20px;
}

.unit {
    width: 200px;
    margin-left: 20px;
}

.signUp {
    margin-top: 25px;
}
</style>
