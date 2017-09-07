<template>
<div>
	<div class="spanButton">
		<div class="lpart">
			<span class="textWeight">【{{courseName}}】</span>
        	<span class="textBlue">（注：请在上课后五天内填写）</span>
        </div>
        <div class="rpart">
			<button class="am-btn am-btn-success am-radius rightBtn" @click="signInBtn()">签到</button>
			<button class="am-btn am-btn-success am-radius rightBtn" @click="returnBtn()">返回</button>
			<Modal v-model="modal1" id="modalBody" :styles="{top:'10rem'}">
			    <div slot="header" style="font-size:1.6rem; text-align:center; padding:0.2rem 0;" id="modalHeader">
		            <span>上课日志</span>
		        </div>
			    <div style="text-align:center; font-size:1.1rem;">
			    	<span class="modal-select">
				    	<select v-model="selWeekList" @change="selWeekChange()">
							<option disabled>选择周数</option>
							<option v-for="weekListOne in weekList" :value="weekListOne">{{weekListOne}}</option>
						</select>
						<select v-model="selGiveLessonsDetailsList">
							<option disabled>选择上课时间</option>
							<option v-for="detailsOne in giveLessonsDetailsList" :value="detailsOne.giveLessonsDetailsId">{{detailsOne.timeandplaceInfo}}</option>
						</select>
					</span>
			    	<Input v-model="teachJournalInFoInput" type="textarea" :rows="7" placeholder="请输入..."></Input>
			    	<p style="text-align:left; font-size:0.9rem; color:red;">请认真核对所写信息！提交教学日志进行签到，并且不可重复签到。</p>
			    </div>
			    <div slot="footer" style="text-align:center;">
			        <Button id="modalBtn" @click="ok()">提交</Button>
			        <Button id="modalBtn" @click="cancel()">取消</Button>
			    </div>
			</Modal>
		</div>

		<Modal v-model="modalSubmit" id="modalBody" :styles="{top:'10rem'}">
		    <p style="text-align:center; font-size:1.1rem;">您确定要提交吗？</p>
		    <div slot="footer" style="text-align:center;">
		        <Button id="modalBtn" @click="submitOk()">确认</Button>
		        <Button id="modalBtn" @click="submitCancel()">取消</Button>
		    </div>
		</Modal>
	</div>

	<div id="scheduleList">
		<div class="classList">
			<table class="normalTable">
				<thead>
					<tr>
						<td width="20%">签到日期</td>
						<td width="10%">周数</td>
						<td width="10%">星期</td>
						<td width="20%">上课节数</td>
						<td width="20%">教室</td>
						<td width="20%">查看日志</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(data, index) in teachJournalDetailList">
						<td>{{data.signDate}}</td>
						<td>{{data.execWeek}}</td>
						<td>{{data.weekdays}}</td>
						<td>第 {{data.lessonNum}} 大节</td>
						<td>{{data.classroomId}}</td>
						<td class="textBtn" :value="data.teachJournalInFo">
							<a id="affirmState" @click="tchJournal(index)">上课日志</a>
							<Modal v-model="modal2" id="modalBody" :styles="{top:'10rem'}">
							    <div slot="header" style="font-size:1.6rem; text-align:center; padding:0.2rem 0;" id="modalHeader">
						            <span>上课日志</span>
						        </div>
							    <div style="text-align:center; font-size:1.1rem;">
							    	<!-- <Input v-model="data.teachJournalInFo" type="textarea" :rows="7"></Input> -->
							    	<span>{{checkTeachJournalInFo}}</span>
							    </div>
							    <div slot="footer" style="text-align:center;"></div>
							</Modal>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
		<div style="text-align:center; font-size:1.1rem;">
		    <p v-if="remindResult === '1'">签到失败！</p>
		    <p v-else-if= "remindResult === '2'">{{reminder}}</p>
		</div>
	    <div slot="footer" style="text-align:center;">
	        <Button id="modalBtn" @click="resultOk()">确认</Button>
	    </div>
	</Modal>
</div>
</template>

