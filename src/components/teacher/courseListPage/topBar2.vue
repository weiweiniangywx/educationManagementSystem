<template>
  <div class="topBarDiv am-btn-group">
    <a :href="teachPlanUrl"><button id="teachPlanBtn" class="topBarButton am-btn am-btn-success btn-active">{{ teachPlanBtn }}</button></a>
    <a :href="superviseUrl"><button id="superviseBtn" class="topBarButton am-btn am-btn-success">{{ superviseBtn }}</button></a>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        teachPlanBtn: '教学计划',
        superviseBtn: '督导反馈',
        teachPlanUrl: '#/teacher/teach/courseList',
        superviseUrl: '#/teacher/teach/director',
      }
    },
    methods: {
      
    }
  }
</script>

<style scoped>
  #teachPlanBtn {
    margin-left: 5rem;
  }

</style>
