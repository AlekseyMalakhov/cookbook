<template>
    <el-row v-if="!props.userID" type="flex" justify="center" class="title">
        Our chefs
    </el-row>
    <el-row v-if="props.userID" type="flex" justify="center" class="title">
        {{ selectedUser.name }}
    </el-row>

    <el-menu v-if="!props.userID">
        <router-link v-for="user in users" :key="user._id" :to="`/${user._id}`" class="chefLink" @click="selectUser(user)">
            <el-menu-item>
                {{ user.name }}
            </el-menu-item>
        </router-link>
    </el-menu>

    <el-menu v-if="props.userID">
        <router-link v-for="recipe in recipes" :key="recipe._id" :to="`/${recipe._id}`" class="chefLink">
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
    props: {
        userID: {
            type: String,
            required: false,
        },
    },
    setup(props) {
        const store = useStore();
        const users = computed(() => store.state.User.users);
        const selectedUser = computed(() => store.state.User.selectedUser);
        const recipes = computed(() => {
            const rs = store.state.User.recipes.filter((res) => res.userID === props.userID);
            console.log([...rs]);
            return rs;
        });

        const selectUser = (user) => {
            store.dispatch("User/setSelectedUser", user);
        };

        return {
            users,
            recipes,
            props,
            selectUser,
            selectedUser,
        };
    },
};
</script>

<style lang="scss" scoped>
.title {
    font-size: 20px;
    padding-top: 20px;
}

.el-menu {
    margin-top: 20px;
}

.chefLink {
    text-decoration: none;
}
</style>
