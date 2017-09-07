<template>
  <div id="eduAdminHome">
    <topTitle></topTitle>
    <eduAdminHomeDiv></eduAdminHomeDiv>
  </div>
</template>

<script>
  import topTitle from './../../../components/public/topTitle/topTitle.vue'
  import eduAdminHomeDiv from '../../../components/main/eduAdminHomePage/eduAdminHomeDiv/eduAdminHomeDiv.vue'
  export default {
    name: 'classroomManagement',
    data () {
      return {
        msg: ''
      }
    },
    components: {
      topTitle,
      eduAdminHomeDiv
    },
    mounted: function() {
      var dom = document.getElementById("eduAdminHome");
      dom.style.minHeight = window.innerHeight + "px";
    }
  }
</script>

<style scoped>
  #eduAdminHome {
    /*padding-top: 1rem;*/

  }
  @media screen and (max-width: 1023px) {
    html {
    }
  }
</style>
