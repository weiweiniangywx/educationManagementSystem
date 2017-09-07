<template>
	<div id="makeupExamAdmin">
		<top-title></top-title>
    	<top-bar1></top-bar1>
      
      <makeup-list></makeup-list>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar1 from '../../../../components/eduAdmin/markManage/makeupExamAdminPage/topBar1'
import makeupList from '../../../../components/eduAdmin/markManage/makeupExamAdminPage/makeupList'

export default {
	name: 'makeupExamAdmin',
  components: {
      topTitle, topBar1, makeupList
  },
  data () {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
/*.blank {
  height: 2.9rem;
}*/
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
