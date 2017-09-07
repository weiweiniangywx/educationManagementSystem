<template>
	<div id="salary">
		<top-title></top-title>
    <top-bar1></top-bar1>
    
    <tch-salary-body></tch-salary-body>
	</div>
</template>

<script>
import topTitle from '../../../components/public/topTitle/topTitle'
import topBar1 from '../../../components/teacher/tchCheckSalaryPage/topBar1'
import tchSalaryBody from '../../../components/teacher/tchCheckSalaryPage/tchSalaryBody'

export default {
	name: 'salary',
	components: {
    	topTitle, topBar1, tchSalaryBody
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
