<template>
    <el-row v-if="!selectedUser" type="flex" justify="center" class="title">
        Our users
    </el-row>

    <el-row v-if="selectedUser" style="margin: 11px 0 12px 20px">
        <el-button type="primary" icon="el-icon-back" circle @click="unselectUser()"></el-button>
    </el-row>

    <el-menu v-if="!selectedUser">
        <router-link v-for="user in users" :key="user._id" :to="`/list/${user._id}`" class="chefLink">
            <el-menu-item>
                <el-avatar :size="40" :src="user.img" class="avatar1 avatar2">
                    <i class="el-icon-s-custom" />
                </el-avatar>
                <span style="margin-left: 10px">{{ user.name }}</span>
            </el-menu-item>
        </router-link>
    </el-menu>

    <el-menu v-if="selectedUser">
        <router-link v-for="recipe in recipes" :key="recipe._id" :to="`/${recipe.userID}/recipe/${recipe._id}`" class="chefLink">
            <el-menu-item class="menuElement">
                <el-avatar :size="40" :src="recipe.img" class="avatar1 avatar2"></el-avatar>
                <span style="margin-left: 10px">{{ recipe.recipeName }}</span>
            </el-menu-item>
        </router-link>
    </el-menu>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const users = computed(() => store.state.User.users);
        const selectedUser = computed(() => {
            return users.value.find((user) => user._id === route.params.userID);
        });
        const recipes = computed(() => {
            const rs = store.state.User.recipes.filter((res) => res.userID === selectedUser.value._id);
            return rs;
        });

        const unselectUser = () => {
            router.push("/");
        };

        return {
            users,
            recipes,
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
    padding-bottom: 20px;
    background-color: white;
    font-weight: bold;
}

.chefLink {
    text-decoration: none;
}

li.menuElement {
    line-height: normal;
    white-space: normal;
    margin: 20px auto;
    height: auto;
}

.avatar1.avatar2 i {
    font-size: 20px;
    vertical-align: baseline;
    margin-right: 0;
    width: 30px;
    cursor: pointer;
}

span.avatar1.avatar2 {
    font-size: 20px;
}
</style>
