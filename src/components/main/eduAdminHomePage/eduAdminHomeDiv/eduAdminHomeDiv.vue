<template>
  <div id="eduAdminHomeDiv">
    <div id="menuDiv">
      <div id="announcementDiv">
        <ul id="typeUl">
          <li v-for="(announcementType,index) in announcementTypes" @mouseover="announcementChange(index)" :id="'announcementType'+index" class="announcementType">
            {{ announcementType }}
          </li>
        </ul>
        <ul id="nameUl">
          <li v-for="announcement in announcementList" :class="announcement.announcementType" style="display: none" :title="announcement.announcementName"  @click="announcementClick(announcement.announcementId)">
            <span>{{ announcement.announcementName }}...</span><span>[{{ announcement.announcementTime }}]</span>
          </li>
        </ul>
      </div>
      <Menu
          :active-name="activeName"
          @on-select="roleChange"
          width="auto">
        <Menu-group title="角色类型">
          <Menu-item v-for="(role,index) in roleList" :name="role.roleId" :key="role.roleId" @click="roleChange">
            <!--<Icon type="document-text"></Icon>-->
            {{ role.roleName }}
          </Menu-item>
        </Menu-group>
      </Menu>
    </div>
    <div id="pageDiv">
      <div id="firstDiv" class="pageDiv">
        <span class="pageSpan 3" >
          基本设置
          <ul>
            <li><a href="#/eduAdmin/baseSetting/resource/textbookMgmt">资源管理设置</a></li>
            <li><a href="#/eduAdmin/baseSetting/person/eduResGroupMgmt">人员管理设置</a></li>
          </ul>
        </span>
        <span class="pageSpan 3">
          教务管理
          <ul>
            <li><a href="#/">教务安排</a></li>
            <li><a href="#/">教务审查</a></li>
          </ul>
        </span>
        <span class="pageSpan 3">
          智能排课
          <ul>
            <li><a href="#/eduAdmin/course/courseOperation/banCouApply">排课操作</a></li>
            <li><a href="#/eduAdmin/course/courseInfo/checkCourse">排课信息</a></li>
          </ul>
        </span>
        <span class="pageSpan 2">
          课程管理
          <ul>
            <li><a href="#/">补课申请</a></li>
            <li><a href="#/">调课申请</a></li>
            <li><a href="#/">停课申请</a></li>
            <li><a href="#/">禁排申请</a></li>
          </ul>
        </span>
        <span class="pageSpan 2">
          教学管理
          <ul>
            <li><a href="#/">授课计划</a></li>
            <li><a href="#/">教学计划</a></li>
            <li><a href="#/">信息通知</a></li>
            <li><a href="#/">督导反馈</a></li>
          </ul>
        </span>
      </div>
      <div id="secondDiv" class="pageDiv">
        <span class="pageSpan 3">
          成绩管理
          <ul>
            <li><a href="#/">成绩统计</a></li>
            <li><a href="#/">成绩查询</a></li>
            <li><a href="#/">成绩撤销</a></li>
            <li><a href="#/">补考管理</a></li>
          </ul>
        </span>
        <span class="pageSpan 3">
          课酬管理
          <ul>
            <li><a href="#/">设置单价</a></li>
            <li><a href="#/">薪酬单</a></li>
          </ul>
        </span>
        <span class="pageSpan 3">考务管理</span>
        <span class="pageSpan 2">
          班级管理
          <ul>
            <li><a href="#/">评教结果</a></li>
            <li><a href="#/">班级管理</a></li>
            <li><a href="#/">成绩录入</a></li>
          </ul>
        </span>
        <span class="pageSpan 2">
          组别管理
          <ul>
            <li><a href="#/">教研组管理</a></li>
          </ul>
        </span>
      </div>
      <div id="thirdDiv" class="pageDiv">
        <span class="pageSpan 3">通知公告</span>
        <span class="pageSpan 3">权限管理</span>
        <span class="pageSpan 2">
          信息查看
          <ul>
            <li><a href="#/">上课列表</a></li>
            <li><a href="#/">个人信息</a></li>
          </ul>
        </span>
        <span class="pageSpan" id="dataSpan">
          <Row>
            <Col span="12">
            <Date-picker
                :open="open"
                :options="options">
              <span style="position: relative;"></span>
            </Date-picker>
            </Col>
          </Row>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'eduAdminHomeDiv',
    data () {
      return {
        open:true,
        options: {
          shortcuts: [
            {
              text: '今天',
              value:function() {
                return new Date();
              }
            },
            {
              text: '昨天',
              value:function() {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24);
                  return date;
              }
            },
            {
              text: '一周前',
              value:function() {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                return date;
              }
            }
          ]
        },
        roleList: [
          {roleId:"3",roleName:"教务"},
          {roleId:"2",roleName:"教师"},
        ],
        activeName: "",
        announcementTypes: [
          "学院公告","部门分布","科研动态","对外播报","教务文件","校务公布"
        ],
        announcementList: [
        {
          "announcementId": 1,
          "announcementName": " 关于xxx 的公告",
          "announcementContent": "sss",
          "announcementTime": "2015-5-19",
          "announcementType": "部门分布"
        },
        {
          "announcementId": 2,
          "announcementName": " 关于xxx 的公告",
          "announcementContent": "sss",
          "announcementTime": "2015-5-18",
          "announcementType": "部门分布"
        },
        {
          "announcementId": 3,
          "announcementName": " 关于xxx 的公告",
          "announcementContent": "sss",
          "announcementTime": "2015-5-16",
          "announcementType": "学院公告"
        },
        {
          "announcementId": 4,
          "announcementName": " 关于xxx 的公告",
          "announcementContent": "sss",
          "announcementTime": "2015-5-20",
          "announcementType": "学院公告"
        },
        {
          "announcementId": 5,
          "announcementName": " 关于xxx 的公告",
          "announcementContent": "sss",
          "announcementTime": "2015-5-4",
          "announcementType": "校务公布"
        },
        {
          "announcementId": 6,
          "announcementName": " 关于xxx 的公告",
          "announcementContent": "sss",
          "announcementTime": "2015-5-3",
          "announcementType": "校务公布"
        },
        {
          "announcementId": 7,
          "announcementName": " 关于xxx 的公告",
          "announcementContent": "sss",
          "announcementTime": "2015-4-29",
          "announcementType": "教务文件"
        },
        {
          "announcementId": 8,
          "announcementName": " 关于xxx 的公告",
          "announcementContent": "sss",
          "announcementTime": "2015-4-19",
          "announcementType": "教务文件"
        },
        {
          "announcementId": 9,
          "announcementName": " 关于xxx 的公告",
          "announcementContent": "sss",
          "announcementTime": "2015-5-12",
          "announcementType": "对外播报"
        },
        {
          "announcementId": 10,
          "announcementName": " 关于xxx 的公告",
          "announcementContent": "sss",
          "announcementTime": "2015-5-12",
          "announcementType": "科研动态"
        },
        {
          "announcementId": 11,
          "announcementName": " 关于xxx 的公告",
          "announcementContent": "sss",
          "announcementTime": "2015-5-19",
          "announcementType": "对外播报"
        }
      ]
      }
    },
    beforeMount: function() {
      this.$http.post('./announcementManage/getAllAnnouncement',{},{
//      this.$http.post('../testPhp/getAllAnnouncement.php',{},{
        "Content-Type":"application/json"
      }).then(function(response){
        this.announcementList = response.body.announcementList;
        for (var i = 0; i < this.announcementList.length; i++) {
          var isExist = false;
          for (var n = 0; n < this.announcementTypes.length; n++) {
            if(this.announcementTypes[n] == this.announcementList[i].announcementType){
              isExist = true;
              break;
            }
          }
          if(!isExist){
            this.announcementTypes.push(this.announcementList[i].announcementType);
          }
        }
      },function(error){
        this.$Message.error('连接失败，请重试！');
      });
//      this.roleList = JSON.parse(sessionStorage.getItem("userInfo")).roleList;
      this.activeName = this.roleList[0].roleId;
    },

    mounted: function() {
      var dom = document.getElementById("eduAdminHomeDiv");
      dom.style.minHeight = window.innerHeight*0.92 + "px";
    },
    watch:{
      activeName: function () {
        var pageSpans = document.getElementsByClassName("pageSpan");
        var functionModel = document.getElementsByClassName(this.activeName);
        var dataSpan = document.getElementById("dataSpan");
        for (var i = 0; i < pageSpans.length; i++) {
          pageSpans[i].style.display = "none";
        }
        for (var i = 0; i < functionModel.length; i++) {
          functionModel[i].style.display = "block";
        }
        dataSpan.style.display = "block";
      }
    },
    methods:{
      roleChange: function (name) {
        this.activeName = name;
      },
      announcementClick: function (id) {
        location.href = "#/eduAdmin/information/notifyInformation?" + id;
      },
      announcementChange: function (index) {
        var type = this.announcementTypes[index];
        var announcements = document.getElementsByClassName(type);
        var nameUl = document.getElementById("nameUl");
        var lis = nameUl.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
          lis[i].style.display = "none";
        }
        for (var i = 0; i < announcements.length; i++) {
          announcements[i].style.display = "list-item";
        }

        var typeDom = document.getElementById("announcementType"+index);
        var announcementTypes = document.getElementsByClassName("announcementType");
        for (var i = 0; i < announcementTypes.length; i++) {
          announcementTypes[i].style.backgroundColor = "transparent";
        }
        typeDom.style.backgroundColor = "#5cadff";
      }
    }

  }
