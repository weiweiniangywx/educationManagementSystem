<template>
	<div id="noticeSetting">
		<top-title></top-title>
    <top-bar1></top-bar1>
    <notice-table></notice-table>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar1 from '../../../../components/eduAdmin/notice/noticeSettingPage/topBar1'
import noticeTable from '../../../../components/eduAdmin/notice/noticeSettingPage/table'

export default {
	name: 'noticeSetting',
	components: {
    	topTitle, topBar1, noticeTable
  }
}
</script>

<style scoped>
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
