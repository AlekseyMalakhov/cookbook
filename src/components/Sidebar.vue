<template>
    <el-row type="flex" justify="center" class="title">    
        Recepies
    </el-row>


    <el-menu>        
        <el-menu-item index="1">Breakfast Casserole</el-menu-item>
        <el-menu-item index="1">Giada's Chicken Saltimbocca</el-menu-item>
        <el-menu-item index="1">Sloppy Joes</el-menu-item>
        <el-menu-item index="1">Healthified Broccoli Cheddar Soup</el-menu-item>
        <el-menu-item index="1">Frozen Fruit Smoothies</el-menu-item>

    </el-menu>
    
</template>

<script>
export default {
    setup() {
        
    },
}
</script>

<style lang="scss" scoped>
    .title {
        font-size: 20px;
        padding-top: 20px;
    }

    .el-menu {
        margin-top: 20px;
    }
</style>