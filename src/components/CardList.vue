<template>
    <el-row type="flex">
        <Card class="card2" v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </el-row>
</template>

<script>
import Card from "./Card.vue";
import { recipesList } from "../mock_data/mock_db";
import { computed } from "vue";

export default {
    name: "CardList",
    props: {
        userID: {
            type: String,
            required: false,
        },
    },
    setup(props) {
        const recipes = computed(() => {
            if (!props.userID) {
                console.log("here");
                return recipesList;
            } else {
                const rs = recipesList.filter(res => res.userID === Number.parseInt(props.userID));
                console.log(rs);
                return rs;
            }
        });

        return {
            //state,
            recipes,
        };
    },
    components: { Card },
};
</script>

<style lang="scss" scoped>
.card2 {
    margin: 10px;
}

.card2:hover {
    transform: scale(102%, 102%) rotate(1deg);
}
</style>
