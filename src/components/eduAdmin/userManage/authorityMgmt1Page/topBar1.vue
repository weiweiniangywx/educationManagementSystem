<template>
  <div class="topBarDiv am-btn-group">
    <a :href="authorityMgmt1Url"><button id="authorityMgmtBtn" class="topBarButton am-btn am-btn-success btn-active">{{ authorityMgmt1Btn }}</button></a>
    <a :href="authorityMgmt2Url"><button class="topBarButton am-btn am-btn-success">{{ authorityMgmt2Btn }}</button></a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        authorityMgmt1Btn: '角色管理',
        authorityMgmt2Btn: '权限设置',
        authorityMgmt1Url: '#/eduAdmin/role/authorityMgmt1',
        authorityMgmt2Url: '#/eduAdmin/role/eduAdminAuthorityManage2'
      }
    }
  }
</script>

<style lang="css" scoped>
  #authorityMgmtBtn {
    margin-left: 5rem;
  }
</style>
