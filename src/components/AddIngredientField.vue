<template>
    <el-form-item label="Ingredients" prop="recipeForm" class="labelRecipe1 labelRecipe2">
        <el-input v-model="state.name" class="recipeInput" placeholder="Ingredient"></el-input>
        <el-input v-model="state.amount" @input="checkName($event)" class="amount" inputMode="numeric" placeholder="Amount"></el-input>
        <el-select v-model="state.unit" placeholder="Unit" class="unit">
            <el-option v-for="unit in props.units" :key="unit" :label="unit" :value="unit"></el-option>
        </el-select>
    </el-form-item>
</template>

<script>
import { reactive } from "@vue/reactivity";
const allowOnlyNumbers = text => {
    const regex1 = /[^\d]/g;
    const onlyNumbers = text.replace(regex1, "");
    return onlyNumbers;
};

export default {
    name: "AddIngredientField",
    props: {
        recipe: {
            type: Object,
            required: false,
        },
        units: {
            type: Array,
            required: true,
        },
    },
    setup(props) {
        const state = reactive({
            name: "",
            amount: "",
            unit: "",
        });

        const checkName = text => {
            const onlyNumbers = allowOnlyNumbers(text);
            console.log(onlyNumbers);
            state.amount = onlyNumbers;
        };

        return {
            props,
            checkName,
            state,
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
</style>
