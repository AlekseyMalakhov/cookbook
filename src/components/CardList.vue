<template>
    <el-row type="flex" justify="center" v-if="selectedUser">
        <h3 style="margin: 3px auto">{{ selectedUser.name }}</h3>
    </el-row>
    <el-row type="flex">
        <Card class="card2" v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </el-row>
    <el-tooltip effect="light" content="Add recipe" placement="top" v-if="user">
        <el-button type="primary" icon="el-icon-plus" circle class="addRecipe" @click="createRecipe()"></el-button>
    </el-tooltip>
</template>

<script>
import Card from "./Card.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
    name: "CardList",
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const user = computed(() => store.state.User.user);
        const users = computed(() => store.state.User.users);
        const selectedUser = computed(() => {
            return users.value.find((user) => user._id === route.params.userID);
        });
        const createRecipe = () => {
            router.push("/create_recipe");
        };
        const recipes = computed(() => {
            if (!selectedUser.value) {
                return store.state.User.recipes;
            } else {
                const rs = store.state.User.recipes.filter((res) => res.userID === selectedUser.value._id);
                return rs;
            }
        });

        return {
            recipes,
            createRecipe,
            user,
            selectedUser,
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
.addRecipe {
    position: fixed;
    bottom: 100px;
    right: 50px;
    font-size: 25px;
    @media screen and (max-width: 650px) {
        right: 20px;
    }
}
</style>
