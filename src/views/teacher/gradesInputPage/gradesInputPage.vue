<template>
	<div id="grdInput">
		<top-title></top-title>
    	<top-bar2></top-bar2>
    	
    	<grade-put-body></grade-put-body>
	</div>
</template>

<script>
import topTitle from '../../../components/public/topTitle/topTitle'
import topBar2 from '../../../components/teacher/gradesInputPage/topBar2'
import gradePutBody from '../../../components/teacher/gradesInputPage/gradePutBody'

export default {
	name: 'grdInput',
	data () {
		return {
			
		}
	},
	components: {
		topTitle, topBar2, gradePutBody
	},
	methods: {

	}
}
</script>

<style scoped>
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>