<template>
    <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="12">
            <el-row type="flex" align="middle" justify="start">
                <router-link to="/" class="title">
                    Cookbook
                </router-link>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row type="flex" align="middle" justify="end">
                <el-dropdown trigger="click" v-if="user">
                    <span class="el-dropdown-link username">{{ user.name }}</span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <!-- <router-link :to="`/${user._id}`" class="chefLink">
                                    My recepies
                                </router-link> -->
                            </el-dropdown-item>
                            <el-dropdown-item @click="logout">Logout</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

                <router-link :to="link" class="avatarRoute">
                    <el-avatar :size="50" :src="state.circleUrl" class="avatar">
                        <i class="el-icon-s-custom" />
                    </el-avatar>
                </router-link>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
    name: "Header",
    setup() {
        const state = reactive({
            circleUrl: "",
        });
        const router = useRouter();
        const store = useStore();
        const user = computed(() => store.state.User.user);
        const link = computed(() => {
            if (user.value) {
                return "";
            } else {
                return "/login";
            }
        });

        const logout = () => {
            localStorage.removeItem("user");
            store.dispatch("User/setUser", null);
            router.push("/");
        };

        return {
            state,
            user,
            logout,
            link,
        };
    },
};
</script>

<style lang="scss" scoped>
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
}

.avatar:hover {
    background-color: #aaaeb5;
}

.el-dropdown-link {
    cursor: pointer;
}

.chefLink {
    text-decoration: none;
    color: #606266;
}
</style>
