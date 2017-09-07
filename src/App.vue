<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
	name: 'app',
	data () {
		return {
			
		}
	},
	// beforeMount: function () {
	// 	this.$http.get('../test.php').then(function(response) {
	// 		console.log(response.body);
	// 	});
	// }
}
</script>

<style scoped>
@import './assets/css/external.css';

@media screen and (max-width:1023px){
  html{
    font-family: "Microsoft YaHei";
  }
}
</style>
