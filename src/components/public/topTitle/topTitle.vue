<template>
  <div id="topTitleDiv">
      <a :href="imgHref"><img id="schoolImg" src="../images/title.png" :alt="imgAlt" ></a>
      <div id="userExitDiv">
        <a id="user" :href="userHref">{{ userName }}</a>
        <a :href="exitHref"><img id="exitImg" src="../images/Exit.png" alt="exitAlt" @click="exitAlert"></a>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'topTitleDiv',
    data () {
      return {
        imgHref: 'http://www.samsph.com/hsxx/1092/1/',//医院官网
        userHref: '',//预想跳转到个人信息相关界面
        exitHref: '',//预留备用
        userName: '您好,何平!',
        imgAlt: '四川省医科科学院·四川省人民医院',
        exitAlt: '退出图标'
      }
    },
    methods: {
      exitAlert: function () {
        //仅供测试，预想是注销并返回登录页面
        if(confirm("您确定要退出并关闭页面吗？")){
          window.close();
        }
      }
    }
  }
</script>

<style scoped>
  html{
    font-size: 100%;
  }
  a{
    text-decoration: none;
  }
  #topTitleDiv{
    text-align: left;
    background-color: white;
    margin: 0rem 5rem;
  }
  #schoolImg{
    /*width: 18rem;*/
    height: 3rem;
    border-right: 0.1rem solid whitesmoke;
    /*padding: 0.5rem;*/
  }
  #schoolName{
    color: grey;
    font-size: 1.5rem;
    font-weight: bold;
    position: relative;
    bottom: 2rem;
  }
  #userExitDiv{
    float: right;
    display: flex;
    align-items: center;
    position: relative;
    top: 0.5rem;
  }
  #user{
    color: black;
    text-decoration: none;
    font-size: 1rem;
  }
  #exitImg{
    position: relative;
    top: 0.2rem;
    padding-left: 0.7rem;
    width: 2rem;
    height: 2rem;
  }
</style>
