<template>
    <div>
        <div class="topbar bg-black py-2 px-3 d-flex ai-center">
            <img src="../assets/logo1.png" alt="logo" height="30">
            <div class="px-2"> 
                <div class="text-white"> Leagu Of Legends</div>
                <div class="text-grey-1 fs-xxs">Welcome to League of Legends</div>
            </div>
            <button type="button" class="btn bg-primary">Play Now</button>
        </div>
        <div class="bg-primary pt-3 pb-2">
            <div class="nav nav-inverse pb-1 jc-around"> 
                <div class="nav-item active"> 
                    <router-link class="nav-link" tag="div" to="/">Home</router-link>
                </div>
                <div class="nav-item"> 
                    <router-link class="nav-link" tag="div" to="/">GAME</router-link>
                </div>
                <div class="nav-item"> 
                    <router-link class="nav-link" tag="div" to="/">ESPORTS</router-link>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
