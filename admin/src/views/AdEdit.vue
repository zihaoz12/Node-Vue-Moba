<template>
    <div class="about">
        <h1>{{ id ? 'Edit' : "New"}} Ad </h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label=" Ad Title" >
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label=" Ad Body"> 
                <el-button type="text" @click="model.items.push({})"><i class="el-icon-plus"> New Ad</i></el-button>
                    <el-row type="flex" style="flex-wrap: wrap">
                        <el-col :md="24" v-for="(item, i) in model.items" :key="i">
                            <el-form-item label="Link URL">   
                                <el-input v-model="item.url"></el-input>
                            </el-form-item>
                            <el-form-item label="Image" style="margin-top: 0.5rem">   
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL + '/upload'"
                                    :show-file-list="false"
                                    :on-success="res => $set(item,'image', res.url)"
                                >
                                <img v-if="item.image" :src="item.image" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            
                            <el-form-item>
                                <el-button size="small" type="danger" 
                                @click="model.items.splice(i,1)">Delete</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" native-type="submit">Save</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>


export default {
   
    props:{
        id:{}
    },
    data(){
        return{
            model:{
                items:[]
            },
            
        }
    },
    methods:{
        async save(){   
            let res;
            if(this.id){
                res = await this.$http.put(`rest/ads/${this.id}`,this.model)
            } else{
                res = await this.$http.post('rest/ads',this.model)
            }   
           
           this.$router.push('/ads/list')
           this.$message({
               type:'success',
               message:"submit successfully"
           })
           window.console.log(res)
        },
        async fetch(){
            const res = await this.$http.get(`rest/ads/${this.id}`)
            this.model = Object.assign({},this.model, res.data)
        },
        

    },
    created(){
        this.id && this.fetch()
    }
}
</script>

