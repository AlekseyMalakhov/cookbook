<template>
    <el-row type="flex" justify="center" align="middle">
        <h2>Create account</h2>
    </el-row>
    <el-row type="flex" justify="center" align="middle">
        <el-form :model="state.login" :rules="state.rules" ref="loginForm" label-width="120px" label-position="top">
            <el-form-item label="Create your username" prop="name" class="labelLogin1 labelLogin2">
                <el-input v-model="state.login.name" class="loginInput" @keyup.enter="() => submitForm()"></el-input>
            </el-form-item>
            <el-form-item label="Create your password" prop="password1" class="labelLogin1 labelLogin2">
                <el-input v-model="state.login.password1" class="loginInput" @keyup.enter="() => submitForm()"></el-input>
            </el-form-item>
            <el-form-item label="Repeat your password" prop="password2" class="labelLogin1 labelLogin2">
                <el-input v-model="state.login.password2" class="loginInput" @keyup.enter="() => submitForm()"></el-input>
            </el-form-item>

            <el-row type="flex" justify="space-around" align="middle">
                <el-button type="primary" @click="submitForm()">Create</el-button>
                <el-button @click="cancel()">Cancel</el-button>
            </el-row>
        </el-form>
    </el-row>
</template>

<script>
import { ref, reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { showError, showSuccess } from "../utilities";

export default {
    setup() {
        const router = useRouter();

        const state = reactive({
            login: {
                name: "",
                password1: "",
                password2: "",
            },
            rules: {
                name: [{ required: true, message: "Please, enter username", trigger: "change" }],
                password1: [{ required: true, message: "Please, enter password", trigger: "change" }],
                password2: [{ required: true, message: "Please, enter password", trigger: "change" }],
            },
        });

        const loginForm = ref(null);

        const send = (account) => {
            fetch("http://localhost:3000/create_account", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(account),
            })
                .then((response) => {
                    if (response.status === 200) {
                        showSuccess("Account successfully created.");
                        router.push("/");
                    } else {
                        showError(`Login ${account.name} already exists. Please, try another one.`);
                    }
                })
                .then((data) => console.log(data))
                .catch((error) => {
                    console.error("Error:", error);
                    showError("Something went wrong :( Please contact administrator");
                });
        };

        function submitForm() {
            this.loginForm.validate((valid) => {
                if (valid) {
                    if (this.state.login.password1 === this.state.login.password2) {
                        const account = { ...this.state.login };
                        account.password = account.password1;
                        delete account.password1;
                        delete account.password2;
                        send(account);
                        console.log(account);
                    }
                }
            });
        }

        function cancel() {
            this.loginForm.resetFields();
            router.push("/");
        }

        return {
            state,
            submitForm,
            loginForm,
            cancel,
        };
    },
};
</script>

<style lang="scss">
//classes look at the Login component
</style>
