<template>
    <div class="about">
        <h1>New Category</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label=" Category name" >
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">Save</el-button>
            </el-form-item>
        </el-form>
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
        async save(){
            
           const res = await this.$http.post('categories',this.model)
           this.$router.push("/categories/list")
           this.$message({
               type:'success',
               message:"submit successfully"
           })
           window.console.log("Save");
           window.console.log(res)
        }
    }
}
</script>
