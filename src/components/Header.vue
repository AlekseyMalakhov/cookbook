<template>
    <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="12">
            <el-row type="flex" align="middle" justify="start">
                <el-button
                    icon="el-icon-menu"
                    type="primary"
                    circle
                    class="menuButton"
                    v-if="screenWidth < 650 && showMenu"
                    @click="toggleSidebar()"
                ></el-button>
                <router-link to="/" class="title">
                    Cookbook
                </router-link>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row type="flex" align="middle" justify="end" v-if="user">
                <router-link :to="`/list/${user._id}`" class="chefLink">
                    <span class="username">{{ user.name }}</span>
                </router-link>

                <el-dropdown trigger="click">
                    <el-avatar :size="50" :src="user.img" fit="fill" class="avatar">
                        <i class="el-icon-s-custom" />
                    </el-avatar>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="logout">Logout</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-row>

            <el-row type="flex" align="middle" justify="end" v-if="!user">
                <router-link to="/login" class="avatarRoute">
                    <el-avatar :size="50" :src="''" class="avatar">
                        <i class="el-icon-s-custom" />
                    </el-avatar>
                </router-link>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default {
    name: "Header",
    setup() {
        const router = useRouter();
        const route = useRoute();
        const store = useStore();
        const user = computed(() => store.state.User.user);
        const screenWidth = computed(() => store.state.User.screenWidth);
        const showSidebar = computed(() => store.state.User.showSidebar);
        const showMenu = computed(() => {
            if (route.path === "/login" || route.path === "/create_account") {
                return false;
            }
            return true;
        });

        const logout = () => {
            localStorage.removeItem("user");
            store.dispatch("User/setUser", null);
            router.push("/");
        };

        const toggleSidebar = () => {
            if (showSidebar.value) {
                store.dispatch("User/setShowSidebar", false);
            } else {
                store.dispatch("User/setShowSidebar", true);
            }
        };

        return {
            user,
            logout,
            screenWidth,
            toggleSidebar,
            showMenu,
        };
    },
};
</script>

<style lang="scss" scoped>
.menuButton {
    font-size: 25px;
    padding: 8px 9px;
    margin-right: 10px;
}
.title {
    color: white;
    font-size: 20px;
    text-decoration: none;
}

.username {
    color: white;
    font-size: 20px;
    margin-right: 20px;
}

.avatarRoute {
    height: 50px;
}

.avatar {
    font-size: 30px;
    cursor: pointer;
}

.avatar:hover {
    background-color: #aaaeb5;
}

.chefLink {
    text-decoration: none;
    color: #606266;
}
</style>