</script>

<style scoped>
  #eduAdminHomeDiv {
    background-color: #F9F9F9;
    display: flex;
    border: thin solid whitesmoke;
    border-top: thin solid #f2f2f2;
  }
  #menuDiv{
    width: 20rem;
    background-color: #EEF3FA;
    border: thin solid #EEF3FA;
  }
  #pageDiv{
    width: 75%;
    height: 100%;
    padding: 1rem;
  }
  .pageDiv{
    display: flex;
    justify-content: space-around;
  }
  .pageSpan{
    border: thin solid #E9ECF2;
    border-radius: 0.2rem;
    width: 10rem;
    height: 7.5rem;
    margin: 0.5rem;
    background-color: #E9ECF2;
    text-align: center;
    padding-top: 0.5rem;
  }
  #dataSpan{
    border: none;
    background-color: inherit;
  }
  ul{
    margin: 0.5rem 0 0 0;
    padding: 0;
  }
  a{
    text-decoration: none;
    color: black;
  }
  a:hover{
    cursor: pointer;
    color: red;
  }
  #announcementDiv{
    display: flex;
  }
  .announcementType{
    width: 4rem;
    cursor: default;
    margin: 0 0.5rem;
    padding: 0.1rem;
  }
  #nameUl li:hover{
    text-decoration: underline;
    color: #0DA3E2;
    cursor: pointer;
  }
  @media screen and (max-width: 1023px) {
    html {
    }
  }
</style>
