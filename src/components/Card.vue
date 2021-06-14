<template>
    <el-card :body-style="{ padding: '0px' }">
        <img :src="recipe.img" class="image">
        <div style="padding: 14px;" class="info">
            <div class="user">{{recipe.user}}</div>
            <span>{{recipe.recipeName}}</span>
            <div class="bottom">
                <time class="time">{{ recipe.date}}</time>
                <el-button type="text" class="button">Recipe</el-button>
            </div>
        </div>
    </el-card>
</template>

<script>
export default {
    props: {
        recipe: {
            type: Object,
            required: true,
        }
    },
    setup() {

    },
}
</script>

<style lang="scss" scoped>
.el-card {
    width: 230px;
}

.user {
    font-size: 13px;
    color: #999;
    margin-bottom: 10px;
    display: flex;

}

.info {
    height: 80px;
}

time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 100%;
    display: block;
}


</style>