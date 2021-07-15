<template>
    <el-row type="flex" justify="center" align="middle">
        <h2>Create a new recipe</h2>
    </el-row>
    <el-row type="flex" justify="center" align="middle">
        <el-form :model="state.recipe" :rules="state.rules" ref="recipeForm" label-width="120px" label-position="top">
            <el-form-item label="Recipe name" prop="recipeName" class="labelRecipe1 labelRecipe2">
                <el-input v-model="state.recipe.recipeName" class="recipeInput" @keyup.enter="() => submitForm()"></el-input>
            </el-form-item>

            <AddIngredientField :units="units" @change-ingredient="changeIngredient" />

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

        const send = recipeObj => {
            fetch("http://localhost:3000/create_recipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(recipeObj),
            })
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        showError("Recipe successfully created");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    showError("Something went wrong :( Please contact administrator");
                });
        };

        const changeIngredient = ingredient => {
            console.log(ingredient);
        };

        function submitForm() {
            this.recipeForm.validate(valid => {
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

{ id: 2, user: "Lark Woodward", userID: 77, date: "30.07.2021", recipeName: "Giada's Chicken Saltimbocca", recipeIngredients: [{ Purus: "30 gr" }, {
Pellentesque: "500 gr" }, { Quam: "1 table spoon" }, { Viverra: "2 tea spoons" }, { Lorem: "100 gr" }, { Turpis: "300 gr" }], recipeText: .`Lorem
ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas tellus rutrum tellus
pellentesque eu tincidunt tortor. In nulla posuere sollicitudin aliquam ultrices sagittis orci a. Pharetra diam sit amet nisl suscipit adipiscing.
Lectus quam id leo in vitae turpis massa sed. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit. Magna fringilla urna porttitor
rhoncus dolor purus. Integer enim neque volutpat ac. Platea dictumst quisque sagittis purus sit amet volutpat consequat mauris. Amet facilisis magna
etiam tempor. Porta non pulvinar neque laoreet suspendisse interdum. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Quam
id leo in vitae turpis massa sed elementum tempus. Sapien pellentesque habitant morbi tristique senectus et netus. Egestas egestas fringilla phasellus
faucibus scelerisque. Turpis egestas sed tempus urna et pharetra pharetra massa. Ut eu sem integer vitae justo eget magna fermentum iaculis. Diam sit
amet nisl suscipit adipiscing bibendum est. Sed viverra tellus in hac habitasse platea dictumst vestibulum.`, img: img, }, recipeName,
recipeIngredients, recipeText, img
