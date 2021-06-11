<template>

  <el-container>
    <el-header>
      <Header />
    </el-header>

    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main><Home /></el-main>
    </el-container>

    <el-footer>Footer</el-footer>
  </el-container>
  
</template>

<script>
import Home from "./components/Home.vue";
import Header from "./components/Header.vue";

export default {
  name: 'App',
  components: { Home, Header, },
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

.el-header, .el-footer {
  background-color: #409EFF;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

</style>
