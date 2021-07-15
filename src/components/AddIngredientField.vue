<template>
    <el-form-item label="Ingredients" prop="recipeForm" class="labelRecipe1 labelRecipe2">
        <el-input v-model="state.recipe.recipeIngredients[0].name" class="recipeInput" placeholder="Ingredient"></el-input>
        <el-input
            v-model="state.recipe.recipeIngredients[0].amount"
            @input="checkName($event)"
            class="amount"
            inputMode="numeric"
            placeholder="Amount"
        ></el-input>
        <el-select v-model="state.recipe.recipeIngredients[0].unit" placeholder="Unit" class="unit">
            <el-option v-for="unit in units" :key="unit" :label="unit" :value="unit"></el-option>
        </el-select>
    </el-form-item>
</template>

<script>
export default {
    name: "AddIngredientField",
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
