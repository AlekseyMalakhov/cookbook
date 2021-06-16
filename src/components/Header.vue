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


</style>