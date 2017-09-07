<template>
  <!--使用import引入的组件组合page页面-->
  <div id="manageGradePage">
    <topTitle></topTitle>
    <topBar></topBar>
    <notifyBoard></notifyBoard>
  </div>
</template>

<script>
  /*import引入该page页面的单文件组件*/
  import topTitle from '../../../../components/public/topTitle/topTitle.vue'
  import topBar from '../../../../components/eduAdmin/notice/notifyInformationPage/topBar/topBar.vue'
  import notifyBoard from '../../../../components/eduAdmin/notice/notifyInformationPage/notifyBoard/notifyBoard.vue'
  export default {
    name: '',
    data () {
      return {
        msg: ''
      }
    },
    /*注册import引入的单文件组件*/
    components:{
      topTitle,
      topBar,
      notifyBoard
    }
  }
</script>

<style scoped>
  html {
    font-size: 100%;
  }
  #manageGradePage{
    min-height:50rem;
  }
  .blank{
    height: 2.9rem;
  }

  @media screen and (max-width: 1023px) {
    html {
      font-size: 56%;
    }
  }
</style>
