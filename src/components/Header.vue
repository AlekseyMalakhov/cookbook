<template>
    <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="12" >
            <el-row type="flex" align="middle" justify="start" class="title">
                Cookbook
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row type="flex" align="middle" justify="end">
                <el-avatar :size="50" :src="state.circleUrl"></el-avatar>
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
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
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
    }


   


</style>