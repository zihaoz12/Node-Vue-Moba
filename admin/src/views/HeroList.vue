<template>
    <div>
        <h1>Hero List</h1>
            <el-table :data="items">
                <el-table-column prop="_id" label="ID" width="240">
                </el-table-column> 
                <el-table-column prop="name" label="Hero name" >
                </el-table-column> 
                <el-table-column prop="title" label="Hero title" >
                </el-table-column>
                <el-table-column prop="avatar" label="Hero avatar" >
                    <template v-slot="scope">
                        <img :src="scope.row.avatar" style="height:3rem">
                    </template>
                </el-table-column> 
                <el-table-column fixed="right" label="Options" width="180">
                    <template v-slot="scope">
                        <el-button type="text" size="small"
                        @click="$router.push(`/heroes/edit/${scope.row._id}`)"
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
            const res = await this.$http.get('rest/heroes');
            this.items = res.data;
        },
        remove(row){
                this.$confirm(`Your action will remove category: ${row.name}`, '提示', {
                confirmButtonText: 'Continue',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(async () => {
                    const res = await this.$http.delete(`rest/heroes/${row._id}`);
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