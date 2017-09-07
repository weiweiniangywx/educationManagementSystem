<template>
  <div class="topBarDiv am-btn-group">
    <a :href="makeupExamUrl"><button id="makeupExamBtn" class="topBarButton am-btn am-btn-success btn-active">{{ makeupExamBtn }}</button></a>
    <a :href="makeupInputUrl"><button id="makeupInputBtn" class="topBarButton am-btn am-btn-success">{{ makeupInputBtn }}</button></a>
  </div>
</template>

<script>
  export default {
    name: 'topBarDiv',
    data () {
      return {
        makeupExamBtn: '补考成绩管理',
        makeupInputBtn: '补考成绩录入',
        makeupExamUrl: '#/eduAdmin/gradeManage/makeupExam/makeupExamAdmin',
        makeupInputUrl: '#/eduAdmin/gradeManage/makeupExam/makeupGradeInput',
      }
    }
  }
</script>

<style scoped>
  #makeupExamBtn {
    margin-left: 5rem;
  }
</style>
