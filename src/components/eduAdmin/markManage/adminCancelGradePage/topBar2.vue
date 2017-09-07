<template>
  <div class="topBarDiv am-btn-group">
    <a :href="gradeCountUrl"><button id="gradeCountBtn" class="topBarButton am-btn am-btn-success">{{ gradeCountBtn }}</button></a>
    <a :href="gradeCheckUrl"><button id="gradeCheckBtn" class="topBarButton am-btn am-btn-success">{{ gradeCheckBtn }}</button></a>
    <a :href="gradeCancelUrl"><button id="gradeCancelBtn" class="topBarButton am-btn am-btn-success btn-active">{{ gradeCancelBtn }}</button></a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        gradeCountBtn: '成绩统计',
        gradeCheckBtn: '成绩查询',
        gradeCancelBtn: '成绩撤销',
        gradeCountUrl: '#/eduAdmin/gradeManage/grade/gradeStat',
        gradeCheckUrl: '#/eduAdmin/gradeManage/grade/gradeQuery',
        gradeCancelUrl: '#/eduAdmin/gradeManage/grade/adminCancelGrade'
      }
    },
    methods: {
      
    }
  }
</script>

<style scoped>

  #gradeCountBtn {
    margin-left: 5rem;
  }
  @media screen and (max-width:1023px) {
    html {
      font-size: 9px;
    }
  }
</style>
