<template>
  <div class="app">

    <header>
      <el-menu mode="horizontal" class="el-menu-demo" :router="true">
        <el-menu-item index="/" style="float:left; margin-left:10vw"><img src="./assets/logo.png" height="35" alt="logo"><span>blacksalt的blog</span></el-menu-item>
        <el-submenu style="float:right; margin-right:10vw" index='sub'>
          <template #title><el-avatar :src="userInfo.avatar"></el-avatar></template>
          <el-menu-item index="/login">登录</el-menu-item>
          <el-menu-item index="/setting">设置</el-menu-item>
        </el-submenu>
        <el-menu-item index="/AddOrEditArticle/0" style="float:right"><el-button type="primary">写文章<i class="el-icon-upload el-icon--right"></i></el-button></el-menu-item>
      </el-menu>
    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <HR/>
      <br>
      <div>
        <span><el-link type="success" target="_blank" href="https://github.com/black-salt/blacksalt-blog-front">blacksalt的blog</el-link> - 创建于 2021年2月15日</span>
        <span style="margin-left:40px">Friend Link : <el-link type="success" href="https://github.com/black-salt">"https://github.com/black-salt"</el-link></span>
      </div>
      <br>
    </footer>

  </div>
</template>
<script>
import { store } from '@/store'
export default {
  data () {
    return {
      userInfo: store.userInfo
    }
  }
}
</script>

<style scoped>
.app{
  background-color:rgb(238, 238, 238);
}

main{
  margin-top:20px;
  margin-left:10vw;
  margin-right:10vw;
}
footer{
  margin-top:60px;
  text-align:center;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>
