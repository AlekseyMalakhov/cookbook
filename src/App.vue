<template>

  <el-container id="main_container">
    <el-header>
      <Header />
    </el-header>

    <el-container>
      <el-aside width="200px"><Sidebar /></el-aside>
      <el-main><CardList /></el-main>
    </el-container>

    <el-footer><Footer /></el-footer>
  </el-container>
  
</template>

<script>
import CardList from "./components/CardList.vue";
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: 'App',
  components: { CardList, Header, Sidebar, Footer},
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#main_container {
  min-height: 100vh;
}

.el-header, .el-footer {
  background-color: #409EFF;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-footer {
  margin-top: auto;
}

.el-aside {
  background-color: #D3DCE6;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}

</style>
