<template>
    <div id="viewPageList">
      <ul>
        <li><a href="#/main/eduAdminHomePage">首页</a></li>
        <li><a href="#/eduAdmin/information/notifyInformation">查看公告</a></li>
        <li><a href="#/eduAdmin/information/noticeManage">公告管理</a></li>
        <li><a href="#/eduAdmin/gradeManage/grade/adminCancelGrade">管理员撤销成绩</a></li>
        <li><a href="#/eduAdmin/gradeManage/grade/gradeQuery">成绩查询（学号）</a></li>
        <li><a href="#/eduAdmin/gradeManage/grade/gradeStat">成绩（分数段）</a></li>
        <li><a href="#/eduAdmin/gradeManage/makeupExam/makeupExamAdmin">补考成绩</a></li>
        <li><a href="#/eduAdmin/gradeManage/makeupExam/makeupGradeInput">输入补考成绩</a></li>
        <li><a href="#/eduAdmin/emolument/salary">薪酬单</a></li>
        <li><a href="#/eduAdmin/emolument/setPrice">设置单价</a></li>
        <li><a href="#/eduAdmin/role/authorityMgmt1">权限管理1</a></li>
        <li><a href="#/teacher/classInfo/tchCheckTimetable">教师查看课表</a></li>
        <li><a href="#/teacher/teach/courseList">教学计划</a></li>
        <li><a href="#/teacher/teach/normalSchedule">上课签到列表</a></li>
        <li><a href="#/teacher/classInfo/tchCheckSalary">教师查看薪酬单</a></li>
        <li><a href="#/teacher/class/gradesInput">成绩输入</a></li>
        <li><a href="#/teacher/class/tchGradesInput">教师成绩输入</a></li>
        <li><a href="#/teacher/course/tchManuAdjCl">手动调课</a></li>
      </ul>

      <!-- 有标题栏的弹出框 -->
      <Button type="primary" @click="modal1 = true" id="modalBtn">提交</Button>
      <Modal v-model="modal1" width="400" id="modalBody">
          <div slot="header" style="font-size:1rem; text-align:center; padding:0.5rem 0;" id="modalHeader">
              <span>登陆规则</span>
          </div>
          <div style="text-align:left; font-size:0.9rem;">
              <p>用户名：</p>
              <p>初始密码：</p>
              <p>*************</p>
          </div>
          <div slot="footer" style="text-align:center;">
              <Button id="modalBtn" :loading="modal_loading" @click="ok1">确定</Button>
              <Button id="modalBtn" :loading="modal_loading" @click="cancel1">取消</Button>
          </div>
      </Modal>

      <!-- 无标题栏的弹出框 -->
      <Button @click="modal2 = true" id="modalBtn">不带标题栏</Button>
      <Modal v-model="modal2" id="modalBody" :styles="{top:'10rem'}">
          <p style="text-align:center; font-size:1.1rem;">您确定要删除该信息吗？</p>
          <div slot="footer" style="text-align:center;">
              <Button id="modalBtn" :loading="modal_loading" @click="ok2">确定</Button>
              <Button id="modalBtn" :loading="modal_loading" @click="cancel2">取消</Button>
          </div>
      </Modal>

      <!-- 上传 -->
      <Upload action="//jsonplaceholder.typicode.com/posts/">
          <Button type="ghost" id="uploadBtn">上传文件</Button>
      </Upload>

      
      <span><img class="aaa" src="./components/public/images/right.png" width="25px" height="25px" align="center"></span>

    </div>
</template>

<script scoped>
    export default {
        name: 'viewPageList',
        data () {
            return {
                msg: '',
                modal1: false,
                modal2: false
            }
        },
        methods: {
            // modal1按钮控件
            ok1 () {
                this.modal_loading = true;
                setTimeout(() => {
                    this.modal_loading = false;
                    this.modal1 = false;
                    this.$Message.success('提交成功！');
                }, 100);
            },
            cancel1 () {
                this.modal_loading = true;
                setTimeout(() => {
                    this.modal_loading = false;
                    this.modal1 = false;
                    this.$Message.error('提交失败！');
                }, 100);
            },
            // modal2按钮控件
            ok2 () {
                this.modal_loading = true;
                setTimeout(() => {
                    this.modal_loading = false;
                    this.modal2 = false;
                    this.$Message.success('提交成功！');
                }, 100);
            },
            cancel2 () {
                this.modal_loading = true;
                setTimeout(() => {
                    this.modal_loading = false;
                    this.modal2 = false;
                    this.$Message.error('提交失败！');
                }, 100);
            }
        }
    }
</script>

<style scoped>
    #viewPageList {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    ul {
      list-style: none;
    }
    li{
      padding: 1rem;
      float: none;
    }
    a{
      text-decoration: underline;
      color: blue;
    }
    a:hover{
      cursor: pointer;
      color: red;
    }
    @media screen and (max-width: 1023px) {
        html {
        }
    }

.aaa {
  width: 22px;
  height: 22px;
  border-radius: 100%;
}
.aaa:hover {
  background: red;
}
</style>