<script>
export default {
	data () {
		return {
			courseName: '基础护理技术',
			teachJournalDetailList: [
				// {signDate: '2016-09-06', execWeek: '1', weekdays: '2', lessonNum: '2', classroomId: '302'},
				// {signDate: '2016-09-06', execWeek: '1', weekdays: '2', lessonNum: '2', classroomId: '302'}
			],
			modal1: false,		// 签到窗口
			modal2: false,		// 查看上课日志窗口
			courseAssociationId: '',
			selWeekList: '选择周数',		// 选择周数下拉框
			weekList: [],
			selGiveLessonsDetailsList: '选择上课时间',		// 选择上课时间下拉框
			giveLessonsDetailsList: [],
			teachJournalInFoInput: '',	// 上传日志输入框
			checkTeachJournalInFo: '',	// 查看上课日志
			modalResult: false,
			remindResult: '',
			reminder: '',
			modalSubmit: false
		}
	},
	beforeMount: function() {
		var thisURL = document.URL; 
		//分割成字符串  
        var getval =thisURL.split('?')[1];
        this.courseAssociationId = getval.split("=")[1];

        this.$http.post('./teachJournalDetailList',{
        	"courseAssociationId": this.courseAssociationId
        },{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.teachJournalDetailList = data.teachJournalDetailList;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
	methods: {
		// 增加一行签到课程信息，需要编辑上课日志并签到当堂课程*****************************************************
		signInBtn: function () {
			this.modal1 = true;
			this.$http.post('./teachJournalSignIn',{
	        	"courseAssociationId": this.courseAssociationId
	        },{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            this.weekList = data.weekList;
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
	        });
		},
		// 选择周数并提交后，回调上课时间下拉列表*****************************************************************
		selWeekChange: function () {
			this.$http.post('./chooseCourseWeek',{
	        	"courseAssociationId": this.courseAssociationId,
	        	"execWeek": this.selWeekList
	        },{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            this.giveLessonsDetailsList = data.giveLessonsDetailsList;
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
	        });
		},
		// 点击弹窗中提交上课日志，同时进行签到********************************************************************************
		ok () {
			this.modal1 = false;
			this.modalSubmit = true;
        },
        // 二次确认是否提交
        submitOk: function () {
			this.$http.post('./signInCourseByTeacher',{
            	"execWeek": this.selWeekList,
            	"giveLessonsDetailsId": this.selGiveLessonsDetailsList,
            	"teachJournalInFo": this.teachJournalInFoInput
            },{
            	"Content-Type":"application/json"
            }).then(function(response){
            	console.log("获取申请:");
            	console.log(response.body);
            	var data = response.body;
            	var detail = response.body.teachJournalDetail;
            	this.modal1 = false;
            	if (data.result == 1) {
            		this.$Message.success('签到成功！')
            		var signDateOne = detail.signDate;
            		var execWeekOne = detail.execWeek;
            		var weekdaysOne = detail.weekdays;
            		var lessonNumOne = detail.lessonNum;
            		var classroomIdOne = detail.classroomId;
            		var teachJournalInFoOne = detail.teachJournalInFo;
		            this.teachJournalDetailList.push(
	            		{ signDate: signDateOne, execWeek: execWeekOne, weekdays: weekdaysOne, lessonNum: lessonNumOne, classroomId: classroomIdOne, teachJournalInFo: teachJournalInFoOne });
		            // console.log(signDateOne);
		            window.location.reload();
            	}else {
            		// this.$Message.error(data.result);
            		this.modalResult = true;
            		this.remindResult = '2';
            		this.reminder = data.result;
            	}
            },function(error){
            	console.log("获取申请error:");
				console.log(error);
            });
        },
		submitCancel: function () {
			this.modalSubmit = false;
            // this.$Message.error('签到失败！');
            // this.modalResult = true;
            // this.remindResult = '1';
			this.modal1 = true;
		},
        cancel () {
            this.modal1 = false;
        },
		// 点击查看已提交的上课日志*****************************************************************************
		tchJournal: function (index) {
			this.modal2 = true;
            this.checkTeachJournalInFo = this.teachJournalDetailList[index].teachJournalInFo;
		},
		// 返回到教学计划页面*****************************************************************************************
		returnBtn: function () {
			window.location.href = "#/teacher/teach/courseList"
		},
    	resultOk: function () {
    		this.modalResult = false;
    	}
	}
}
</script>

<style scoped>
.lpart span {
	margin-right: 1rem;
}
.lpart {
  margin: 0 5rem;
  float: left;
}
.rpart {
  margin: 0 5rem;
  float: right;
}

.spanButton {
	width: 100%;
	height: 3.5rem;
    line-height: 3.5rem;
	position: relative;
	display: inline-block;
	overflow: hidden;
}
.spanButton button {
	width: 5.6rem;
    margin: 0 0.7rem;
    outline: none;
}
#scheduleList {
	width: 100%;
	background-color: #f3f3f3;
	position: relative;
	display: inline-block;
	overflow: auto;
}
.classList {
	text-align: center;
	background-color: white;
	margin: 1.5rem 5rem;
}
.textRed {
	color: red;
}
.modal-select select {
	float: left;
	margin: 0 0.6rem 1.4rem 1.4rem;
}
</style>