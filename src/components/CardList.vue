<template>
    <el-row type="flex">
        <Card class="card2" v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </el-row>
</template>

<script>
import Card from "./Card.vue";
import { useStore } from "vuex";
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
        const store = useStore();
        const recipes = computed(() => {
            if (!props.userID) {
                return store.state.User.recipes;
            } else {
                const rs = store.state.User.recipes.filter((res) => res.userID === props.userID);
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
