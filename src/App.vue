<template> 
  <el-container id="main_container">
    <el-header>
      <Header />
    </el-header>

    <router-view />
    

    <el-footer><Footer /></el-footer>
  </el-container>
  
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: 'App',
  components: { Header, Footer },
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

</style>
