<template>
	<div id="setPrice">
		<top-title></top-title>
    	<top-bar1></top-bar1>
    	
      <set-price-body></set-price-body>
	</div>
</template>

<script>
import topTitle from '../../../../components/public/topTitle/topTitle'
import topBar1 from '../../../../components/eduAdmin/tchSalary/setPricePage/topBar1'
import setPriceBody from '../../../../components/eduAdmin/tchSalary/setPricePage/setPriceBody'

export default {
	name: 'setPrice',
	components: {
    	topTitle, topBar1, setPriceBody
  	},
  	data () {
  		return {
  			
  		}
  	}
}
</script>

<style scoped>
@media screen and (max-width: 1023px) {
  html {
  }
}
</style>
