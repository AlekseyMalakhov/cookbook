<template>
	<el-container>
		<el-aside width="200px"><Sidebar /></el-aside>
		<el-main><CardList /></el-main>
	</el-container>
</template>

<script>
import CardList from "../components/CardList.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
	name: 'Home',
  components: { CardList, Sidebar, },

}
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: #D3DCE6;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}
</style>
