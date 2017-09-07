<template>
  <div class="topBarDiv am-btn-group">
    <a :href="teachingAssessUrl"><button id="teachingAssessBtn" class="topBarButton am-btn am-btn-success">{{ teachingAssessBtn }}</button></a>
    <a :href="gradesInputUrl"><button id="gradesInputBtn" class="topBarButton am-btn am-btn-success btn-active">{{ gradesInputBtn }}</button></a>
    <a :href="classMgmtUrl"><button id="classMgmtBtn" class="topBarButton am-btn am-btn-success">{{ classMgmtBtn }}</button></a>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        teachingAssessBtn: '评教结果',
        gradesInputBtn: '选班成绩录入',
        classMgmtBtn: '班级列表',
        teachingAssessUrl: '#/teacher/class/teachingEvaluate',
        gradesInputUrl: '#/teacher/class/tchGradesInput',
        classMgmtUrl: '#/teacher/class/classList',
      }
    },
    methods: {
      
    }
  }
</script>

<style lang="css" scoped>
  #teachingAssessBtn {
    margin-left: 5rem;
  }

</style>
