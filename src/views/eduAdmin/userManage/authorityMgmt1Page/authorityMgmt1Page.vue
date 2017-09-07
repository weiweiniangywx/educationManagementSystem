<template>
	<div id="authorityMgmt1">
		<top-title></top-title>
   	<top-bar1></top-bar1>
    <!-- <div id="main">
      <div class="lPart">
        <roles></roles>
      </div>
      <div class="rPart">
        <personal-authorities></personal-authorities>
      </div>
    </div> -->
    <role-manage></role-manage>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar1 from '../../../../components/eduAdmin/userManage/authorityMgmt1Page/topBar1'
import roleManage from '../../../../components/eduAdmin/userManage/authorityMgmt1Page/roleManage'

export default {
	name: 'authorityMgmt1',
	components: {
    	topTitle, topBar1, roleManage
  	}
}
</script>

<style scoped>
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
