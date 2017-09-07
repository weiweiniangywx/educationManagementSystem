<template>
	<div id="grdInput">
		<top-title></top-title>
    	<top-bar2></top-bar2>
    	
    	<makeup-grade-input></makeup-grade-input>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar2 from '../../../../components/eduAdmin/markManage/makeupGradeInputPage/topBar2'
import makeupGradeInput from '../../../../components/eduAdmin/markManage/makeupGradeInputPage/makeupGradeInputBody'

export default {
	name: 'makeupGrdInput',
	data () {
		return {
			
		}
	},
	components: {
		topTitle, topBar2, makeupGradeInput
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