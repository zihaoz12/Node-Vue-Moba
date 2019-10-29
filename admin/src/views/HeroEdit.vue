<template>
    <div class="about">
        <h1>{{ id ? 'Edit' : "New"}} Hero</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-tabs value="skills" type="border-card">
                <el-tab-pane label="Hero Info">
                    <el-form-item label=" Hero name" >
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label=" Hero title" >
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label="Hero Icon">
                        <el-upload
                            class="avatar-uploader"
                            :action="$http.defaults.baseURL + '/upload'"
                            :show-file-list="false"
                            :on-success="afterUpload"
                        >
                            <img v-if="model.avatar" :src="model.avatar" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
            
            
                    <el-form-item label=" Hero Category" >
                        <el-select v-model="model.categories" multiple>
                            <el-option  
                                        v-for="item in categories" 
                                        :key="item._id"
                                        :label="item.name"
                                        :value="item._id"
                            ></el-option>                     
                        </el-select>
                    </el-form-item>
                    <el-form-item label=" Difficulty " >
                        <el-rate :max="9" show-score style="margin-top:0.6rem" v-model="model.scores.difficult"></el-rate>
                    </el-form-item>
                    <el-form-item label=" Skills " >
                        <el-rate :max="9" show-score style="margin-top:0.6rem" v-model="model.scores.skills"></el-rate>
                    </el-form-item>
                    <el-form-item label=" Attack " >
                        <el-rate :max="9" show-score style="margin-top:0.6rem" v-model="model.scores.attack"></el-rate>
                    </el-form-item>
                    <el-form-item label=" Survive " >
                        <el-rate :max="9" show-score style="margin-top:0.6rem" v-model="model.scores.survive"></el-rate>
                    </el-form-item>

                    <el-form-item label=" Recommended Item Builds 1" >
                        <el-select v-model="model.items1" multiple>
                            <el-option  
                                v-for="item in items" 
                                :key="item._id"
                                :label="item.name"
                                :value="item._id"
                            ></el-option>                    
                        </el-select>
                    </el-form-item>

                    <el-form-item label=" Pro Builds " >
                        <el-select v-model="model.items2" multiple>
                            <el-option  
                                v-for="item in items" 
                                :key="item._id"
                                :label="item.name"
                                :value="item._id"
                            ></el-option>                        
                        </el-select>
                    </el-form-item>

                    <el-form-item label=" Guide Tips">
                        <el-input type="textarea" v-model="model.usageTips"></el-input>
                    </el-form-item>

                    <el-form-item label=" Battle Tips">
                        <el-input type="textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>

                    <el-form-item label=" TeamFight Tips">
                        <el-input type="textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>
                         
                </el-tab-pane>
                <el-tab-pane label="Hero Skills" name="skills">
                    <el-button type="text" @click="model.skills.push({})"><i class="el-icon-plus"> Add Skills</i></el-button>
                    <el-row type="flex" style="flex-wrap: wrap">
                        <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
                            <el-form-item label="name">   
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label="Icon">   
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL + '/upload'"
                                    :show-file-list="false"
                                    :on-success="res => $set(item,'icon', res.url)"
                                >
                                <img v-if="item.icon" :src="item.icon" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="Description">   
                                <el-input v-model="item.description" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item label="Tips">   
                                <el-input v-model="item.tips" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" type="danger" 
                                @click="model.skills.splice(i,1)">Delete</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs> 
            <el-form-item style="margin-top: 1rem;">
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
                name:'',
                avatar:'',
                scores:{
                    difficult:0
                }
            },
            categories:[],
            items:[]
        }
    },
    methods:{
        afterUpload(res){
            // this.$set(this.model, 'avatar', res.url)
            this.model.avatar = res.url
        },
        async save(){   
            let res;
            if(this.id){
                res = await this.$http.put(`rest/heroes/${this.id}`,this.model)
            } else{
                res = await this.$http.post('rest/heroes',this.model)
            }   
           
           this.$router.push('/heroes/list')
           this.$message({
               type:'success',
               message:"submit successfully"
           })
           window.console.log(res)
        },
        async fetch(){
            const res = await this.$http.get(`rest/heroes/${this.id}`)
            this.model = Object.assign({}, this.model, res.data)
        },
        async fetchCategories(){
            const res = await this.$http.get(`rest/categories`)
            this.categories = res.data
        },
        async fetchItems(){
            const res = await this.$http.get(`rest/items`)
            this.items = res.data
        }
   

    },
    created(){
        this.fetchCategories(),
        this.fetchItems(),
        this.id && this.fetch()
    }
}
</script>


<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 5rem;
    height: 5rem;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>