<template>
	<div id="tchCheckTable">
		<top-title></top-title>
    	<top-bar3></top-bar3>
    	
    	<form name="tableInfo"><timetable></timetable></form>
	</div>
</template>

<script>
import topTitle from '../../../components/public/topTitle/topTitle'
import topBar3 from '../../../components/teacher/tchCheckTimetablePage/topBar3'
import timetable from '../../../components/teacher/tchCheckTimetablePage/timetable'

export default {
	name: 'tchCheckTable',
	data () {
		return {
			
		}
	},
	components: {
		topTitle, topBar3, timetable
	},
	methods: {
		
	}
}
</script>

<style scoped>

/*.tableSelect {
	margin: 0.6rem 5rem;
}
.tableSelect select {
	margin-right: 1.4rem;
	border-radius: 1rem;
	width: 10rem;
	font-size: 0.8rem;
	outline: none;
}*/
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>