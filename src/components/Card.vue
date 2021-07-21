<template>
    <el-card :body-style="{ padding: '0px' }" @click="showRecipe()">
        <img :src="`http://localhost:3000/images/${recipe.img}`" class="image" />
        <div style="padding: 14px;" class="info">
            <div class="user">{{ recipe.user }}</div>
            <span>{{ recipe.recipeName }}</span>
            <div class="bottom">
                <time class="time">{{ recipe.date }}</time>
                <router-link :to="`/${recipe.userID}/recipe/${recipe._id}`" style="text-decoration: none;">
                    <el-button type="text" class="button">Try it</el-button>
                </router-link>
            </div>
        </div>
    </el-card>
</template>

<script>
import { useRouter } from "vue-router";
export default {
    props: {
        recipe: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const router = useRouter();
        const showRecipe = () => {
            router.push(`/${props.recipe.userID}/recipe/${props.recipe._id}`);
        };
        return {
            showRecipe,
        };
    },
};
</script>

<style lang="scss" scoped>
.el-card {
    width: 230px;
    cursor: pointer;
}

.user {
    font-size: 13px;
    color: #999;
    margin-bottom: 10px;
    display: flex;
}

.info {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
