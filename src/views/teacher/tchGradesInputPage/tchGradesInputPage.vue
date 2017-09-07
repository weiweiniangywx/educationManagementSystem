<template>
	<div id="tchGrdInput">
		<top-title></top-title>
    	<top-bar></top-bar>
    	
    	<tch-grd-put-body></tch-grd-put-body>
	</div>
</template>

<script>
import topTitle from '../../../components/public/topTitle/topTitle'
import topBar from '../../../components/teacher/tchGradesInputPage/topBar2'
import tchGrdPutBody from '../../../components/teacher/tchGradesInputPage/tchGrdPutBody'

export default {
	name: 'tchGrdInput',
	data () {
		return {
			
		}
	},
	components: {
		topTitle, topBar, tchGrdPutBody
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