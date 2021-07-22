<template>
    <el-form-item :label="'#' + (props.i + 1)" prop="recipeForm" class="labelIng1 labelIng2">
        <el-row type="flex" :gutter="20">
            <el-col :xs="24" :sm="14" style="margin-top: 15px">
                <el-input v-model="state.name" @input="sendData($event)" placeholder="Ingredient"></el-input>
            </el-col>
            <el-col :xs="24" :sm="4" style="margin-top: 15px">
                <el-input v-model="state.amount" @input="sendData($event, true)" inputMode="numeric" placeholder="Amount"></el-input>
            </el-col>
            <el-col :xs="24" :sm="6" style="margin-top: 15px">
                <div style="display: flex">
                    <el-select v-model="state.unit" @change="sendData($event)" placeholder="Unit">
                        <el-option v-for="unit in props.units" :key="unit" :label="unit" :value="unit"></el-option>
                    </el-select>
                    <el-button
                        type="danger"
                        icon="el-icon-delete"
                        circle
                        style="margin-left: 20px"
                        @click="deleteIng()"
                        :class="props.id === 1 ? 'invisible' : ''"
                    ></el-button>
                </div>
            </el-col>
        </el-row>
    </el-form-item>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
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
        i: {
            type: Number,
            required: true,
        },
    },
    setup(props, ctx) {
        const state = reactive({
            name: "",
            amount: "",
            unit: "",
        });

        onMounted(() => {
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
            deleteIng,
        };
    },
};
</script>

<style lang="scss" scoped>
.labelIng1.labelIng2 {
    display: flex;
    flex-direction: column;
}

.labelIng1.labelIng2::v-deep .el-form-item__content {
    display: flex;
}

.labelIng1.labelIng2::v-deep .el-form-item__label {
    line-height: normal;
    margin-bottom: -10px;
}

.labelIng1.labelIng2::v-deep label {
    padding-bottom: 0;
}

.invisible {
    visibility: hidden;
}
</style>
