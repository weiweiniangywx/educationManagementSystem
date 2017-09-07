<template>
    <div id="notifyBoard" style="padding: 0.6rem 5rem;background-color: #f3f3f3">
      <div style="padding: 0 2rem;background-color: white">
        <table class="operationTable" style="table-layout: fixed;">
          <thead>
          <tr>
            <th style="font-size: 2rem;">{{announcementName}}</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style="text-align: left;font-size: 0.8rem;color: #00a539">发布时间:{{announcementTime}}&nbsp&nbsp&nbsp&nbsp&nbsp发布类型:{{announcementType}}&nbsp&nbsp&nbsp&nbsp&nbsp作者:{{announcementUserName}}</td>
          </tr>
          <tr>
            <td style="text-align: left;text-indent: 3rem;font-size: 1.1rem">{{announcementContent}}</td>
          </tr>
          <tr>
            <td class="download" @click="downloadNoticeClick">{{fileName}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
              announcementId:'',
              announcementName:'新标题',
              announcementTime:'2017.05.08',
              announcementType:'学生科',
              announcementUserName:'何平',
              announcementContent:'哈哈哈哈哈哈哈哈哈哈哈哈嗝,哈哈哈哈哈哈哈哈哈哈哈哈嗝,哈哈哈哈哈哈哈哈哈哈哈哈嗝,哈哈哈哈哈哈哈哈哈哈哈哈嗝,哈哈哈哈哈哈哈哈哈哈哈哈嗝,哈哈哈哈哈哈哈哈哈哈哈哈嗝,哈哈哈哈哈哈哈哈哈哈哈哈嗝,哈哈哈哈哈哈哈哈哈哈哈哈嗝,哈哈哈哈哈哈哈哈哈哈哈哈嗝,哈哈哈哈哈哈哈哈哈哈哈哈嗝,哈哈哈哈哈哈哈哈哈哈哈哈嗝,哈哈哈哈哈哈哈哈哈哈哈哈嗝,哈哈哈哈哈哈哈哈哈哈哈哈嗝,哈哈哈哈哈哈哈哈哈哈哈哈嗝,哈哈哈哈哈哈哈哈哈哈哈哈嗝,哈哈哈哈哈哈哈哈哈哈哈哈嗝,',
              fileName:'例附件'
            }
        },
      beforeMount:function(){
        var thisURL = document.URL;
        this.announcementId = thisURL.split("?")[1];
        this.$http.post('./announcementManage/getAnnouncementInfo',{
          "announcementId":this.announcementId
        },{
          "Content-Type":"application/json"
        }).then(function (response) {
          console.log(response);
          this.announcementName = response.body.announcementName;
          this.announcementTime = response.body.announcementTime;
          this.announcementType = response.body.announcementType;
          this.announcementUserName = response.body.announcementUserName;
          this.announcementContent = response.body.announcementContent;
          this.fileName = response.body.fileName;
        },function(error){
          console.log("获取error");
        });
      },
      methods:{
        downloadNoticeClick:function(){
          location.href="./announcementManage/downloadAnnouncementFile?announcementId="+this.announcementId;
        }
      }
    }
</script>

<style scoped>
    html {
        font-size: 100%;
    }
    .download{
      color: #158064;
      cursor: pointer;
      text-align: left;
      font-size: 0.8rem;
    }
    .download:hover{
      color: black;
    }
    @media screen and (max-width: 1023px) {
        html {
            font-size: 56%;
        }
    }
</style>
