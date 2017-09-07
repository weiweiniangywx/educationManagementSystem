<template>
  <div id="table">
    <div id="show">
        <div id="top">
          <div>
            <span>*标题:</span>
            <input id="title" v-model="announcementName" type="text">
          </div>
          <div>
            <span>*发布类别:</span>
            <select v-model="announcementType">
              <option  v-for="data in options" :value="data.value">
              {{data.option}}
              </option>
            </select>
          </div>
        </div>
        <div id="middle">
          <!--<span style="white-space:nowrap;">*内容:</span>-->
         <textarea v-model="announcementContent" placeholder="请在此处输入正文..."></textarea>
        </div>
        <div id="bottom">
           <!--<button class="am-btn am-btn-success am-radius" @click="up">上传</button>-->
          <form action="./announcementManage/addAnnouncement" method="post" enctype="multipart/form-data">
              <span>附件：</span>
              <input type="file" name="file">
              <input v-model="announcementName" name="announcementName" readonly style="display: none">
              <input v-model="announcementType"  name="announcementType"  readonly style="display: none">
              <input v-model="announcementContent"  name="announcementContent"  readonly style="display: none">
              <span style="position: relative;" class="am-btn am-btn-success am-radius" @click="dia(announcementContent)">发布</span>
              <Modal
                v-model="modal1"
                width="400"
                :mask-closable="false"
                id="modalBody"
                :styles="{top:'10rem'}">
                <div style="font-size: 1.1rem;text-align: center;">
                  <p>您确定发布该信息吗?</p>
                </div>
                <div slot="footer" style="text-align: center">
                  <button id="modalBtn" type="submit">确定</button>
                  <span id="modalBtn" @click="modal1 = false">取消</span>
                </div>
              </Modal>
          </form>
          <!--<form enctype="multipart/form-data" id="tf">-->
            <!--<span>附件：</span>-->
            <!--<input type="file" name="file">-->
            <!--<input v-model="announcementName" name="announcementName" readonly style="display: none">-->
            <!--<input v-model="announcementType"  name="announcementType"  readonly style="display: none">-->
            <!--<input v-model="announcementContent"  name="announcementContent"  readonly style="display: none">-->
            <!--<input type="button" class="am-btn am-btn-success am-radius" value="发布" @click="publish">-->
          <!--</form>-->


          <!--<form>-->
            <!--<span>附件：</span>-->
            <!--<input type="file" id="file" name="file">-->
            <!--<input v-model="announcementName" name="announcementName" readonly style="display: none">-->
            <!--<input v-model="announcementType"  name="announcementType"  readonly style="display: none">-->
            <!--<input v-model="announcementContent"  name="announcementContent"  readonly style="display: none">-->
            <!--<button type="submit" class="am-btn am-btn-success am-radius" @click="submit">发布</button>-->
          <!--</form>-->


          <!--<button class="am-btn am-btn-success am-radius" @click="publish(announcementName,announcementType,announcementContent)">发布</button>-->
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        content:'',
        announcementName:'',
        announcementType:'',
        announcementContent:'',
        modal1:false,
        options:[{option:'学院公告',value:'1'},{option:'部门发布',value:'2'},{option:'科研动态',value:'3'},{option:'对外播报',value:'4'},{option:'教务文件',value:'5'},{option:'校务公布',value:'6'}]
      }

    },
//    beforeMount:function(){
//      this.$http.post('./',{},
//        {"Content-Type":"application/json"}).then(function (response) {
//          console.log(response);
//
//        },
//        function(error){
//          console.log("获取error:");
//          console.log(error);
//        });
//    },
    methods: {
      dia: function (announcementContent) {
        this.modal1 = true;
        this.announcementContent=announcementContent.replace('<br />','/n');
      }
//      publish: function () {
//        var form = new FormData(document.getElementById("tf"));
//        this.$http.post('./announcementManage/addAnnouncement',{
////            "announcementName":announcementName,
////            "announcementType":announcementType,
////            "announcementContent":announcementContent,
//          form
//        },
//          {"Content-Type":"multipart/form-data"}).then(function (response) {
//          if(response.body.result=="1")
//          {
//            alert("success");
//          }
//          console.log(response);
//          },
//          function(error){
//            console.log("获取error:");
//            console.log(error);
//          });
//
//      }
      }
    }



</script>

<style lang="css" scoped>
  @import '../../../../assets/css/external.css';
  #show{
    background-color: white;
    margin-right:5rem;
    margin-left:5rem;
    height:30rem;
    position: relative;
    top:2rem;
  }
  #table{
    background-color: #f3f3f3;
  }
  #top{
    display:flex;
    justify-content: space-between;
    padding: 1rem 4.3rem;
  }
  select{
    border: 0.1rem solid #d4d4d9;
    border-radius: 0.7rem;
    outline: none;
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;
    width:8rem;

  }
  #middle{
    display: flex;
    justify-content: center;
    margin-right:4.3rem;
    margin-left: 4.3rem;
  }
  #bottom{
    display:flex;
    justify-content: space-between;
    padding: 1rem 4.3rem;
  }
  textarea{
    width:100%;
    height:20rem;
    /*margin-right:4.3rem;*/
    /*margin-left: 4.3rem;*/
    /*display: flex;*/
    /*justify-content:space-between;*/
  }
</style>

