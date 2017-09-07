<template>
	<div id="noticeMgmt">
		<top-title></top-title>
    <top-bar1></top-bar1>
    <notice-mgmt-table></notice-mgmt-table>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar1 from '../../../../components/eduAdmin/notice/noticeMgmtPage/topBar1'
import noticeMgmtTable from '../../../../components/eduAdmin/notice/noticeMgmtPage/noticeMgmtTable'

export default {
	name: 'noticeMgmt',
	components: {
    	topTitle, topBar1, noticeMgmtTable
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
