<template>
  <div class="topBarDiv am-btn-group">
    <a :href="makeupLessonUrl">
      <button id="makeupLessonBtn" class="am-btn am-btn-success">{{ makeupLessonBtn }}</button>
    </a>
    <a :href="adjustCourseUrl">
      <button id="adjustCourseBtn" class="am-btn am-btn-success btn-active">{{ adjustCourseBtn }}</button>
    </a>
    <a :href="stopCourseUrl">
      <button id="stopCourseBtn" class="am-btn am-btn-success">{{ stopCourseBtn }}</button>
    </a>
    <a :href="banAdjustUrl">
      <button id="banAdjustBtn" class="am-btn am-btn-success">{{ banAdjustBtn }}</button>
    </a>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        makeupLessonBtn: '补课申请',
        adjustCourseBtn: '调课申请',
        stopCourseBtn: '停课申请',
        banAdjustBtn: '禁排申请',
        makeupLessonUrl: '#/teacher/course/makeupClass',
        adjustCourseUrl: '#/teacher/course/tchManuAdjCl',
        stopCourseUrl: '#/teacher/course/stopClass',
        banAdjustUrl: '#/teacher/course/requirement'
      }
    },
    methods: {

    }
  }
</script>

<style lang="css" scoped>
  #makeupLessonBtn {
    margin-left: 5rem;
  }
</style>
