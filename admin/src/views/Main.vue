<template>
<el-container style="height: 100vh; ">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-openeds="['1']" unique-opened: default-active="$route.path">
      <el-submenu  index="1">
        <template slot="title"><i class="el-icon-message"></i>Data Manager</template>        
        <el-menu-item-group>
          <template slot="title">Item</template>
          <el-menu-item index="/items/create">Create New Item</el-menu-item>
          <el-menu-item index="/items/list">Items List</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">Hero</template>
          <el-menu-item index="/heroes/create">Create New Hero</el-menu-item>
          <el-menu-item index="/heroes/list">Heroes List</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">Article</template>
          <el-menu-item index="/articles/create">Create New Article</el-menu-item>
          <el-menu-item index="/articles/list">Articles List</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-message"></i>General Data
        </template>
        <el-menu-item-group>
          <template slot="title">Ads</template>
          <el-menu-item index="/ads/create">Create New Adv</el-menu-item>
          <el-menu-item index="/ads/list">Adv List</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

       <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-message"></i>Admin Setting
        </template>
        <el-menu-item-group>
          <template slot="title">Catagory</template>
          <el-menu-item index="/categories/create">Create New Category</el-menu-item>
          <el-menu-item index="/categories/list">Category List</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">Admin</template>
          <el-menu-item index="/admin_users/create">Create New Admin</el-menu-item>
          <el-menu-item index="/admin_users/list">Admin List</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Edit</el-dropdown-item>
          <el-dropdown-item>Add</el-dropdown-item>
          <el-dropdown-item>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button @click="LogOut()" type="danger"> Log Out</el-button>
    </el-header>
    
    <el-main>
      <router-view :key="$route.path"></router-view>
      
    </el-main>
  </el-container>
</el-container>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    },
    methods:{
      async LogOut(){
        localStorage.clear();
        window.location.href='/';
      }
    }
  };
</script>