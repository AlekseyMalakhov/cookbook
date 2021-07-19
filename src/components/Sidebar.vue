<template>
    <el-row v-if="!selectedUser" type="flex" justify="center" class="title">
        Our users
    </el-row>

    <el-row v-if="selectedUser" style="margin: 11px 0 12px 20px">
        <el-button type="primary" icon="el-icon-back" circle @click="unselectUser()"></el-button>
    </el-row>

    <el-row v-if="selectedUser" type="flex" justify="center" class="selectedUser">
        {{ selectedUser.name }}
    </el-row>

    <el-menu v-if="!selectedUser">
        <el-menu-item v-for="user in users" :key="user._id" @click="selectUser(user)">
            {{ user.name }}
        </el-menu-item>
    </el-menu>

    <el-menu v-if="selectedUser">
        <router-link v-for="recipe in recipes" :key="recipe._id" :to="`/recipe/${recipe._id}`" class="chefLink">
            <el-menu-item>
                {{ recipe.recipeName }}
            </el-menu-item>
        </router-link>
    </el-menu>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
    setup() {
        const store = useStore();
        const users = computed(() => store.state.User.users);
        const selectedUser = computed(() => store.state.User.selectedUser);
        const recipes = computed(() => {
            const rs = store.state.User.recipes.filter((res) => res.userID === selectedUser.value._id);
            return rs;
        });

        const selectUser = (user) => {
            store.dispatch("User/setSelectedUser", user);
        };

        const unselectUser = () => {
            store.dispatch("User/setSelectedUser", null);
        };

        return {
            users,
            recipes,
            selectUser,
            selectedUser,
            unselectUser,
        };
    },
};
</script>

<style lang="scss" scoped>
.title {
    font-size: 20px;
    padding-top: 20px;
    margin-bottom: 20px;
}

.selectedUser {
    padding-top: 20px;
    background-color: white;
    font-weight: bold;
}

.chefLink {
    text-decoration: none;
}
</style>
