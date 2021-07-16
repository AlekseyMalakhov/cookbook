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
    setup() {
        const store = useStore();
        const selectedUser = computed(() => store.state.User.selectedUser);
        const recipes = computed(() => {
            if (!selectedUser.value) {
                return store.state.User.recipes;
            } else {
                const rs = store.state.User.recipes.filter((res) => res.userID === selectedUser.value._id);
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
