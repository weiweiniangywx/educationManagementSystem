<template>
  <div class="topBarDiv am-btn-group">
    <a :href="noticeMgmtUrl"><button id="noticeMgmtBtn" class="topBarButton am-btn am-btn-success btn-active">{{ noticeMgmtBtn }}</button></a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        noticeMgmtBtn: '公告管理',
        noticeMgmtUrl: '#/eduAdmin/information/noticeManage'
      }
    }
  }
</script>

<style scoped>
  #noticeMgmtBtn {
    margin-left: 5rem;
  }

</style>
