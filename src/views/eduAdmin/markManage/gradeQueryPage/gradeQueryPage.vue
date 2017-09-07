<template>
	<div id="gradeQuery">
		<top-title></top-title>
    	<top-bar2></top-bar2>
    	
    	<grade-content></grade-content>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar2 from '../../../../components/eduAdmin/markManage/gradeQueryPage/topBar2'
import gradeContent from '../../../../components/eduAdmin/markManage/gradeQueryPage/gradeContent'

export default {
	name: 'gradeQuery',
	data () {
		return {
			
		}
	},
	components: {
    	topTitle, topBar2, gradeContent
  	},
  	methods: {
      selYearsBtn: function () {

      }
  	}
}
</script>

<style scoped>

@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
