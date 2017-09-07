<template>
	<div id="classList">
		<top-title></top-title>
    	<top-bar2></top-bar2>
      
      <my-class-list></my-class-list>
	</div>
</template>

<script>
import topTitle from '../../../components/public/topTitle/topTitle'
import topBar2 from '../../../components/teacher/courseListPage/topBar2'
import myClassList from '../../../components/teacher/courseListPage/myClassList'

export default {
	name: 'classList',
  data () {
    return {
      
    }
  },
	components: {
    	topTitle, topBar2, myClassList
  }
}
</script>

<style scoped>
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
