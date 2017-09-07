<template>
	<div id="gradeStat">
		<top-title></top-title>
    	<top-bar2></top-bar2>
    	
    	<grade-table></grade-table>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar2 from '../../../../components/eduAdmin/markManage/gradeStatPage/topBar2'
import gradeTable from '../../../../components/eduAdmin/markManage/gradeStatPage/gradeTable'

export default {
	name: 'gradeStat',
	components: {
    	topTitle, topBar2, gradeTable
  	}
}
</script>

<style scoped>
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
