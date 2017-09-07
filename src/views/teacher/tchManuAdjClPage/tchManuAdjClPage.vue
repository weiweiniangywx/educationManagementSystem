<template>
  <div id="tchManuCou">
    <top-title></top-title>
    <top-bar3></top-bar3>
    
    <adj-show></adj-show>
  </div>
</template>

<script>
import topTitle from '../../../components/public/topTitle/topTitle'
import topBar3 from '../../../components/teacher/tchManuAdjClPage/topBar3'
import adjShow from '../../../components/teacher/tchManuAdjClPage/adjShow'

export default {
  name: 'tchManuCou',
  data () {
    return {
      
    }
  },
  components: {
    topTitle, topBar3, adjShow
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
