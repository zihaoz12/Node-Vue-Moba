<template>
    <div class="login-container">
        <el-card header="Please Login first" class="login-card">
            <el-form @submit.native.prevent="login">
                <el-form-item label="username">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="password">
                    <el-input type="password" v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">Login</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>


<script>
export default {
    data(){
        return{
            model:{}
        }
    },
    methods:{
        async login(){
            const res =  await this.$http.post('login', this.model)
            localStorage.token = res.data.token
            this.$router.push('/')
            this.$message({
                type: 'success',
                message: 'Login successfully !'
            })
        }
    }
}
</script>

<style>
    .login-card{
        width: 25rem;
        margin:5rem auto;
    }
</style>
