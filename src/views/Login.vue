<template>
    <el-row type="flex" justify="center" align="middle">
        <h2>Login page</h2>
    </el-row>
    <el-row type="flex" justify="center" align="middle">
        <el-form :model="state.login" :rules="state.rules" ref="loginForm" label-width="120px" label-position="top">
            <el-form-item label="Username" prop="name" class="labelLogin1 labelLogin2">
                <el-input v-model="state.login.name" class="loginInput"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password" class="labelLogin1 labelLogin2">
                <el-input v-model="state.login.password" class="loginInput"></el-input>
            </el-form-item>

            <el-row type="flex" justify="space-around" align="middle">
                <el-button type="primary" @click="submitForm()">Login</el-button>
                <el-button @click="cancel()">Cancel</el-button>
            </el-row>
        </el-form>
    </el-row>
    
    
    
</template>

<script>
import { ref, reactive } from '@vue/reactivity';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();

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
            router.push("/");
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

<style lang="scss">
    .labelLogin1.labelLogin2 label {
        padding-bottom: 0;
    }
    .loginInput {
        width: 300px;
    }

</style>