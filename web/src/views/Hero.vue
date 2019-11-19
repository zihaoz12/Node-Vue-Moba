<template>
    <div class="page-hero" v-if="model">
        <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
            <img src="../assets/logo1.png" height="30">
            <div class="px-2 flex-1"> 
                <span class="text-white">Mobile League</span>
                <span class="ml-2">About</span>
            </div>
            <router-link to="/" tag="div">More &gt;</router-link>
        </div>  
        <h1>{{model.name}}</h1>
    </div>
</template>

<script>
export default {
    props:{
        id: {required: true}
    },
    data(){
        return{
            model:null
        }  
    },
    methods:{
        async fetchHero(){   
            const res = await this.$http.get(`heroes/${this.id}`)
            this.model = res.data;     
        }
    },
    created(){
        this.fetchHero();
    }

}
</script>

