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
import { reactive } from "vue";

export default {
    name: "Header",
    setup() {
        const state = reactive({
            
        });

        return {
            state,
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