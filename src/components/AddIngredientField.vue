<template>
    <el-form-item :label="label" prop="recipeForm" class="labelRecipe1 labelRecipe2">
        <el-input v-model="state.name" @input="sendData($event)" class="recipeInput" placeholder="Ingredient"></el-input>
        <el-input v-model="state.amount" @input="sendData($event, true)" class="amount" inputMode="numeric" placeholder="Amount"></el-input>
        <el-select v-model="state.unit" @change="sendData($event)" placeholder="Unit" class="unit">
            <el-option v-for="unit in props.units" :key="unit" :label="unit" :value="unit"></el-option>
        </el-select>
        <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            style="margin-left: 20px"
            @click="deleteIng()"
            :class="label ? 'invisible' : ''"
        ></el-button>
    </el-form-item>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
const allowOnlyNumbers = (text) => {
    const regex1 = /[^\d]/g;
    const onlyNumbers = text.replace(regex1, "");
    return onlyNumbers;
};

export default {
    name: "AddIngredientField",
    props: {
        units: {
            type: Array,
            required: true,
        },
        id: {
            type: Number,
            required: true,
        },
        editedIngr: {
            type: Object,
            required: false,
        },
    },
    setup(props, ctx) {
        const state = reactive({
            name: "",
            amount: "",
            unit: "",
        });

        const label = computed(() => {
            if (props.id === 1) {
                return "Ingredients:";
            }
            return "";
        });

        onMounted(() => {
            console.log(props.editedIngr);
            console.log(props.editedIngr.name);
            if (props.editedIngr) {
                state.name = props.editedIngr.name;
                state.amount = props.editedIngr.amount;
                state.unit = props.editedIngr.unit;
            }
        });

        const sendData = (text, amount) => {
            if (amount) {
                const onlyNumbers = allowOnlyNumbers(text);
                state.amount = onlyNumbers;
            }
            const res = { ...state };
            res.id = props.id;
            ctx.emit("change-ingredient", res);
        };

        const deleteIng = () => {
            ctx.emit("delete-ingredient", props.id);
        };

        return {
            props,
            sendData,
            state,
            label,
            deleteIng,
        };
    },
};
</script>

<style lang="scss">
.labelRecipe1.labelRecipe2 {
    display: flex;
    flex-direction: column;
}

.labelRecipe1.labelRecipe2 .el-form-item__content {
    display: flex;
}

.labelRecipe1.labelRecipe2 label {
    padding-bottom: 0;
}

.amount {
    width: 200px;
    margin-left: 20px;
}

.unit {
    width: 200px;
    margin-left: 20px;
}

.invisible {
    visibility: hidden;
}
</style>
