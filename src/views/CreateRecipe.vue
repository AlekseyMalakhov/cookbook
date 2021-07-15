<template>
    <el-row type="flex" justify="center" align="middle">
        <h2>Create a new recipe</h2>
    </el-row>
    <el-row type="flex" justify="center" align="middle">
        <el-form :model="state.recipe" :rules="state.rules" ref="recipeForm" label-width="120px" label-position="top">
            <el-form-item label="Recipe name" prop="recipeName" class="labelRecipe1 labelRecipe2">
                <el-input v-model="state.recipe.recipeName" class="recipeInput"></el-input>
            </el-form-item>

            <AddIngredientField
                v-for="ing in state.recipe.recipeIngredients"
                :key="ing.id"
                :id="ing.id"
                :units="units"
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

            <el-row type="flex" justify="center" align="middle" style="margin-bottom: 20px">
                <div class="imageLable">Image:</div>
                <el-form-item>
                    <el-upload
                        class="imgUpload1 imgUpload2"
                        drag
                        action="http://localhost:3000/upload_img"
                        :on-change="handleImgUpload"
                        multiple
                        :auto-upload="false"
                    >
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
                <el-button type="primary" @click="submitForm()">Create</el-button>
                <el-button @click="cancel()">Cancel</el-button>
            </el-row>
        </el-form>
    </el-row>
</template>

<script>
import { ref, reactive, computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
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
        const store = useStore();
        const user = computed(() => store.state.User.user);
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
            recipeObj.userID = user.value._id;
            const formData = new FormData();
            for (let x in recipeObj) {
                formData.append(x, recipeObj[x]);
            }

            fetch("http://localhost:3000/create_recipe", {
                method: "POST",
                body: formData,
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

        const changeIng = (ingr) => {
            const index = state.recipe.recipeIngredients.findIndex((el) => el.id === ingr.id);
            console.log(index);
            state.recipe.recipeIngredients[index] = ingr;
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
            this.recipeForm.resetFields();
            router.push("/");
        }

        function showError(text) {
            ElNotification.error({
                title: "Error",
                message: text,
            });
        }

        const handleImgUpload = (file) => {
            // console.log(file.raw);
            // if (file.size < 10000000) {
            //     let reader = new FileReader();
            //     reader.onload = () => {
            //         //setImageBase64(e.target.result);
            //         state.recipe.img = file.raw;
            //     };
            //     reader.readAsDataURL(file.raw);
            // } else {
            //     showError("Image size error!", "The image size must be less 10MB!");
            // }

            state.recipe.img = file.raw;
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
        };
    },
};

// function sendAccountConfig(platformName, phone, configObj) {
//             const formData = new FormData();
//             for (let x in configObj) {
//                 formData.append(x, configObj[x]);
//             }
//             channelService.sendMessagingServiceConfig(platformName, phone, formData).then(result => {
//                 if (result) {
//                     saveChannel();
//                 } else {
//                     showErrorNotify("Channel not created", "Error on saving a new channel!" );
//                 }
//             });
//         }

// export function sendMessagingServiceConfig(messagingService, identifier, config) { //test
//     const headers = {"Content-Type": "multipart/form-data"};
//     return axiosPersistence.post(`messaging-service/account/details/${messagingService}?identifier=${identifier}`, config, {headers: headers}).then(response => {
//         return true;
//     }).catch(error => {
//         console.error(error);
//         return false;
//     });
// }
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

.imageLable {
    font-size: 14px;
    color: #606266;
    margin-right: 20px;
    margin-bottom: 40px;
}

.imgUpload1.imgUpload2 .el-upload__tip {
    line-height: 10px;
    margin-top: 0;
}
</style>

function sendAccountConfig(platformName, phone, configObj) { const formData = new FormData(); for (let x in configObj) { formData.append(x,
configObj[x]); } channelService.sendMessagingServiceConfig(platformName, phone, formData).then(result => { if (result) { saveChannel(); } else {
showErrorNotify("Channel not created", "Error on saving a new channel!" ); } }); } export function sendMessagingServiceConfig(messagingService,
identifier, config) { //test const headers = {"Content-Type": "multipart/form-data"}; return
axiosPersistence.post(`messaging-service/account/details/${messagingService}?identifier=${identifier}`, config, {headers: headers}).then(response => {
return true; }).catch(error => { console.error(error); return false; }); }
