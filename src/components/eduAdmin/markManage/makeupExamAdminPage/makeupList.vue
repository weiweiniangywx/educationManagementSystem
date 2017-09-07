<template>
<div>
	<div class="tableSelect">
        <select v-model="selGradeType" @change="gradeChange()">
			<option disabled>选择年制</option>
			<option v-for="gradeTypeOne in gradeType" :value="gradeTypeOne.value">{{gradeTypeOne.text}}</option>
		</select>
		<select v-model="selYearTerm">
			<option disabled>选择学期</option>
			<option v-for="yearTermOne in yearTerm" :value="yearTermOne.startYearSemester">{{yearTermOne.startYearSemester}}</option>
		</select>
		<select v-model="selCourseName">
			<option disabled>选择课程</option>
			<option v-for="courseNameOne in courseInfo" :value="courseNameOne.courseId">{{courseNameOne.courseName}}</option>
		</select>
		<select v-model="selClassId">
			<option disabled>选择班级</option>
			<option v-for="classIdOne in classInfo" :value="classIdOne.classId">{{classIdOne.className}}</option>
		</select>
        <button class="am-btn am-btn-success am-radius" @click="findBtn()">查询</button>
        <button class="am-btn am-btn-success am-radius" @click="exportBtn()">导出</button>
      </div>

	<div id="makeupList">
		<div class="makeupListBody">
			<div class="needMakeupList">
				<span>*以下是需要补考的名单</span>
				<div class="list1">
					<table class="normalTable">
						<thead>
							<tr>
								<td>年制</td>
								<td>年级</td>
								<td>专业</td>
								<td>学号</td>
								<td>学生姓名</td>
								<td>课程名称</td>
								<td>正考成绩</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="data in makeUpList">
								<td v-text="data.gradeType"></td>
								<td v-text="data.term"></td>
								<td v-text="data.specialityName"></td>
								<td v-text="data.studentId"></td>
								<td v-text="data.studentName"></td>
								<td v-text="data.courseName"></td>
								<td v-text="data.grade"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="doubleFailList">
				<span>*以下是补考不通过需要申请的同学</span>
				<div class="list2">
					<table class="operationTable">
						<thead>
							<tr>
								<td width="23%">申请学生</td>
								<td width="23%">申请课程</td>
								<td width="25%">申请时间</td>
								<td width="21%">操作</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(data, index) in makeUpAskList" :key="data">
								<td :value="data.studentId">{{data.studentName}}</td>
								<td :value="data.courseId">{{data.courseName}}</td>
								<td>{{data.makeUpAskTime}}</td>
								<td>
									<img class="rightImg" width="25px" height="25px" @click="rightBtn(index)">
									<img class="wrongImg" width="25px" height="25px" @click="wrongBtn(index)">
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
            <button class="am-btn am-btn-success am-radius" @click="applyAll()">同意申请</button>
            <button class="am-btn am-btn-success am-radius" @click="cancelAll()">撤销申请</button>

            <!-- 同意申请 -->
            <Modal v-model="modal1" id="modalBody" :styles="{top:'10rem'}">
				<div style="text-align:center; font-size:1.1rem;">
					<p v-if="yesOk === '1'">您确定同意该学生的补考申请吗？</p>
					<p v-else-if="yesOk === '2'">您确定要提交查看所有信息吗？</p>
				</div>
				<div slot="footer" style="text-align:center;">
					<Button v-if="yesOk === '1'" id="modalBtn" @click="okSingle1()">确定</Button>
					<Button v-else-if="yesOk === '2'" id="modalBtn" @click="okAll1()">确定</Button>
					<Button id="modalBtn" @click="cancel1()">取消</Button>
				</div>
			</Modal>
			<!-- 撤销申请 -->
            <Modal v-model="modal2" id="modalBody" :styles="{top:'10rem'}">
				<div style="text-align:center; font-size:1.1rem;">
					<p v-if="noCancel === '1'">您确定要撤销该学生的补考申请吗？</p>
					<p v-else-if="noCancel === '2'">您确定要撤销所有信息吗？</p>
				</div>
				<div slot="footer" style="text-align:center;">
					<Button  v-if="noCancel === '1'" id="modalBtn" @click="okSingle2()">确定</Button>
					<Button v-else-if="noCancel === '2'" id="modalBtn" @click="okAll2()">确定</Button>
					<Button id="modalBtn" @click="cancel2()">取消</Button>
				</div>
			</Modal>

			<Modal v-model="modalResult" id="modalBody" :styles="{top:'10rem'}">
				<div style="text-align:center; font-size:1.1rem;">
				    <p v-if="remindResult === '1'">查询失败！请重试</p>
				    <p v-else-if= "remindResult === '2'">导出失败！请重试</p>
				    <p v-else-if= "remindResult === '3'">申请成功！</p>
				    <p v-else-if= "remindResult === '4'">申请失败！</p>
				    <p v-else-if= "remindResult === '5'">操作失败！请重试</p>
				</div>
			    <div slot="footer" style="text-align:center;">
			        <Button id="modalBtn" @click="resultOk()">确定</Button>
			        <!-- <Button id="modalBtn" @click="submitCancel()">取消</Button> -->
			    </div>
			</Modal>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'makeupList',
	data () {
		return {
			selGradeType: '选择年制',
			selYearTerm: '选择学期',
			selCourseName: '选择课程',
			selClassId: '选择班级',
			gradeType: [
				{text: '三年制', value: '3'},
				{text: '五年制', value: '5'}
			],
			yearTerm: [],
			courseInfo: [],
			classInfo: [],
			makeUpList: [		// 获取补考名单
				// {},{},{},{}
			],
			makeUpAskList: [
				{studentName: '李华', courseName: '护理学', makeUpAskTime: '2017-04-10'},
				{studentName: '李华', courseName: '护理学', makeUpAskTime: '2017-04-10'}
			],
			modal1: false,		// 同意所有申请弹出框
			modal2: false,		// 不同意所有申请弹出框
			modalResult: false,
			remindResult: '',
			yesOk: '',
			noCancel: '',
			index: ''
		}
	},
	beforeMount: function() {
        this.$http.post('./getYearTermList',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.yearTerm = data.yearTerm;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
        this.$http.post('./courseManage/getCourseAndClassInfo',{},{
            "Content-Type":"application/json"
        }).then(function(response){
            console.log("获取申请:");
            console.log(response.body);
            var data = response.body;
            this.courseInfo = data.courseInfo;
            // this.classInfo = data.classInfo;
        },function(error){
            console.log("获取申请error:");
            console.log(error);
        });
    },
  	methods: {
  		// 选择年制后，班级列表对应更改
    	gradeChange: function () {
    		// alert("1")
    		this.$http.post('./courseManage/getCourseAndClassInfo',{},{
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body.classInfo;
	            // this.classInfo = [];
	            if(this.selGradeType==3){
	            	this.classInfo=(data.three);  
	            }else if(this.selGradeType==5){
	            	this.classInfo=(data.five);
	            }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
	        });
    	},
  		// 查找名单
  		findBtn: function () {
    		if (this.selGradeType == "选择年制") {
    			this.selGradeType = '0';
    		}
    		if (this.selYearTerm == "选择学期") {
    			this.selYearTerm = '';
    		}
    		if (this.selCourseName == "选择课程") {
    			this.selCourseName = '';
    		}
    		if (this.selClassId == "选择班级") {
    			this.selClassId = '';
    		}
        	// 获取需要补考名单*************************************************
  			this.$http.post('./findMakeUpList',{
	        	"gradeType": this.selGradeType,
	        	"yearTerm": this.selYearTerm,
	        	"courseId": this.selCourseName,
	        	"classId": this.selClassId
	        },{    
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if (data.result == "1") {
	            	this.scoreList = data.scoreList;
	            }else{
			        // this.$Message.error("操作失败！请重试");
			        this.modalResult = true;
			        this.remindResult = '5';
			    }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
        	// 获取补考申请同意名单*********************************************
        	this.$http.post('./findMakeUpAskList',{
	        	"gradeType": this.selGradeType,
	        	"yearTerm": this.selYearTerm,
	        	"courseId": this.selCourseName,
	        	"classId": this.selClassId
	        },{    
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if (data.result == "1") {
	            	this.makeUpAskList = data.makeUpAskList;
	            }else{
			        // this.$Message.error("操作失败！请重试");
			        this.modalResult = true;
			        this.remindResult = '1';
			    }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
			this.checkResult = '1';
	    },
	    // 下载按钮********************************************************************
	    exportBtn: function () {
  			
	    },
	    // 单个批准补考申请********************************************************
  		rightBtn: function (index) {
  			this.modal1 = true;
  			this.yesOk = '1';
			this.index = index;
  		},
  		okSingle1: function () {
  			this.modal1 = false;
  			var makeUpAskListPut = [];
			makeUpAskListPut.push({studentId:this.makeUpAskList[this.index].studentId, courseId:this.makeUpAskList[this.index].courseId});
			this.$http.post('./makeUpAskAgree',{
				"makeUpAskList": makeUpAskListPut
			},{    
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if (data.result == "1") {
	            	this.$Message.success("补考申请批准！");
	            	// this.applyResult = '3';
					this.makeUpAskList.splice(this.index, 1);
	            }else{
			        // this.$Message.error("操作失败！请重试");
	            	this.modalResult = true;
			        this.remindResult = '5';
			    }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
  		},
	    // 单个不同意补考申请**********************************************************
  		wrongBtn: function (index) {
  			this.modal2 = true;
  			this.noCancel = '1';
  			this.index = index;
  		},
  		okSingle2: function () {
  			this.modal2 = false;
			var makeUpAskListPut = [];
			makeUpAskListPut.push({studentId:this.makeUpAskList[this.index].studentId, courseId:this.makeUpAskList[this.index].courseId});
			this.$http.post('./makeUpAskDisagree',{
				"makeUpAskList": makeUpAskListPut
			},{    
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if (data.result == "1") {
	            	this.$Message.success("未通过申请！");
	            	// this.applyResult = '4';
					this.makeUpAskList.splice(this.index, 1);
	            }else{
			        // this.$Message.error("操作失败！请重试");
	            	this.modalResult = true;
			        this.remindResult = '5';
			    }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
  		},
  		// 点击提交，所选名单同意申请，并删除**************************************************
  		applyAll: function () {
  			this.modal1 = true;
  			this.yesOk = '2';
  		},
  		okAll1 () {
  			var makeUpAskListPut = [];
  			for (var i = 0; i < this.makeUpAskList.length; i++) {
  				makeUpAskListPut.push({studentName:this.makeUpAskList[i].studentName, courseName:this.makeUpAskList[i].courseName});
  			}
            this.modal1 = false;
            this.$http.post('./makeUpAskAgree',{
  				"makeUpAskList": makeUpAskListPut
  			},{    
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
	            if (data.result == "1") {
	            	this.makeUpAskList = [];
	            	this.$Message.success('所有学生补考申请成功！');
	            	// this.applyResult = '3';
	            }else{
			        // this.$Message.error("操作失败！请重试");
	            	this.modalResult = true;
			        this.remindResult = '5';
			    }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
        },
  		// 点击取消，所选名单不同意申请，并删除*****************************************************
  		okAll2 () {
  			var makeUpAskListPut = [];
  			for (var i = 0; i < this.makeUpAskList.length; i++) {
  				makeUpAskListPut.push({studentName:this.makeUpAskList[i].studentName, courseName:this.makeUpAskList[i].courseName});
  			}
            this.modal2 = false;
            this.$http.post('./makeUpAskDisagree',{
  				"makeUpAskList": makeUpAskListPut
  			},{    
	            "Content-Type":"application/json"
	        }).then(function(response){
	            console.log("获取申请:");
	            console.log(response.body);
	            var data = response.body;
			    if (data.result == "1") {
		            this.$Message.success('撤销所有学生补考申请！');
	            	this.makeUpAskList = [];
	            	// this.applyResult = '4';
	            }else{
			        // this.$Message.error("操作失败！请重试");
	            	this.modalResult = true;
			        this.remindResult = '5';
			    }
	        },function(error){
	            console.log("获取申请error:");
	            console.log(error);
        	});
        },
        cancel1 () {
            this.modal1 = false;
        },
        cancel2 () {
            this.modal2 = false;
        },
        resultOk () {
        	this.modalResult = false;
        }
  	}
}
</script>

<style scoped>
/*#selectDiv {
	display: flex;
	text-align: center;
	justify-content: center;
}*/

#makeupList {
	background-color: #f3f3f3;
	width: 100%;
	text-align: center;
	position: relative;
	display: inline-block;
	overflow: hidden;
}
.makeupListBody {
	margin: 1rem 5rem;
	padding: 1.4rem 0;
	background-color: white;
}
.makeupListBody button {
	/*width: 5.6rem;*/
	margin: 0 0.7rem;
}
.needMakeupList span,
.doubleFailList span {
	float: left;
	padding-left: 2rem;
}

#required {
	background: url(../../../../components/public/images/star.png) 2% 50% no-repeat;
}

.list1, .list2 {
	padding: 2rem;
}
.list2 {
	padding-bottom: 0.8rem;
}
.doubleFailList table {
	border: 2px solid #ececec;
	width: 100%;
}

ul {
	list-style: none;
	text-align: center;
	margin: 0;
	width: 100%;
}
li {
	float: left;
	margin: 0 5%;
	cursor: pointer;
}
.rightImg {
	margin: 0 5%;
	border: 0;
	vertical-align: text-bottom;
	background: url(./images/right.png) 50% 50% no-repeat;
	border: none;
	cursor: pointer;
}
.wrongImg {
	margin: 0 5%;
	padding: 0;
	vertical-align: text-bottom;
	background: url(./images/wrong.png) 50% no-repeat;
	cursor: pointer;
}
.rightImg:hover {
	background: url(./images/right-on.png) 50% no-repeat;
}
.wrongImg:hover {
	background: url(./images/wrong-on.png) 50% no-repeat;
}



</style>
