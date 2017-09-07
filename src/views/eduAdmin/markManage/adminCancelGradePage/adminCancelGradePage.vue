<template>
	<div id="adminCancelGrade">
		<top-title></top-title>
    	<top-bar2></top-bar2>
    	<cancel-content></cancel-content>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar2 from '../../../../components/eduAdmin/markManage/adminCancelGradePage/topBar2'
import cancelContent from '../../../../components/eduAdmin/markManage/adminCancelGradePage/cancelContent'

export default {
	name: 'adminCancelGrade',
	data () {
		return {
			
		}
	},
	components: {
    	topTitle, topBar2, cancelContent
  	},
  	methods: {
  		checkTableBtn: function () {

  		}
  	}
}
</script>

<style scoped>
#adminCancelGrade input {
  margin-right: 1.4rem;
}
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
