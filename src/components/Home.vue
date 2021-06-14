<template>
    <el-row type="flex">
            <Card class="card2"/>
            <Card class="card2"/>
            <Card class="card2"/>
            <Card class="card2"/>
            <Card class="card2"/>
            <Card class="card2"/>
            <Card class="card2"/>
            <Card class="card2"/>
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
.card2 {
    margin: 10px;
}

.card2:hover {
    transform: rotate(1deg);
}

</style>