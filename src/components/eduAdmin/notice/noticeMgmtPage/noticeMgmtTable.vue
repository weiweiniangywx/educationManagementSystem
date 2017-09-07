<template>
<div>
	<div class="blank"></div>
	<div id="noticeMgmtBody">
		<div class="noticeMgmtContent">
			<table class="noticeTable" width="100%" cellspacing="0">
				<thead>
					<tr>
						<td>标题</td>
						<td>发布类别</td>
						<td>发布时间</td>
						<td>发布人</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(notice, index) in announcementList" :key="notice">
						<td :value="notice.announcementId">
							<a id="signIn" :href="'#/eduAdmin/information/notifyInformation?'+notice.announcementId">{{notice.announcementName}}</a>
						</td>
						<td>{{notice.announcementType}}</td>
						<td>{{notice.announcementTime}}</td>
						<td>{{notice.announcementUserName}}</td>
						<td>
							<img width="25px" height="25px" class="deleteImg" src="../../../../assets/images/delete.png" @click="deleteClick(index)">
							<Modal v-model="modal1" id="modalBody" :styles="{top:'10rem'}">
								<p style="text-align:center; font-size:1.1rem;">您确定要删除吗？</p>
								<div slot="footer" style="text-align:center;">
									<Button id="modalBtn" @click="deleteOk()">确定</Button>
									<Button id="modalBtn" @click="cancel()">取消</Button>
								</div>
							</Modal>
							<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
								<p style="text-align:center; font-size:1.1rem;">删除失败！请重试。</p>
								<div slot="footer" style="text-align:center;">
									<Button id="modalBtn" @click="resultOk()">确定</Button>
									<!-- <Button id="modalBtn" @click="cancel()">取消</Button> -->
								</div>
							</Modal>
              <Modal
                v-model="modal2"
                width="400"
                :mask-closable="false"
                id="modalBody"
                :styles="{top:'10rem'}">
                <div style="font-size: 1.1rem;text-align: center;">
                  <p>发布失败！</p>
                </div>
                <div slot="footer" style="text-align: center">
                  <!--<button id="modalBtn" @click="chooseDay">确定</button>-->
                  <button id="modalBtn" @click="modal2 = false">确定</button>
                </div>
              </Modal>
						</td>
					</tr>
					<tr>
						<td>
							<img src="../../../../assets/images/add.png" width="25px" height="25px" @click="addClick()">
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</template>

<script>
export default {
	data () {
		return {
			announcementList: [
				{announcementName: 'aaaaa'},
				{announcementName: 'bbbb'},
				{announcementName: 'dddd'}
			],
			modal1: false,
      modal2: false,//我添加的对话框
			modalResult: false,
			index: ''
		}
	},
	beforeMount: function() {
    //这里是跳转过来后从URL里获得后端传递给我的信息，来提示发布的结果
    var thisURL = document.URL;
    var result =thisURL.split("?")[1];
    if(result=="0"){this.modal2=true;}else if(result=="1"){this.$Message.success('发布成功！');}
    this.$http.post('./announcementManage/getAllAnnouncement',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.announcementList = data.announcementList;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
    methods: {
    	// 点击删除该行信息弹出对话框
    	deleteClick: function (index) {
    		this.modal1 = true;
    		this.index = index;
    	},
    	// 删除该行通知列表
    	deleteOk: function () {
    		// console.log(this.index);
    		// alert(this.announcementList[this.index].announcementName)
    		this.$http.post('./announcementManage/deleteAnnouncement',{
    			"announcementId": this.announcementList[this.index].announcementId
    		},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            this.modal1 = false;
	            if (data.result == 1) {
	            	this.announcementList.splice(this.index, 1);
	            	this.$Message.success("删除成功！");
	            }else {
	            	this.modalResult = true;
	            }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
	        });
    	},
    	cancel: function () {
    		this.modal1 = false;
    	},
    	resultOk: function () {
    		// setTimeout("this.modalResult = false",3000);	// 3秒后弹窗消失
    		this.modalResult = false;
    	},
    	// 点击添加通知，跳转到发布的页面
    	addClick: function () {
    		window.location.href = "#/eduAdmin/information/noticeSetting"
    	}
    }
}
</script>

<style scoped>
#noticeMgmtBody {
	width: 100%;
	background-color: #ececec;
	position: relative;
	display: inline-block;
	overflow: auto;
}
.noticeMgmtContent {
	text-align: center;
	background-color: white;
	margin: 1rem 5rem;
}
.noticeMgmtContent img {
	cursor: pointer;
}
.noticeTable > thead > tr > td,
.noticeTable > tbody > tr > td {
	border-bottom: 1px solid #ddd;
}
.noticeTable > thead > tr > td {
    padding: 0.2rem 0rem;
    line-height: 1.6rem;
    font-size: 0.9rem;
	font-weight: bold;
    height: 2rem;
}
.noticeTable > tbody > tr > td {
	padding: 0.2rem 0rem;
    line-height: 1.2rem;
    font-size: 0.9rem;
    height: 2rem;
}
</style>
