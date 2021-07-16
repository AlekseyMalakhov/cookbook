<template>
    <el-row type="flex" justify="center" align="middle">
        <h2>Login page</h2>
    </el-row>
    <el-row type="flex" justify="center" align="middle">
        <el-form :model="state.login" :rules="state.rules" ref="loginForm" label-width="120px" label-position="top">
            <el-form-item label="Username" prop="name" class="labelLogin1 labelLogin2">
                <el-input v-model="state.login.name" class="loginInput" @keyup.enter="() => submitForm()"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password" class="labelLogin1 labelLogin2">
                <el-input v-model="state.login.password" class="loginInput" @keyup.enter="() => submitForm()"></el-input>
            </el-form-item>

            <el-row type="flex" justify="space-around" align="middle">
                <el-button type="primary" @click="submitForm()">Login</el-button>
                <el-button @click="cancel()">Cancel</el-button>
            </el-row>
        </el-form>
    </el-row>
    <el-row type="flex" justify="center" align="middle" class="signUp">
        Don't have an account? &nbsp; <router-link to="/create_account">Create one.</router-link>
    </el-row>
</template>

<script>
import { ref, reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { showError } from "../utilities";

export default {
    setup() {
        const router = useRouter();
        const store = useStore();

        const state = reactive({
            login: {
                name: "",
                password: "",
            },
            rules: {
                name: [{ required: true, message: "Please, enter username", trigger: "change" }],
                password: [{ required: true, message: "Please, enter password", trigger: "change" }],
            },
        });

        const loginForm = ref(null);

        const send = (credentials) => {
            fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        showError("Login or password is incorrect");
                    }
                })
                .then((data) => {
                    if (data.name) {
                        localStorage.setItem("user", JSON.stringify(data));
                        store.dispatch("User/setUser", data);
                        router.push("/");
                    } else {
                        showError("Something went wrong :( Please contact administrator");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    showError("Something went wrong :( Please contact administrator");
                });
        };

        function submitForm() {
            this.loginForm.validate((valid) => {
                if (valid) {
                    send(this.state.login);
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
.labelLogin1.labelLogin2 label {
    padding-bottom: 0;
}
.loginInput {
    width: 300px;
}
.signUp {
    margin-top: 25px;
}
</style>
