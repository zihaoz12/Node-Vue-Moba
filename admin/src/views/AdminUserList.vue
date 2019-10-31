<template>
    <div>
        <h1>Admin List</h1>
            <el-table :data="items">
                <el-table-column prop="_id" label="ID" width="240">
                </el-table-column> 
                <el-table-column prop="username" label="Admin username" >
                </el-table-column> 
                <el-table-column fixed="right" label="Options" width="180">
                    <template v-slot="scope">
                        <el-button type="text" size="small"
                        @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
                        >Edit</el-button>
                        <el-button type="text" size="small"
                        @click="remove(scope.row)"
                        >Delete</el-button>
                    </template>
                </el-table-column>    
            </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            items:[]
        }
    },
    methods:{
        async fetch(){
            const res = await this.$http.get('rest/admin_users');
            this.items = res.data;
        },
        remove(row){
                this.$confirm(`Your action will remove Admin User: ${row.name}`, '提示', {
                confirmButtonText: 'Continue',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(async () => {
                    const res = await this.$http.delete(`rest/admin_users/${row._id}`);
                    window.console.log("delete data:",res)
                    this.$message({
                    type: 'success',
                    message: 'Delete Successfully!'
                });
            }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: 'Cancel'
                });  
            this.fetch();        
            });          
        }
    },
    created(){
        this.fetch();
    }
}
</script>
