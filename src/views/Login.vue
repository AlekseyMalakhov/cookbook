<template>
    Login page
    <el-form :model="state.login" :rules="state.rules" ref="loginForm" label-width="120px">
        <el-form-item label="Username" prop="name">
            <el-input v-model="state.login.name"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
            <el-input v-model="state.login.password"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm()">Create</el-button>
            <el-button @click="cancel()">Cancel</el-button>
        </el-form-item>
    </el-form>
    
</template>

<script>
import { ref, reactive } from '@vue/reactivity'
export default {
    setup() {
        const state = reactive({
            login: {
                name: "",
                password: "",
            },
            rules: {
                name: [
                    {required: true, message: "Please, enter username", trigger: "change"},
                ],
                password: [
                    {required: true, message: "Please, enter password", trigger: "change"},
                ],
            },
        });

        const loginForm = ref(null);

        function submitForm() {
            this.loginForm.validate(valid => {
                if (valid) {
                    console.log(this.state.login);
                }
            });            
        }

        function cancel() {
            this.loginForm.resetFields();
            console.log("cancel");
        }

        return {
            state,
            submitForm,
            loginForm,
            cancel,
        }
    },
}
</script>

<style lang="scss" scoped>

</style>