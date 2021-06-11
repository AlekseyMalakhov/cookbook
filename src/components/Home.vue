<template>
    <el-row type="flex"> 
        <Card />
    </el-row>

</template>

<script>
import Card from "./Card.vue";

export default {
    name: "Home",
    setup() {
        
    },
    components: { Card, },
}
</script>

<style lang="scss" scoped>

</style>