<template>
    <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="12" >
            <el-row type="flex" align="middle" justify="start">
                <router-link to="/" class="title">
                    Cookbook
                </router-link>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row type="flex" align="middle" justify="end">
                <span v-if="user" class="username">{{ user.name }}</span>
                <router-link to="/login" class="avatarRoute">
                    <el-avatar :size="50" :src="state.circleUrl" class="avatar"> 
                        <i class="el-icon-s-custom"/> 
                    </el-avatar>
                </router-link>

                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        Dropdown List<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>Action 1</el-dropdown-item>
                            <el-dropdown-item>Action 2</el-dropdown-item>

                        </el-dropdown-menu>
                    </template>
                </el-dropdown>



            </el-row>
        </el-col>           


        



    </el-row>
</template>

<script>
import { reactive, computed } from "vue";
import { useStore } from 'vuex'

export default {
    name: "Header",
    setup() {
        const state = reactive({
            circleUrl: "",
        });
        const store = useStore();
        const user = computed(() => store.state.User.user);

        return {
            state,
            user,
        };
    },

}
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
        color: #040b13;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }


</style>