<template>
    <el-row type="flex">
            <Card class="card2" v-for="recipe in state.recipes" :key="recipe.id" :recipe="recipe"/>
    </el-row>
</template>

<script>
import Card from "./Card.vue";
import { recipes } from "../mock_data/mock_db";
import { reactive } from "vue";

export default {
    name: "CardList",
    setup() {
        const state = reactive({
            recipes: recipes,
        });

        return {
            state,
        }

    },
    components: { Card, },
}
</script>

<style lang="scss" scoped>
.card2 {
    margin: 10px;
}

.card2:hover {
    transform: scale(102%, 102%) rotate(1deg);
}

</style>